<?php

namespace AppBundle\EventListener;

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

    public function __construct(Serializer $serializer){
        $this->serializer = $serializer;
    }
    /**
     * Add public data to the authentication response
     *
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $user = $event->getUser();
        if (!$user instanceof UserInterface) {
            return;
        }
        $data['data'] = array(
            'user' => $this->serializer->serialize($user,'json'),
        );
        $event->setData($data);
    }
}