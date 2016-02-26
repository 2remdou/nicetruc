<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Entity;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use AppBundle\Entity\Article;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Table()
 * @ExclusionPolicy("all")
 * @ORM\HasLifecycleCallbacks()
 * @Entity(repositoryClass="VoitureRepository")
 */

class Voiture extends Article
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
    protected  $id;

    /**
     * @var float
     *
     * @ORM\Column(name="prix", type="float")
     * @Expose()
     * @SerializedName("prix")
     * @Assert\GreaterThan(value = 0)
     */
    private $prix;

    /**
     * @var float
     *
     * @ORM\Column(name="kmParcouru", type="float", nullable=true)
     * @Expose()
     * @SerializedName("kmParcouru")
     * @Assert\GreaterThan(value = 0)
     */
    private $kmParcouru;

    /**
     * @var integer
     *
     * @ORM\Column(name="anneeAcquisition", type="integer", nullable=true)
     * @Expose()
     * @SerializedName("anneeAcquisition")
     * @Assert\GreaterThan(value = 1900)
     */
    private $anneeAcquisition;


    /**
     * @var integer
     *
     * @ORM\Column(name="nbrePorte", type="integer", nullable=true)
     * @Expose()
     * @SerializedName("nbrePorte")
     * @Assert\GreaterThan(value = 0)
     */
    private $nbrePorte;


    /**
     * @var integer
     *
     * @ORM\Column(name="nbreSiege", type="integer", nullable=true)
     * @Expose()
     * @SerializedName("nbreSiege")
     * @Assert\GreaterThan(value = 0)
     */
    private $nbreSiege;


    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\ModeleMarque",inversedBy="voitures")
     * @ORM\JoinColumn(nullable=false)
     * @Expose()
     * @SerializedName("modeleMarque")
     */
    private $modeleMarque;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Boitier",inversedBy="voitures")
     * @ORM\JoinColumn(nullable=false)
     * @Expose()
     * @SerializedName("boitier")
     */
    private $boitier;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Carburant",inversedBy="voitures")
     * @ORM\JoinColumn(nullable=false)
     * @Expose()
     * @SerializedName("carburant")
     */
    private $carburant;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User",inversedBy="voitures")
     * @ORM\JoinColumn(nullable=false)
     * @Expose()
     * @SerializedName("user")
     */
    protected  $user;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Categorie",inversedBy="voitures")
     * @ORM\JoinColumn(nullable=false)
     */
    protected  $categorie;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Image",mappedBy="voiture",cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=true)
     * @Expose()
     * @SerializedName("images")
     */
    protected $images;

    /**
     * @var boolean
     *
     * @ORM\Column(name="isVedette", type="boolean",nullable=true)
     * @Expose()
     * @SerializedName("isVedette")
     */

    protected $isVedette;

    /**
     * @var boolean
     *
     * @ORM\Column(name="isPublish", type="boolean",nullable=true,options={"default":true})
     * @Expose()
     * @SerializedName("isPublish")
     */

    protected $isPublish;

    /**
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\Image")
     * @ORM\JoinColumn(nullable=true)
     * @Expose()
     * @SerializedName("imagePrincipale")
     */
    protected $imagePrincipale;

    /**
     * @var string
     * @Expose()
     * @SerializedName("defaultPathImagePrincipale")
     */
    private $defaultPathImagePrincipale;



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
     * Set prix
     *
     * @param integer $prix
     * @return Voiture
     */
    public function setPrix($prix)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get prix
     *
     * @return integer 
     */
    public function getPrix()
    {
        return $this->prix;
    }

    /**
     * Set kmParcouru
     *
     * @param float $kmParcouru
     * @return Voiture
     */
    public function setKmParcouru($kmParcouru)
    {
        $this->kmParcouru = $kmParcouru;

        return $this;
    }

    /**
     * Get kmParcouru
     *
     * @return float 
     */
    public function getKmParcouru()
    {
        return $this->kmParcouru;
    }

    /**
     * Set anneeModele
     *
     * @param \Date $anneeModele
     * @return Voiture
     */
    public function setAnneeAcquisition($anneeAcquisition)
    {
        $this->anneeAcquisition = $anneeAcquisition;

        return $this;
    }

    /**
     * Get anneeAcquisition
     *
     * @return \Date
     */
    public function getAnneeAcquisition()
    {
        return $this->anneeAcquisition;
    }

    /**
     * Set nbreRoueMotrice
     *
     * @param integer $nbreRoueMotrice
     * @return Voiture
     */
    public function setNbreRoueMotrice($nbreRoueMotrice)
    {
        $this->nbreRoueMotrice = $nbreRoueMotrice;

        return $this;
    }

    /**
     * Get nbreRoueMotrice
     *
     * @return integer 
     */
    public function getNbreRoueMotrice()
    {
        return $this->nbreRoueMotrice;
    }

    /**
     * Set nbrePorte
     *
     * @param integer $nbrePorte
     * @return Voiture
     */
    public function setNbrePorte($nbrePorte)
    {
        $this->nbrePorte = $nbrePorte;

        return $this;
    }

    /**
     * Get nbrePorte
     *
     * @return integer 
     */
    public function getNbrePorte()
    {
        return $this->nbrePorte;
    }

    /**
     * Set nbreSiege
     *
     * @param integer $nbreSiege
     * @return Voiture
     */
    public function setNbreSiege($nbreSiege)
    {
        $this->nbreSiege = $nbreSiege;

        return $this;
    }

    /**
     * Get nbreSiege
     *
     * @return integer 
     */
    public function getNbreSiege()
    {
        return $this->nbreSiege;
    }

    /**
     * Set modeleMarque
     *
     * @param \AppBundle\Entity\ModeleMarque $modeleMarque
     * @return Voiture
     */
    public function setModeleMarque(\AppBundle\Entity\ModeleMarque $modeleMarque)
    {
        $this->modeleMarque = $modeleMarque;

        return $this;
    }

    /**
     * Get modeleMarque
     *
     * @return \AppBundle\Entity\ModeleMarque 
     */
    public function getModeleMarque()
    {
        return $this->modeleMarque;
    }

    /**
     * Set boitier
     *
     * @param \AppBundle\Entity\Boitier $boitier
     * @return Voiture
     */
    public function setBoitier(\AppBundle\Entity\Boitier $boitier)
    {
        $this->boitier = $boitier;

        return $this;
    }

    /**
     * Get boitier
     *
     * @return \AppBundle\Entity\Boitier 
     */
    public function getBoitier()
    {
        return $this->boitier;
    }

    /**
     * Set carburant
     *
     * @param \AppBundle\Entity\Carburant $carburant
     * @return Voiture
     */
    public function setCarburant(\AppBundle\Entity\Carburant $carburant)
    {
        $this->carburant = $carburant;

        return $this;
    }

    /**
     * Get carburant
     *
     * @return \AppBundle\Entity\Carburant 
     */
    public function getCarburant()
    {
        return $this->carburant;
    }


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->images = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set user
     *
     * @param \AppBundle\Entity\User $user
     * @return Voiture
     */
    public function setUser(\AppBundle\Entity\User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \AppBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set categorie
     *
     * @param \AppBundle\Entity\Categorie $categorie
     * @return Voiture
     */
    public function setCategorie(\AppBundle\Entity\Categorie $categorie)
    {
        $this->categorie = $categorie;

        return $this;
    }

    /**
     * Get categorie
     *
     * @return \AppBundle\Entity\Categorie 
     */
    public function getCategorie()
    {
        return $this->categorie;
    }

    /**
     * Add images
     *
     * @param \AppBundle\Entity\Image $images
     * @return Voiture
     */
    public function addImage(\AppBundle\Entity\Image $images)
    {
        $this->images[] = $images;

        return $this;
    }

    /**
     * Remove images
     *
     * @param \AppBundle\Entity\Image $images
     */
    public function removeImage(\AppBundle\Entity\Image $images)
    {
        $this->images->removeElement($images);
    }

    /**
     * Get images
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getImages()
    {
        return $this->images;
    }

    /**
     * @ORM\PrePersist
     */
    public function prePersist(){
        $this->setDatePublication(new \DateTime());
        $this->setIsPublish(true);
    }

    /**
     * Set isVedette
     *
     * @param boolean $isVedette
     * @return Voiture
     */
    public function setIsVedette($isVedette)
    {
        $this->isVedette = $isVedette;

        return $this;
    }

    /**
     * Get isVedette
     *
     * @return boolean 
     */
    public function getIsVedette()
    {
        return $this->isVedette;
    }

    /**
     * Set imagePrincipale
     *
     * @param \AppBundle\Entity\Image $imagePrincipale
     * @return Voiture
     */
    public function setImagePrincipale(\AppBundle\Entity\Image $imagePrincipale = null)
    {
        if($imagePrincipale !== null){
            $imagePrincipale->setVoiture($this);
            $this->imagePrincipale = $imagePrincipale;
        }

        $this->imagePrincipale = $imagePrincipale;

        return $this;
    }

    /**
     * Get imagePrincipale
     *
     * @return \AppBundle\Entity\Image 
     */
    public function getImagePrincipale()
    {
        return $this->imagePrincipale;
    }

    public function getDefaultPathImagePrincipale(){
        return $this->defaultPathImagePrincipale;
    }

    public function setDefaultPathImagePrincipale($defaultPathImagePrincipale)
    {
        $this->defaultPathImagePrincipale = $defaultPathImagePrincipale;

        return $this;
    }


    /**
     * Set isPublish
     *
     * @param boolean $isPublish
     *
     * @return Voiture
     */
    public function setIsPublish($isPublish)
    {
        $this->isPublish = $isPublish;

        return $this;
    }

    /**
     * Get isPublish
     *
     * @return boolean
     */
    public function getIsPublish()
    {
        return $this->isPublish;
    }
}
