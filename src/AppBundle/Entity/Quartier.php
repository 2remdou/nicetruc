<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Quartier
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\QuartierRepository")
 */
class Quartier
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="libelleQuartier", type="string", length=255)
     */
    private $libelleQuartier;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Ville",inversedBy="quartiers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $ville;
    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Proprietaire",mappedBy="quartier")
     */
    private $proprietaires;


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
     * Set libelleQuartier
     *
     * @param string $libelleQuartier
     * @return Quartier
     */
    public function setLibelleQuartier($libelleQuartier)
    {
        $this->libelleQuartier = $libelleQuartier;

        return $this;
    }

    /**
     * Get libelleQuartier
     *
     * @return string 
     */
    public function getLibelleQuartier()
    {
        return $this->libelleQuartier;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->proprietaires = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set ville
     *
     * @param \AppBundle\Entity\Ville $ville
     * @return Quartier
     */
    public function setVille(\AppBundle\Entity\Ville $ville)
    {
        $this->ville = $ville;

        return $this;
    }

    /**
     * Get ville
     *
     * @return \AppBundle\Entity\Ville 
     */
    public function getVille()
    {
        return $this->ville;
    }

    /**
     * Add proprietaires
     *
     * @param \AppBundle\Entity\Proprietaire $proprietaires
     * @return Quartier
     */
    public function addProprietaire(\AppBundle\Entity\Proprietaire $proprietaires)
    {
        $this->proprietaires[] = $proprietaires;

        return $this;
    }

    /**
     * Remove proprietaires
     *
     * @param \AppBundle\Entity\Proprietaire $proprietaires
     */
    public function removeProprietaire(\AppBundle\Entity\Proprietaire $proprietaires)
    {
        $this->proprietaires->removeElement($proprietaires);
    }

    /**
     * Get proprietaires
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getProprietaires()
    {
        return $this->proprietaires;
    }
}
