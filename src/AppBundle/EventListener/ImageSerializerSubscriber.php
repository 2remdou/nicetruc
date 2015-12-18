<?php

namespace AppBundle\EventListener;

use Symfony\Component\DependencyInjection\ContainerInterface;
use JMS\Serializer\EventDispatcher\PreSerializeEvent;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use AppBundle\Entity\Image;
use AppBundle\Entity\Voiture;

class ImageSerializerSubscriber implements EventSubscriberInterface
{
    private $container;
    private $s3Url;

    public function __construct(ContainerInterface $container,$s3Url)
    {
        $this->container = $container;
        $this->s3Url = $s3Url;
    }

    public static function getSubscribedEvents()
    {
        return array(
            array(
                    'event' => 'serializer.pre_serialize', 'method' => 'onPreSerialize'
                )
            );
    }

    public function onPreSerialize(PreSerializeEvent  $event)
    {

        $object = $event->getObject();
        $env=$this->container->get('kernel')->getEnvironment();
        if($object instanceof Image){        
            if($env === 'prod'){
                $object->setDownloadUrl($this->getS3Url().'/'.$object->getImageName());
            }
            else{
                $object->setDownloadUrl('client/app/images/voitures/'.$object->getImageName());
            }
        } 

        if($object instanceof Voiture){
            if(!$object->getImagePrincipale()){
                if($env === 'prod'){
                    $object->setDefaultPathImagePrincipale($this->getS3Url().'/defaultVoiture.png');
                }
                else{
                    $object->setDefaultPathImagePrincipale('client/app/images/voitures/defaultVoiture.png');
                }
                
            }
        }


        

    }
    public function getS3Url(){
        return $this->s3Url;
    }

    public function setS3Url($s3Url){
        $this->s3Url = $s3Url;
    }

}
