<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class NiceTrucController extends Controller
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
     * @Route("/resetp")
     */
    public function resetPasswordAction(Request $request){

    }


}
