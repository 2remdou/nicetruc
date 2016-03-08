<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Image;
use AppBundle\MessageResponse\MessageResponse;
use Elastica\Transport\Http;
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
use AppBundle\Entity\Postulant;



class PostulantController extends FOSRestController
{
    /**
     * Retourne la liste des postulants d'une voiture
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Retourne la liste des postulants d'une voiture",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the postulant is not found"
     *   }
     * )
     * @Route("api/voitures/{idVoiture}/postulants/page/{page}",name="nicetruc_voiture_postulant", options={"expose"=true})
     * @Method({"GET"})
     */
    public function getPostulantsByVoitureAction($idVoiture,$page){
        $em = $this->getDoctrine()->getManager();

        $paginator  = $this->get('knp_paginator');

        $postulants = $em->getRepository('AppBundle:Postulant')->customFindByVoiture($idVoiture);
        
        if(!$postulants){
            return $this->view('Aucun postulant pour cette annonce',404);
        }

        $postulants = $paginator->paginate(
            $postulants,
            $page,
            $this->getParameter('maxpage')
        );       

        return $this
            ->view()
            ->setData(array("data"=>$postulants));
    }

    /**
     * Ajoute un postulant à une voiture
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Ajoute un postulant à une voiture",
     *   statusCodes = {
     *     201 = "Created",
     *     404 = "Returned when the voiture is not found"
     *   }
     * )
     * @RequestParam(name="nomPostulant", nullable=false, strict=true, description="nom postulant.")
     * @RequestParam(name="telephone", nullable=false, strict=true, description="telephone postulant.")
     * @RequestParam(name="idVoiture", nullable=false,requirements="\d+", strict=true, description="id voiture postulant.")
     * @Route("api/postulants",name="nicetruc_post_postulant", options={"expose"=true})
     * @Method({"POST"})
     */
    public function postPostulant(ParamFetcher $paramFetcher){

        try{
            $em = $this->getDoctrine()->getManager();
            $voiture = $em->getRepository('AppBundle:Voiture')->customFind($paramFetcher->get('idVoiture'));
            if(!$voiture){
                return MessageResponse::message('Voiture introuvable','danger',404);
            }

            $postulant = $em->getRepository('AppBundle:Postulant')->findBy(array('telephone'=>$paramFetcher->get('telephone'),
                                                                                'voiture'=>$voiture));

            if($postulant){
                return MessageResponse::message('Ce numero a déjà postulé à cette annonce','warning',200);
            }

            $postulant = new Postulant();
            $postulant->setNomPostulant($paramFetcher->get('nomPostulant'));
            $postulant->setTelephone($paramFetcher->get('telephone'));
            $postulant->setVoiture($voiture);

            $validator = $this->get('validator');
            $error = $validator->validate($postulant);

            if(count($error)>0){
                dump($error);
                return $this->view()
                    ->setData((string) $error)
                    ->setStatusCode(500);
            }
            $em->persist($postulant);
            $em->flush();

            return MessageResponse::message('Enregistrement effectué avec succes','success',201);
        }catch (BadRequestHttpException $e){
            return $this->view($e->getMessage(),400);
        }

    }


}
