<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Ville
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\VilleRepository")
 * @ExclusionPolicy("all")
 */
class Ville
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
     * @ORM\Column(name="libelleVille", type="string", length=255)
     * @Expose()
     * @SerializedName("libelleVille")
     * @Assert\NotBlank()
     */
    private $libelleVille;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Quartier",mappedBy="ville")
     * @Expose()
     * @SerializedName("quartiers")
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
