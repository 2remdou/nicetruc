<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Proprietaire
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\ProprietaireRepository")
 */
class Proprietaire
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
     * @ORM\Column(name="nomProprietaire", type="string", length=255)
     */
    private $nomProprietaire;

    /**
     * @var string
     *
     * @ORM\Column(name="prenomProprietaire", type="string", length=255)
     */
    private $prenomProprietaire;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Quartier",inversedBy="proprietaires")
     * @ORM\JoinColumn(nullable=false)
     */
    private $quartier;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Article",mappedBy="proprietaire")
     */
    private $articles;

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
     * Set nomProprietaire
     *
     * @param string $nomProprietaire
     * @return Proprietaire
     */
    public function setNomProprietaire($nomProprietaire)
    {
        $this->nomProprietaire = $nomProprietaire;

        return $this;
    }

    /**
     * Get nomProprietaire
     *
     * @return string 
     */
    public function getNomProprietaire()
    {
        return $this->nomProprietaire;
    }

    /**
     * Set prenomProprietaire
     *
     * @param string $prenomProprietaire
     * @return Proprietaire
     */
    public function setPrenomProprietaire($prenomProprietaire)
    {
        $this->prenomProprietaire = $prenomProprietaire;

        return $this;
    }

    /**
     * Get prenomProprietaire
     *
     * @return string 
     */
    public function getPrenomProprietaire()
    {
        return $this->prenomProprietaire;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->articles = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set quartier
     *
     * @param \AppBundle\Entity\Quartier $quartier
     * @return Proprietaire
     */
    public function setQuartier(\AppBundle\Entity\Quartier $quartier)
    {
        $this->quartier = $quartier;

        return $this;
    }

    /**
     * Get quartier
     *
     * @return \AppBundle\Entity\Quartier 
     */
    public function getQuartier()
    {
        return $this->quartier;
    }

    /**
     * Add articles
     *
     * @param \AppBundle\Entity\Article $articles
     * @return Proprietaire
     */
    public function addArticle(\AppBundle\Entity\Article $articles)
    {
        $this->articles[] = $articles;

        return $this;
    }

    /**
     * Remove articles
     *
     * @param \AppBundle\Entity\Article $articles
     */
    public function removeArticle(\AppBundle\Entity\Article $articles)
    {
        $this->articles->removeElement($articles);
    }

    /**
     * Get articles
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getArticles()
    {
        return $this->articles;
    }
}
