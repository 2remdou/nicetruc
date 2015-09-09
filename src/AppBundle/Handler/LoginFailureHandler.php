<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 09/09/2015
 * Time: 16:48
 */
namespace AppBundle\Handler;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Router;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use \Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use \Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LoginFailureHandler  implements AuthenticationFailureHandlerInterface
{
    protected $router;

    public function __construct(Router $router){
        $this->router = $router;
    }

    /**
     * This is called when an interactive authentication attempt fails. This is
     * called by authentication listeners inheriting from
     * AbstractAuthenticationListener.
     *
     * @param Request $request
     * @param AuthenticationException $exception
     *
     * @return Response The response to return, never null
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $session = $request->getSession();
        $session->getFlashBag()->add('danger','Adresse email ou mot de passe incorrect');
        $response = new RedirectResponse($this->router->generate('fos_user_security_login'));
        return $response;
    }
}