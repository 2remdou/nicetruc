<?php

/**
 * This file is part of the FOSRestByExample package.
 *
 * (c) Santiago Diaz <santiago.diaz@me.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */

namespace AppBundle\Controller;

use AppBundle\NicetrucEvents;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\UserBundle\Event\UserEvent;
use FOS\UserBundle\FOSUserEvents;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\ConstraintViolationList;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class UserRestController extends FOSRestController
{
    /**
     * Retourne le salt
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Retourne le salt d'un user",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("/api/salt/l/{locale}/h/{hote}/d/{domaine}", name="nicetruc_salt", requirements={"email" = "\w+"})
     * @return View
     */
    public function getSaltAction($locale,$hote,$domaine){
        $email = $locale.'@'.$hote.'.'.$domaine;
        $userManager = $this->container->get('fos_user.user_manager');

        $user = $userManager->findUserByUsernameOrEmail($email);
        $view = View::create();
        if(!$user){
            $view->setStatusCode(404)->setData("Utilisateur introuvable");
            return $view;
        }

        return $view->setStatusCode(200)->setData(array('salt'=>$user->getSalt()));
    }
    /**
     * Verifie la connexion
     * @ApiDoc(
     *   resource = true,
     *   description = "verification token",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
      * @Route("/api/checkLogin", name="nicetruc_checklogin")
     * @return View
     */
    public function checkLoginAction(){
        $user = $this->getUser();
        $view = View::create();
        return $view->setStatusCode(200)->setData(
            array(
                'data'=> array(
                    array('texte' => 'Salut '.$user->getNomUser().', super content de vous revoir','typeAlert'=>'success')
                ),
                'user'=> $user
            )
        );
    }

    /**
     * Retourne un user
     * @ApiDoc(
     *   resource = true,
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("/api/users/{id}", name="nicetruc_user")
     * @Method({"GET"})
     * @return View
     */
    public function getUserAction($id){
        $em = $this->getDoctrine();
        $user = $em->getRepository('AppBundle:User')->findOneBy(array('id'=>$id));
        $view = View::create();

        if(!$user){
            $view = $this->configError($view,'User introuvable','danger',404);
            return $view;
        }

        return $view->setStatusCode(200)->setData(
            array(
                'user'=> $user
            )
        );
    }


    /**
     * Generate token for username given
     *
     * @param  string $username username
     * @param  string $password password with salt included
     * @return string
     */
    private function generateToken($username, $password)
    {
        $created = date('c');
        $nonce = substr(md5(uniqid('nonce_', true)), 0, 16);
        $nonceSixtyFour = base64_encode($nonce);
        $passwordDigest = base64_encode(sha1($nonce . $created . $password, true));

        $token = sprintf(
            'UsernameToken Username="%s", PasswordDigest="%s", Nonce="%s", Created="%s"',
            $username,
            $passwordDigest,
            $nonceSixtyFour,
            $created
        );

        return $token;
    }

    /**
     * cree un nouvel user
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "cree un nouvel user",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @RequestParam(name="email", nullable=false, strict=true, description="Email.")
     * @RequestParam(name="nomUser", nullable=false, strict=true, description="nom.")
     * @RequestParam(name="prenomUser", nullable=true, strict=true, description="prenom.")
     * @RequestParam(name="password", nullable=false, strict=true, description="mot de passe.")
     * @RequestParam(name="confirmationPassword", nullable=false, strict=true, description="confirmation mot de passe.")
     * @Route("/api/inscription", name="nicetruc_create_user", requirements={"email" = "\w+"})
     * @Method({"POST"})
     * @return View
     */
    public function postUserAction(ParamFetcher $paramFetcher,Request $request){

        $view = View::create();

        $dispatcher = $this->get('event_dispatcher');

        if($paramFetcher->get('password') !== $paramFetcher->get('confirmationPassword')){
            $view->setStatusCode(400)->setData(array(
                array('texte' => 'Les deux mots de passe doivent être identiques','typeAlert'=>'danger'),
            ));
            return $view;
        }
        $userManager = $this->container->get('fos_user.user_manager');

        $user = $userManager->createUser();
        $user->setUsername($paramFetcher->get('email'));
        $user->setEmail($paramFetcher->get('email'));
        $user->setPlainPassword($paramFetcher->get('password'));
        $user->setNomUser($paramFetcher->get('nomUser'));
        $user->setPrenomUser($paramFetcher->get('prenomUser'));
//        $user->setEnabled(true);
        $user->addRole('ROLE_API');


        $errors = $this->get('validator')->validate($user, array('Registration'));

        if (count($errors) == 0) {
            $event = new UserEvent($user,$request);
            $dispatcher->dispatch(NicetrucEvents::REGISTRATION_SUCCESS, $event);

            $userManager->updateUser($user);
            $view->setData(array(
               'data'=> array(
                   array('texte' => 'Utilisateur crée avec succès','typeAlert'=>'success')
               ),
                'user'=> $user
            ))
                ->setStatusCode(200);
            return $view;
        } else {
            $view = $this->getErrorsView($errors);
            return $view;
        }

    }

    /**
     * edit un  user
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "modifie un  user",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @RequestParam(name="id", nullable=false, strict=true, description="Identifiant user")
     * @RequestParam(name="email", nullable=false, strict=true, description="Email.")
     * @RequestParam(name="nomUser", nullable=false, strict=true, description="nom.")
     * @RequestParam(name="prenomUser", nullable=true, strict=true, description="prenom.")
     * @RequestParam(name="quartier", nullable=true, strict=true, description="le quartier")
     * @RequestParam(name="telephone", nullable=true, strict=true, description="le numero de telephone.")
     * @RequestParam(name="siteWeb", nullable=true, strict=true, description="Le site web.")
     * @Route("/api/users/{id}", name="nicetruc_edit_user")
     * @Method({"PUT"})
     * @return View
     */
    public function putUserAction($id,ParamFetcher $paramFetcher){

        $view = View::create();
        $em = $this->getDoctrine()->getManager();

        $user = $em->getRepository('AppBundle:User')->findOneBy(array('id'=>$id));
        if(!$user){
            $view = $this->configError($view,'User introuvable','danger',404);
            return $view;
        }

        $userManager = $this->container->get('fos_user.user_manager');

        $user = $userManager->findUserByUsername($user->getUsername());

        if($paramFetcher->get('email')){ $user->setUsername($paramFetcher->get('email')); $user->setEmail($paramFetcher->get('email'));}
        if($paramFetcher->get('nomUser')){ $user->setNomUser($paramFetcher->get('nomUser'));}
        if($paramFetcher->get('prenomUser')){ $user->setPrenomUser($paramFetcher->get('prenomUser'));}
        if($paramFetcher->get('telephone')){ $user->setTelephone($paramFetcher->get('telephone'));}
        if($paramFetcher->get('siteWeb')){ $user->setSiteWeb($paramFetcher->get('siteWeb'));}

        if($paramFetcher->get('quartier')){
            $quartier = $em->getRepository('AppBundle:Quartier')->find($paramFetcher->get('quartier'));
            if(!$quartier){
                $view=$this->configError($view,'Le quartier inconnu,veuillez le creer','danger',404);
                return $view;
            }
            $user->setQuartier($quartier);
        }


        $errors = $this->get('validator')->validate($user, array('Update'));

        if (count($errors) == 0) {
            $userManager->updateUser($user);
            $view = $this->configError($view,'Utilisateur modifié avec succès','success',200);
            return $view;
        } else {
            $view = $this->getErrorsView($errors);
            return $view;
        }

    }

    /**
     * edit password user
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "modifie le password d'un  user",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @RequestParam(name="id", nullable=false, strict=true, description="Identifiant user")
     * @RequestParam(name="passwordActuel", nullable=false, strict=true, description="ancien mot de passe.")
     * @RequestParam(name="password", nullable=false, strict=true, description="nouveau mot de passe.")
     * @RequestParam(name="confirmationPassword", nullable=false, strict=true, description="confirmation mot de passe.")
     * @Route("/api/users/change/{id}", name="nicetruc_edit_password")
     * @Method({"PUT"})
     * @return View
     */
    public function putChangeUserPasswordAction($id,ParamFetcher $paramFetcher){

        $view = View::create();
        $em = $this->getDoctrine()->getManager();

        $user = $em->getRepository('AppBundle:User')->findOneBy(array('id'=>$id));
        if(!$user){
            $view = $this->configError($view,'User introuvable','danger',404);
            return $view;
        }

        $userManager = $this->container->get('fos_user.user_manager');

        $user = $userManager->findUserByUsername($user->getUsername());

        $encoder = $this->container->get('security.password_encoder');

        $passwordActuel = $encoder->encodePassword($user,$paramFetcher->get('passwordActuel'));

        if($user->getPassword() !== $passwordActuel){
            $view = $this->configError($view,'Mot de passe incorrect','danger',404);
            return $view;
        }
        if($paramFetcher->get('password') !== $paramFetcher->get('confirmationPassword')){
            $view = $this->configError($view,'Le mot de passe et la confirmation doivent être identique','danger',404);
            return $view;
        }

        $user->setPlainPassword($paramFetcher->get('password'));


        $errors = $this->get('validator')->validate($user, array('ChangePassword'));

        if (count($errors) == 0) {
            $userManager->updatePassword($user);
            $userManager->updateUser($user);

            $view = $this->configError($view,'Mot de passe modifié avec succès','success',200);
            return $view;
        } else {
            $view = $this->getErrorsView($errors);
            return $view;
        }

    }


    /**
     * Get the validation errors
     *
     * @param ConstraintViolationList $errors Validator error list
     *
     * @return View
     */
    protected function getErrorsView(ConstraintViolationList $errors)
    {
        $msgs = array();
        $errorIterator = $errors->getIterator();
        foreach ($errorIterator as $validationError) {
            $msg = $validationError->getMessage();
            $params = $validationError->getMessageParameters();
            $msgs[] = array('texte'=>$this->get('translator')->trans($msg, $params, 'validators'),'typeAlert'=>'danger');
        }
        $view = View::create($msgs);
        $view->setStatusCode(400);

        return $view;
    }

    protected function configError(View $view,$message,$typeMessage,$status){
        $view->setData(array(
            'data'=> array(
                array('texte' => $message,'typeAlert'=>$typeMessage)
            )
        ))
            ->setStatusCode($status);

        return $view;
    }


}
