<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 09/09/2015
 * Time: 16:48
 */
namespace AppBundle\Handler;

use Symfony\Component\Routing\Router;
use \Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use \Symfony\Component\HttpFoundation\Request;
use \Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;

class LoginSuccessHandler  implements AuthenticationSuccessHandlerInterface
{
    protected $tokenStorage;
    protected $router;
    protected $authorizationChecker;

    public function __construct(TokenStorage $tokenStorage,AuthorizationChecker $authorizationChecker,Router $router){
        $this->tokenStorage = $tokenStorage;
        $this->authorizationChecker = $authorizationChecker;
        $this->router = $router;
    }
    /**
     * This is called when an interactive authentication attempt succeeds. This
     * is called by authentication listeners inheriting from
     * AbstractAuthenticationListener.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Symfony\Component\Security\Core\Authentication\Token\TokenInterface $token
     *
     * @return \Symfony\Component\HttpFoundation\Response never null
     */
    public function onAuthenticationSuccess(Request $request,TokenInterface $token)
    {
        if($this->authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY')){
            $user = $token->getUser();
            $session = $request->getSession();
            $session->getFlashBag()->add('success',$user->getNomUser().', nous sommes super content de vous revoir');
            $response = new RedirectResponse($this->router->generate('homepage'));
            return $response;
        }

    }
}