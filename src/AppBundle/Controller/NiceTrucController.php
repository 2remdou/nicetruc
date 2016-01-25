<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Image;
use AppBundle\MessageResponse\MessageResponse;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\View\View;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use FOS\RestBundle\Controller\Annotations as Rest;
use SRIO\RestUploadBundle\Upload\UploadHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;



class NiceTrucController extends FOSRestController
{
    /**
     * @Route("/", name="homepage", options={"expose"=true})
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        $env=$this->get('kernel')->getEnvironment();
        if($env === 'dev')
            $template='AppBundle::index_dev.html.twig';
        else
            $template='AppBundle::index_prod.html.twig';

        return $this->render($template);
    }
    /**
     * @Route("/test", name="test")
     */
    public function testAction()
    {
        $em = $this->getDoctrine()->getManager();
        $message = new MessageResponse(View::create());


        $modeleMarques = $em->getRepository('AppBundle:ModeleMarque')->findAll();

        dump($modeleMarques);
        // return $this->render($template);
        return $this->render('AppBundle::test.html.twig');
    }

    /**
     * @Route("/{url}", name="url_1p", options={"expose"=true})
     */
    public function index1pAction(Request $request)
    {
       return $this->indexAction($request);
    }

    
    /**
     * ajoute une image à une voiture
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "ajoute une image à une voiture",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @RequestParam(name="isImagePrincipale", nullable=true, description="Test si c'est l'image principale")
     * @Route("/api/voiture/{id}/image",name="nicetruc_image", options={"expose"=true})
     * @Rest\View()
     * @Method({"POST"})
     */
    public function postImageAction($id,Request $request,ParamFetcher $paramFetcher){
        $em = $this->getDoctrine()->getManager();
        $message = new MessageResponse(View::create());

        $voiture = $em->getRepository('AppBundle:Voiture')->find($id);

        if(!$voiture){
            $message->config("L'image ne correspont à aucune voiture",'danger',404);
            return $message->getView();
        }

        $file = $request->files->get('file');
        $image = new Image();
        $image->setImageFile($file);

        if($paramFetcher->get('isImagePrincipale')){
           $voiture->setImagePrincipale($image);
        }
        $image->setVoiture($voiture);
        $em->persist($image);
        $em->flush();

        $message->config("Image ".$file->getClientOriginalName()." uploader avec succes",'success',200);

        return $message->getView();
        //return View::create()->setData($paramFetcher->all())->setStatusCode(200);
    }

    /**
     * supprime une image d'une voiture
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "supprime une image d'une voiture",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("/api/images/{id}",name="nicetruc_image_delete", options={"expose"=true})
     * @Rest\View()
     * @Method({"DELETE"})
     */
    public function deleteImageAction($id){
        $em = $this->getDoctrine()->getManager();
        $message = new MessageResponse(View::create());

        $image = $em->getRepository('AppBundle:Image')->find($id);

        if(!$image){
            $message->config("Cette image n'existe pas",'danger',404);
            return $message->getView();
        }

        if($image->getVoiture()->getImagePrincipale()===$image){
            $image->getVoiture()->setImagePrincipale(null);
        }
        $em->remove($image);
        $em->flush();

        $message->config("Image supprimée avec succes",'success',200);

        return $message->getView();
    }



    /**
     * Retourne les marques,modeles,boitiers,carburant
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Retourne les marques,modeles,boitiers,carburant",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("/api/parameters",name="nicetruc_parameters", options={"expose"=true})
     * @Rest\View()
     * @Method({"GET"})
     */
    public function getAllParametersAction(){
        $em = $this->getDoctrine()->getManager();

        $voituresEnVedette = $em->getRepository('AppBundle:Voiture')->findBy(array('isVedette'=>true));

        if(!$voituresEnVedette){
            $voituresEnVedette = $em->getRepository('AppBundle:Voiture')->findBy(array(),array(),8);
        }


         $marques = $em->getRepository('AppBundle:Marque')->findMarqueWithModele();
         $boitiers = $em->getRepository('AppBundle:Boitier')->findAll();
         $carburants = $em->getRepository('AppBundle:Carburant')->findAll();
         $modeles = $em->getRepository('AppBundle:Modele')->findAll();

        
        $view = View::create();

        $data = array('data' => array(
            'voituresEnVedette' => $voituresEnVedette,
            'marques'=>$marques,
            'boitiers'=>$boitiers,
            'carburants'=>$carburants,
            'modeles'=>$modeles,
            )

        );
        $view->setData($data)
            ->setStatusCode(200);

        return $view;
    }





}
