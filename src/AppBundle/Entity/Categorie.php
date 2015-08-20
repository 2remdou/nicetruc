<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Categorie
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\CategorieRepository")
 */
class Categorie
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
     * @ORM\Column(name="libelleCategorie", type="string", length=255)
     */
    private $libelleCategorie;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Article",mappedBy="categorie")
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
     * Add articles
     *
     * @param \AppBundle\Entity\Article $articles
     * @return Categorie
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
