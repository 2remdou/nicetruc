<?php


namespace AppBundle\EventListener;

use Symfony\Component\EventDispatcher\GenericEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authorization\AuthorizationChecker;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class CheckAuthorizationListener
{
    private $authorizationChecker;

    private $tokenStorage;

    public function __construct(AuthorizationChecker $authorizationChecker, TokenStorage $tokenStorage){
        $this->authorizationChecker = $authorizationChecker;
        $this->tokenStorage = $tokenStorage;
    }

    public function onCheckAuthorization(GenericEvent $event){

        $resource = $event->getSubject();

        if(!$this->authorizationChecker->isGranted('ROLE_ADMIN')){
            throw new AccessDeniedException("Vous n'avez pas les autorisations neccessaires");
        }
    }

    public function onCheckVoitureOwner(GenericEvent $event){
        $voiture = $event->getSubject();

        $user = $this->tokenStorage->getToken()->getUser();
        if($user != $voiture->getUser()){
            throw new AccessDeniedException("Vous n'avez pas les autorisations neccessaires");
        }
    }
}
