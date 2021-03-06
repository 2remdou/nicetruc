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
     * @Security("has_role('ROLE_API')")
     */
    public function getPostulantsByVoitureAction($idVoiture,$page){

        $user = $this->getUser();

        $em = $this->getDoctrine()->getManager();

        $paginator  = $this->get('knp_paginator');

        $postulants = $em->getRepository('AppBundle:Postulant')->customFindByVoiture($idVoiture);

        if($postulants->getVoiture()->getUser()!==$user){
            return MessageResponse::message('Vous n\'êtes pas autorisé à acceder à cette ressource','danger',401);
        }
        
        if(!$postulants){
            return MessageResponse::message('Aucun postulant pour cette annonce','danger',404);
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
     * @RequestParam(name="nomPostulant", nullable=true, strict=true, description="nom postulant.")
     * @RequestParam(name="telephone", nullable=true, strict=true, description="telephone postulant.")
     * @RequestParam(name="idVoiture", nullable=true,requirements="\d+", strict=true, description="id voiture postulant.")
     * @Route("api/postulants",name="nicetruc_post_postulant", options={"expose"=true})
     * @Method({"POST"})
     */
    public function postPostulant(ParamFetcher $paramFetcher){

//        try{
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
                $message="";
                foreach($error as $er){
                    $message=$message.$er->getMessage().'<br>';
                }
                return MessageResponse::message($message,'danger',400);
            }
            $em->persist($postulant);
            $em->flush();

            return MessageResponse::message('Enregistrement effectué avec succes','success',201);
//        }catch (BadRequestHttpException $e){
//            dump($e);
//            return MessageResponse::message($e->getMessage(),'danger',400);
//        }

    }

    /**
     * desactiver un postulant à une voiture
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Desactiver un postulant à une voiture",
     *   statusCodes = {
     *     200 = "success",
     *     404 = "Returned when the voiture is not found"
     *   }
     * )
     * @Route("api/postulants/{idPostulant}/disabled",name="nicetruc_disabled_postulant", options={"expose"=true})
     * @Method({"PUT"})
     */
    public function disabledPostulantAction($idPostulant){

        $user = $this->getUser();

        $em = $this->getDoctrine()->getManager();


        $postulant = $em->getRepository('AppBundle:Postulant')->find($idPostulant);

        if(!$postulant){
            return MessageResponse::message('Postulant introuvable','danger',404);
        }


        if($postulant->getVoiture()->getUser()!==$user){
            return MessageResponse::message('Vous n\'êtes pas autorisé à acceder à cette ressource','danger',401);
        }

        $postulant->setDisabled(true);

        $em->persist($postulant);
        $em->flush();

        return MessageResponse::message('Postulant desactivé avec success','success',200);


    }



}
