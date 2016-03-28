<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Validator\Constraints as NicetrucAssert;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;

/**
 * Postulant
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PostulantRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
 */
class Postulant
{
    /**
     * @var integer
     *
         * @ORM\Column(type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @Expose()
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nomPostulant", type="string", length=255)
     * @Assert\NotBlank(message="le nom du postulant est obligatoire")
     * @Expose()
     * @SerializedName("nomPostulant")
     */
    private $nomPostulant;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone", type="string", length=255)
     * @Assert\NotBlank(message="le numero de telephone est obligatoire")
     * @Expose()
     * @NicetrucAssert\IsGuineanPhone()
     * @SerializedName("telephone")
     */
    private $telephone;
    /**
     * @var \DateTime
     * @ORM\Column(name="datePostule", type="datetime")
     * @SerializedName("datePostule")
     * @Expose()
     */
    protected  $datePostule;

    /**
     * @var boolean
     * @ORM\Column(name="disabled",type="boolean",options={"default":false})
     * @Expose()
     * @SerializedName("disabled")
     */
    protected $disabled;



    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Voiture",inversedBy="postulants")
     * @ORM\JoinColumn(nullable=false)
     */
    private $voiture;


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
     * Set nomPostulant
     *
     * @param string $nomPostulant
     *
     * @return Postulant
     */
    public function setNomPostulant($nomPostulant)
    {
        $this->nomPostulant = $nomPostulant;

        return $this;
    }

    /**
     * Get nomPostulant
     *
     * @return string
     */
    public function getNomPostulant()
    {
        return $this->nomPostulant;
    }

    /**
     * Set telephone
     *
     * @param string $telephone
     *
     * @return Postulant
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * Get telephone
     *
     * @return string
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Set voiture
     *
     * @param \AppBundle\Entity\Voiture $voiture
     *
     * @return Postulant
     */
    public function setVoiture(\AppBundle\Entity\Voiture $voiture = null)
    {
        $this->voiture = $voiture;

        return $this;
    }

    /**
     * Get voiture
     *
     * @return \AppBundle\Entity\Voiture
     */
    public function getVoiture()
    {
        return $this->voiture;
    }

    /**
     * @ORM\PrePersist
     */
    public function prePersist(){
        $this->setDatePostule(new \DateTime());
        $this->setDisabled(false);
    }


    /**
     * Set datePostule
     *
     * @param \DateTime $datePostule
     *
     * @return Postulant
     */
    public function setDatePostule($datePostule)
    {
        $this->datePostule = $datePostule;

        return $this;
    }

    /**
     * Get datePostule
     *
     * @return \DateTime
     */
    public function getDatePostule()
    {
        return $this->datePostule;
    }

    /**
     * Set disabled
     *
     * @param boolean $disabled
     *
     * @return Postulant
     */
    public function setDisabled($disabled)
    {
        $this->disabled = $disabled;

        return $this;
    }

    /**
     * Get disabled
     *
     * @return boolean
     */
    public function getDisabled()
    {
        return $this->disabled;
    }
}
