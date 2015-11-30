<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Boitier
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\BoitierRepository")
 * @ExclusionPolicy("all")
 */
class Boitier
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
     * @ORM\Column(name="libelleBoitier", type="string", length=255)
     * @Expose()
     * @SerializedName("libelleBoitier")
     * @Assert\NotBlank()
     */
    private $libelleBoitier;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Voiture",mappedBy="boitier")
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
     * Set libelleBoitier
     *
     * @param string $libelleBoitier
     * @return Boitier
     */
    public function setLibelleBoitier($libelleBoitier)
    {
        $this->libelleBoitier = $libelleBoitier;

        return $this;
    }

    /**
     * Get libelleBoitier
     *
     * @return string 
     */
    public function getLibelleBoitier()
    {
        return $this->libelleBoitier;
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
     * @return Boitier
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
