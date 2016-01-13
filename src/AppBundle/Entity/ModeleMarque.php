<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * ModeleMarque
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\ModeleMarqueRepository")
 * @ExclusionPolicy("all")
 */
class ModeleMarque
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
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Marque",inversedBy="modeleMarques")
     * @ORM\JoinColumn(nullable=false)
     * @SerializedName("marque")
     */
    private $marque;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Modele",inversedBy="modeleMarques",cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @SerializedName("modele")
     */
    private $modele;

    /**
     * @var integer
     *
     * @ORM\Column(name="anneeModele", type="integer")
     * @Expose()
     * @SerializedName("anneeModele")
     * @Assert\GreaterThan(value = 1900)
     */
    private $anneeModele;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Voiture",mappedBy="modeleMarque")
     * @SerializedName("voitures")
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
     * Constructor
     */
    public function __construct()
    {
        $this->voitures = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set marque
     *
     * @param \AppBundle\Entity\Marque $marque
     * @return ModeleMarque
     */
    public function setMarque(\AppBundle\Entity\Marque $marque)
    {
        $this->marque = $marque;

        return $this;
    }

    /**
     * Get marque
     *
     * @return \AppBundle\Entity\Marque 
     */
    public function getMarque()
    {
        return $this->marque;
    }

    /**
     * Set modele
     *
     * @param \AppBundle\Entity\Modele $modele
     * @return ModeleMarque
     */
    public function setModele(\AppBundle\Entity\Modele $modele)
    {
        $this->modele = $modele;

        return $this;
    }

    /**
     * Get modele
     *
     * @return \AppBundle\Entity\Modele 
     */
    public function getModele()
    {
        return $this->modele;
    }

    /**
     * Add voitures
     *
     * @param \AppBundle\Entity\Voiture $voitures
     * @return ModeleMarque
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

    /**
     * Set anneeModele
     *
     * @param integer $anneeModele
     * @return Modele
     */
    public function setAnneeModele($anneeModele)
    {
        $this->anneeModele = $anneeModele;

        return $this;
    }

    /**
     * Get anneeModele
     *
     * @return integer
     */
    public function getAnneeModele()
    {
        return $this->anneeModele;
    }
}
