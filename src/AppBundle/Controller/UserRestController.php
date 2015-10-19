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

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Request\ParamFetcher;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\Validator\ConstraintViolationList;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class UserRestController extends FOSRestController
{
    /**
     * Return the overall user list.
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
     *
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
     * Return the overall user list.
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Return the overall User List",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @RequestParam(name="email", nullable=false, strict=true, description="Email.")
     * @RequestParam(name="password", nullable=false, strict=true, description="Plain Password.")
     * @Route("/api/login", name="nicetruc_login")
     * @return View
     */
    public function login(ParamFetcher $paramFetcher){

        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->findUserByUsernameOrEmail($paramFetcher->get('email'));

        $view = View::create();

        if (!$user) {
            $view->setStatusCode(404)->setData("Utilisateur introuvable email");
            return $view;
        }

        $salt = $user->getSalt();
        $factory = $this->get('security.encoder_factory');

        $encoder = $factory->getEncoder($user);
        $password = $encoder->encodePassword($paramFetcher->get('password'), $salt);

        if($password!==$user->getPassword()){
            $view->setStatusCode(404)->setData("Utilisateur introuvable password");
            return $view;
        }

        $header = $this->generateToken($paramFetcher->get('email'), $password);
        $data = array('X-WSSE' => $header);
        $view->setHeader("Authorization", 'WSSE profile="UsernameToken"');
        $view->setHeader("X-WSSE", $header);
        $view->setStatusCode(200)->setData($data);
        return $view;

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
     * @return View
     */
    public function postUserAction(ParamFetcher $paramFetcher){

        $view = View::create();

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
        $user->setEnabled(true);
        $user->addRole('ROLE_USER');


        $errors = $this->get('validator')->validate($user, array('Registration'));

        if (count($errors) == 0) {
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


}
