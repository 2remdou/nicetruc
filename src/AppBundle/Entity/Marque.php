<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\VirtualProperty;
use JMS\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Marque
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\MarqueRepository")
 * @ExclusionPolicy("all")
 */
class Marque
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
     * @ORM\Column(name="libelleMarque", type="string", length=255)
     * @Expose()
     * @SerializedName("libelleMarque")
     * @Assert\NotBlank()
     */
    private $libelleMarque;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\modeleMarque",mappedBy="marque")
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
     * Set libelleMarque
     *
     * @param string $libelleMarque
     * @return Marque
     */
    public function setLibelleMarque($libelleMarque)
    {
        $this->libelleMarque = $libelleMarque;

        return $this;
    }

    /**
     * Get libelleMarque
     *
     * @return string 
     */
    public function getLibelleMarque()
    {
        return $this->libelleMarque;
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
     * @return Marque
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
