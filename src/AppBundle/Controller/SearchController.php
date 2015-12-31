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



class SearchController extends FOSRestController
{
   
    /**
     * Cherche en fonction d'un mot clé
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Cherche en fonction d'un mot clé",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the data is not found"
     *   }
     * )
     * @Route("/api/search/{keySearch}",name="nicetruc_search_all", options={"expose"=true})
     * @Rest\View()
     * @Method({"GET"})
     */
    public function searchAllAction($keySearch = null){
        $elasticManager = $this->get('fos_elastica.manager');
            
        $voitures = $elasticManager->getRepository('AppBundle:Voiture')->searchKey($keySearch);
        
        $view = View::create();

        if($voitures){
            $data = array('data' => array(
            'voitures'=>$voitures,
            ));
            $view->setData($data)
            ->setStatusCode(200);
        }
        else{
            $view->setData(null)
            ->setStatusCode(404);
        }

        return $view;
    }

    /**
     * Recherche avancée
     *
     * @ApiDoc(
     *   resource = true,
     *   description = "Recherche avancée",
     *   statusCodes = {
     *     200 = "Returned when successful",
     *     404 = "Returned when the data is not found"
     *   }
     * )
     * @RequestParam(name="marque", nullable=true, description="la marque")
     * @RequestParam(name="modele", nullable=true, strict=true, description="Le modele")
     * @RequestParam(name="boitier", nullable=true, strict=true, description="Le boitier")
     * @RequestParam(name="carburant", nullable=true, strict=true, description="Le carburant")
     * @RequestParam(name="prixMin", nullable=true, strict=true, description="le prix minimal")
     * @RequestParam(name="prixMax", nullable=true, strict=true, description="le prix maximal")
     * @RequestParam(name="kmMin", nullable=true, strict=true, description="Km minimal")
     * @RequestParam(name="kmMax", nullable=true, strict=true, description="Km maximal")
     * @Route("/api/search/advanced",name="nicetruc_advanced", options={"expose"=true})
     * @Rest\View()
     * @Method({"GET"})
     */

    public function searchAdvancedAction(ParamFetcher $paramFetcher){
        $elasticManager = $this->get('fos_elastica.manager');
            
        $voitures = $elasticManager->getRepository('AppBundle:Voiture')->searchAdvanced($keySearch);
        
        $view = View::create();

        if($voitures){
            $data = array('data' => array(
            'voitures'=>$voitures,
            ));
            $view->setData($data)
            ->setStatusCode(200);
        }
        else{
            $view->setData(null)
            ->setStatusCode(404);
        }

        return $view;
    }


}
