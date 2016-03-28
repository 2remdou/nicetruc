<?php

namespace AppBundle\Entity;

use AppBundle\Entity\ArticleInterface;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Categorie
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\CategorieRepository")
 * @ExclusionPolicy("all")
 */
class Categorie
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
     * @ORM\Column(name="libelleCategorie", type="string", length=255)
     * @Expose()
     * @SerializedName("libelleCategorie")
     * @Assert\NotBlank()
     */
    private $libelleCategorie;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Voiture",mappedBy="categorie")
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
     * Set libelleCategorie
     *
     * @param string $libelleCategorie
     * @return Categorie
     */
    public function setLibelleCategorie($libelleCategorie)
    {
        $this->libelleCategorie = $libelleCategorie;

        return $this;
    }

    /**
     * Get libelleCategorie
     *
     * @return string 
     */
    public function getLibelleCategorie()
    {
        return $this->libelleCategorie;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->articles = new \Doctrine\Common\Collections\ArrayCollection();
    }



    /**
     * Add voiture
     *
     * @param \AppBundle\Entity\Voiture $voiture
     *
     * @return Categorie
     */
    public function addVoiture(\AppBundle\Entity\Voiture $voiture)
    {
        $this->voitures[] = $voiture;

        return $this;
    }

    /**
     * Remove voiture
     *
     * @param \AppBundle\Entity\Voiture $voiture
     */
    public function removeVoiture(\AppBundle\Entity\Voiture $voiture)
    {
        $this->voitures->removeElement($voiture);
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
