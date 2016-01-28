<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Image;
use AppBundle\MessageResponse\MessageResponse;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use FOS\RestBundle\Controller\Annotations as Rest;
use SRIO\RestUploadBundle\Upload\UploadHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\ElasticaBundle\Model\AdvancedSearch;


class VoitureController extends FOSRestController
{
    /**
     * Retourne la liste des voitures
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Retourne la liste des voitures",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("api/voitures/page/{page}",name="nicetruc_index_voiture", options={"expose"=true})
     * @Method({"GET"})
     */
    public function getVoituresAction($page){
        $em = $this->getDoctrine()->getManager();
        $message = new MessageResponse(View::create());

        $paginator  = $this->get('knp_paginator');

        $voitures = $paginator->paginate(
            $em->getRepository('AppBundle:Voiture')->findBy(array(),array('datePublication'=>'DESC')),
            $page,
            $this->getParameter('maxpage')
        );

        if(!$voitures){
            $message->config("Voiture introuvable",'danger',404);
            return $message->getView();
        }

        $view = $this
            ->view()
            ->setData(array("data"=>$voitures));

        sleep(5);
        return $view;
    }

    /**
     * Retourne une voiture
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Retourne une voiture",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("api/voitures/{id}", requirements={"id" = "\d+"}, name="nicetruc_show_voiture", options={"expose"=true})
     * @Method({"GET"})
     */
    public function getVoitureAction($id){
        $em = $this->getDoctrine()->getManager();
        $message = new MessageResponse(View::create());


        $voitures = $em->getRepository('AppBundle:Voiture')->customFind($id);

        if(!$voitures){
            $message->config("Voiture introuvable",'danger',404);
            return $message->getView();
        }

        $view = $this
            ->view()
            ->setData($voitures);


        return $view;
    }

    /**
     * Retourne les voitures en vedette
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Reetourn les voitures en vedette",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("/api/voitures/voituresEnVedette",name="nicetruc_voitureVedette", options={"expose"=true})
     * @Rest\View()
     * @Method({"GET"})
     */
    public function getVoitureVedetteAction(){
        $em = $this->getDoctrine()->getManager();

        $voitures = $em->getRepository('AppBundle:Voiture')->findBy(array('isVedette'=>true));

        if(!$voitures){
            $voitures = $em->getRepository('AppBundle:Voiture')->findBy(array(),array(),8);
        }


        $view = View::create(array('data'=>$voitures) ,200);

        return $view;
    }

    /**
     * Retourne les voitures par user
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Reetourn les voitures par user",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("/api/voitures/users/{userId}",name="nicetruc_voiturebyuser", options={"expose"=true})
     * @Rest\View()
     * @Method({"GET"})
     */

    public function getVoitureByUserAction($userId){
        $em = $this->getDoctrine()->getManager();
        $message = new MessageResponse(View::create());

        $user = $em->getRepository('AppBundle:User')->findBy(array('id'=>$userId));

        if(!$user){
            $message->config("Utilisateur introuvable",'danger',404);
            return $message->getView();
        }

        $voitures = $em->getRepository('AppBundle:Voiture')->findBy(array('user'=>$user));

        $view = View::create(array('data'=>$voitures) ,200);

        return $view;
    }

     /**
     * Definir ou non une voiture en vedette
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Definir ou non une voiture en vedette",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @RequestParam(name="isVedette", nullable=false)
     * @Route("api/voitures/vedette/{id}", requirements={"id" = "\d+"}, name="nicetruc_voiture_en_vedette", options={"expose"=true})
     * @Method({"PUT"})
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function putVoitureEnVedetteAction($id,ParamFetcher $paramFetcher){
        $em = $this->getDoctrine()->getManager();
        $message = new MessageResponse(View::create());


        $voiture = $em->getRepository('AppBundle:Voiture')->find($id);

        if(!$voiture){
            $message->config("Voiture introuvable",'danger',404);
            return $message->getView();
        }

        $nbreVedette = $em->getRepository('AppBundle:Voiture')->countVedette();

        if($paramFetcher->get('isVedette')){
            if($nbreVedette > $this->getParameter('limiteVedette')){
                return $this
                    ->view()
                    ->setData('Vous ne pouvez depasser '.$this->getParameter('limiteVedette').' vedettes')
                    ->setStatusCode(423);
            }
           $voiture->setIsVedette(true);
        }else{
            $voiture->setIsVedette(false);
        }

        $em->persist($voiture);
        $em->flush();

        $view = $this
            ->view()
            ->setData('Modification vedette effectuée ')
            ->setStatusCode(200);

        return $view;
    }

}
