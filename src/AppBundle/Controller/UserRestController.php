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
            $view->setStatusCode(404)->setData("Utilisateur introuvable");
            return $view;
        }

        $salt = $user->getSalt();
        $factory = $this->get('security.encoder_factory');

        $encoder = $factory->getEncoder($user);
        $password = $encoder->encodePassword($paramFetcher->get('password'), $salt);

        if($password!==$user->getPassword()){
            $view->setStatusCode(404)->setData("Utilisateur introuvable");
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



}
