<?php

namespace AppBundle\Entity;

use Doctrine\ORM\AbstractQuery;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;

/**
 * VoitureRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class VoitureRepository extends EntityRepository
{
    public function customFind($id){
        try{
            $resultat = $this->createQueryBuilder('v')
                ->join('v.modeleMarque','modeleMarque')
                ->addSelect('modeleMarque')
                ->join('v.boitier','boitier')
                ->addSelect('boitier')
                ->join('v.carburant','carburant')
                ->addSelect('carburant')
                ->join('v.user','user')
                ->addSelect('user')
                ->leftJoin('v.images','image')
                ->addSelect('image')
                ->leftJoin('v.imagePrincipale','imagePrincipale')
                ->addSelect('imagePrincipale')
                ->where('v.id=:id')
                ->setParameter('id',$id)
                ->getQuery()
                ->getSingleResult();
        }catch (NoResultException $ex){
            return null;
        }


        return $resultat;
    }
}
