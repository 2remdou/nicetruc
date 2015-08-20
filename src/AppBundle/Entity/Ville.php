<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Ville
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\VilleRepository")
 */
class Ville
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="libelleVille", type="string", length=255)
     */
    private $libelleVille;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Quartier",mappedBy="ville")
     */
    private $quartiers;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set libelleVille
     *
     * @param string $libelleVille
     * @return Ville
     */
    public function setLibelleVille($libelleVille)
    {
        $this->libelleVille = $libelleVille;

        return $this;
    }

    /**
     * Get libelleVille
     *
     * @return string 
     */
    public function getLibelleVille()
    {
        return $this->libelleVille;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->quartiers = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add quartiers
     *
     * @param \AppBundle\Entity\Quartier $quartiers
     * @return Ville
     */
    public function addQuartier(\AppBundle\Entity\Quartier $quartiers)
    {
        $this->quartiers[] = $quartiers;

        return $this;
    }

    /**
     * Remove quartiers
     *
     * @param \AppBundle\Entity\Quartier $quartiers
     */
    public function removeQuartier(\AppBundle\Entity\Quartier $quartiers)
    {
        $this->quartiers->removeElement($quartiers);
    }

    /**
     * Get quartiers
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getQuartiers()
    {
        return $this->quartiers;
    }
}
