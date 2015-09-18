<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 18/09/2015
 * Time: 12:39
 */
namespace AppBundle\Model;

interface ArticleInterface
{
    public function setDescription($description);

    public function getDescription();

    public function setDatePublication($datePublication);

    public function getDatePublication();

}