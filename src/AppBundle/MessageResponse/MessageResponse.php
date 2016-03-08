<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 30/10/2015
 * Time: 16:07
 */

namespace AppBundle\MessageResponse;

use FOS\RestBundle\View\View;

class MessageResponse {

    private $view;

    public static function message($textAlert='',$typeAlert='success',$codeStatus=200,$data=null){

        $message=array(
            'textAlert'=> $textAlert,
            'typeAlert'=> $typeAlert,
        );
        return View::create(array('data'=>array_merge($message,is_array($data)?$data:array())),$codeStatus);
    }

    public function __construct(View $view){
        $this->view=$view;
    }

    public function getView(){
        return $this->view;
    }

    public function setView(View $view){
        $this->view = $view;
    }

    public function config($message,$typeMessage,$status){
        $this->view->setData(array(
            'data'=> array(
                array('texte' => $message,'typeAlert'=>$typeMessage)
            )
        ))
            ->setStatusCode($status);
    }
} 