<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Carburant
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\CarburantRepository")
 * @ExclusionPolicy("all")
 */
class Carburant
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose()
     * @SerializedName("id")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="libelleCarburant", type="string", length=255)
     * @Expose()
     * @SerializedName("libelleCarburant")
     * @Assert\NotBlank()
     */
    private $libelleCarburant;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Voiture",mappedBy="carburant")
     * @SerializedName("voitures")
     * @ORM\JoinColumn(nullable=true)
     */
    private $voitures;



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
     * Set libelleCarburant
     *
     * @param string $libelleCarburant
     * @return Carburant
     */
    public function setLibelleCarburant($libelleCarburant)
    {
        $this->libelleCarburant = $libelleCarburant;

        return $this;
    }

    /**
     * Get libelleCarburant
     *
     * @return string 
     */
    public function getLibelleCarburant()
    {
        return $this->libelleCarburant;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->voitures = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add voitures
     *
     * @param \AppBundle\Entity\Voiture $voitures
     * @return Carburant
     */
    public function addVoiture(\AppBundle\Entity\Voiture $voitures)
    {
        $this->voitures[] = $voitures;

        return $this;
    }

    /**
     * Remove voitures
     *
     * @param \AppBundle\Entity\Voiture $voitures
     */
    public function removeVoiture(\AppBundle\Entity\Voiture $voitures)
    {
        $this->voitures->removeElement($voitures);
    }

    /**
     * Get voitures
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getVoitures()
    {
        return $this->voitures;
    }
}
