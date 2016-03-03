<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Postulant
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\PostulantRepository")
 */
class Postulant
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nomPostulant", type="string", length=255)
     */
    private $nomPostulant;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone", type="string", length=255)
     */
    private $telephone;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Voiture",inversedBy="images")
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
}
