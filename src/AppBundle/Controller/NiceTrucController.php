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
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('AppBundle::index.html.twig');
    }

    /**
     * @Route("/villes",name="nicetruc_ville")
     * @Security("has_role('ROLE_SUPER_ADMIN')")
     */
    public function villeAction(Request $request){
        return $this->render('AppBundle::ville.html.twig');
    }

    /**
     * @Route("/quartiers",name="nicetruc_quartier")
     * @Security("has_role('ROLE_SUPER_ADMIN')")
     */
    public function quartierAction(Request $request){
        return $this->render('AppBundle::quartier.html.twig');
    }

    /**
     * @Route("/article",name="nicetruc_article")
     * @Security("has_role('ROLE_USER')")
     */
    public function articleAction(Request $request){
        return $this->render('AppBundle::article.html.twig');
    }

    /**
     * @Route("/categorie",name="nicetruc_categorie")
     * @Security("has_role('ROLE_SUPER_ADMIN')")
     */
    public function categorieAction(Request $request){
        return $this->render('AppBundle::categorie.html.twig');
    }

    /**
     * @Route("/boitier",name="nicetruc_boitier")
     * @Security("has_role('ROLE_SUPER_ADMIN')")
     */
    public function BoitierAction(Request $request){
        return $this->render('AppBundle::boitier.html.twig');
    }

    /**
     * @Route("/carburant",name="nicetruc_carburant")
     * @Security("has_role('ROLE_SUPER_ADMIN')")
     */
    public function CarburantAction(Request $request){
        return $this->render('AppBundle::carburant.html.twig');
    }

    /**
     * @Route("/marque",name="nicetruc_marque")
     * @Security("has_role('ROLE_SUPER_ADMIN')")
     */
    public function MarqueAction(Request $request){
        return $this->render('AppBundle::marque.html.twig');
    }

    /**
     * @Route("/api/voiture/{id}/image",name="nicetruc_image", options={"expose"=true})
     * @Rest\View()
     */
    public function postImageAction($id,Request $request){
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
        $image->setVoiture($voiture);
        $em->persist($image);
        $em->flush();

        $message->config("Image ".$file->getClientOriginalName()." uploader avec succes",'success',200);

        return $message->getView();
    }
    /**
     * Reetourne les voitures en vedette
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Reetourn les voitures en vedette",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the user is not found"
     *   }
     * )
     * @Route("/api/voitures/vedette",name="nicetruc_voitureVedette", options={"expose"=true})
     * @Rest\View()
     * @Method({"GET"})
     */
    public function getVoitureVedetteAction(){
        $em = $this->getDoctrine()->getManager();

        $voitures = $em->getRepository('AppBundle:Voiture')->findBy(array('isVedette'=>true));
        $view = View::create();

        if(!$voitures){
            $voitures = $em->getRepository('AppBundle:Voiture')->findBy(array(),array('datePublication' => 'DESC'),8);
        }


        return $view->setData($voitures)->setStatusCode('200');
    }

}
