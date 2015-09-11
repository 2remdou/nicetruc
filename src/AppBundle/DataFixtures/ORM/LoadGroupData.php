<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 11/09/2015
 * Time: 11:12
 */
namespace AppBundle\DataFixtures\ORM;
use AppBundle\Entity\Group;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;


class LoadGroupData implements FixtureInterface {

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $groups = array('USER','ADMIN','SUPER_ADMIN');

        foreach($groups as $g){
            $group = new Group($g,'ROLE_'.$g);

            $manager->persist($group);
            $manager->flush();

        }
    }
}