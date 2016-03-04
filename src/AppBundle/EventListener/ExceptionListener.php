<?php

namespace AppBundle\EventListener;

use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ExceptionListener
{
    private $router;
    private $container;

    public function __construct(ContainerInterface $container,UrlGeneratorInterface $router){
        $this->container = $container;
        $this->router = $router;
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $env=$this->container->get('kernel')->getEnvironment();
        if($event->getException() instanceof NotFoundHttpException){
            $response = new Response();
            $response->setContent($this->container->get('templating')->render('AppBundle::index_'.$env.'.html.twig', array()));
            $event->setResponse($response);
        }
    }
}