<?php

namespace AppBundle\EventListener;

use FOS\UserBundle\Model\UserManager;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;
use JMS\Serializer\Serializer;
/**
 * JWTAuthenticationSuccessListener
 *
 * @author Toure Mamadou
 */
class JWTAuthenticationSuccessListener
{
    private $serializer;
    private $userManager;

    public function __construct(Serializer $serializer,UserManager $userManager){
        $this->serializer = $serializer;
        $this->userManager=$userManager;
    }
    /**
     * Add public data to the authentication response
     *
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $this->userManager->findUserByUsernameOrEmail($event->getUser()->getUsername());
        if (!$user instanceof UserInterface) {
            return;
        }
        $data['data'] = array(
            'user' => $this->serializer->deserialize($this->serializer->serialize($user,'json'),'array','json') ,
        );
        $event->setData($data);
    }
}