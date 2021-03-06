<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Modele
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\ModeleRepository")
 * @ExclusionPolicy("all")
 */
class Modele
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @Expose()
     * @SerializedName("id")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="libelleModele", type="string", length=255)
     * @Expose()
     * @SerializedName("libelleModele")
     * @Assert\NotBlank()
     */
    private $libelleModele;


    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\modeleMarque",mappedBy="modele")
     * @ORM\JoinColumn(nullable=true)
     */
    private $modeleMarques;



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
     * Set libelleModele
     *
     * @param string $libelleModele
     * @return Modele
     */
    public function setLibelleModele($libelleModele)
    {
        $this->libelleModele = $libelleModele;

        return $this;
    }

    /**
     * Get libelleModele
     *
     * @return string 
     */
    public function getLibelleModele()
    {
        return $this->libelleModele;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->modeleMarques = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add modeleMarques
     *
     * @param \AppBundle\Entity\modeleMarque $modeleMarques
     * @return Modele
     */
    public function addModeleMarque(\AppBundle\Entity\modeleMarque $modeleMarques)
    {
        $this->modeleMarques[] = $modeleMarques;

        return $this;
    }

    /**
     * Remove modeleMarques
     *
     * @param \AppBundle\Entity\modeleMarque $modeleMarques
     */
    public function removeModeleMarque(\AppBundle\Entity\modeleMarque $modeleMarques)
    {
        $this->modeleMarques->removeElement($modeleMarques);
    }

    /**
     * Get modeleMarques
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getModeleMarques()
    {
        return $this->modeleMarques;
    }


}
