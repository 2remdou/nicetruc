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
use AppBundle\ElasticaBundle\Model\AdvancedSearch;



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
     * @Route("/api/search/word/{keySearch}",name="nicetruc_search_word", options={"expose"=true})
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
         * @Route("/api/search/advancedSearch",name="nicetruc_advanced", options={"expose"=true})
     * @Rest\View()
     * @Method({"POST"})
     */

    public function searchAdvancedAction(Request $request){
        $elasticManager = $this->get('fos_elastica.manager');

        $advancedSearch = new AdvancedSearch();

        $advancedSearch->handleRequest($request);
            
        $voitures = $elasticManager->getRepository('AppBundle:Voiture')->searchAdvanced($advancedSearch);
        
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
