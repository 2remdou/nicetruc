<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Image;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use FOS\RestBundle\Controller\Annotations as Rest;

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
     * @Route("/images/",name="nicetruc_image")
     * @Rest\View()
     */
    public function postImageAction(Request $request){
        $uploadHandler = $this->get('srio_rest_upload.upload_handler');
        $result = $uploadHandler->handleRequest($request);

        if (($response = $result->getResponse()) !== null) {
            return $response;
        }

        if (($file = $result->getFile()) !== null) {
            // Store the file path in an entity, call an API,
            // do whatever with the uploaded file here.
            return new Response($file->getName( ));
        }

        throw new BadRequestHttpException('Unable to handle upload request');
    }

}
