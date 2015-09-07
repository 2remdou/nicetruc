<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * User
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\UserRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class User extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected  $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nomUser", type="string", length=255)
     */
    private $nomUser;

    /**
     * @var string
     *
     * @ORM\Column(name="prenomUser", type="string", length=255)
     */
    private $prenomUser;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Quartier",inversedBy="users")
     * @ORM\JoinColumn(nullable=false)
     */
    private $quartier;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Article",mappedBy="users")
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
     * Set nomUser
     *
     * @param string $nomUser
     * @return User
     */
    public function setNomUser($nomUser)
    {
        $this->nomUser = $nomUser;

        return $this;
    }

    /**
     * Get nomUser
     *
     * @return string 
     */
    public function getNomUser()
    {
        return $this->nomUser;
    }

    /**
     * Set prenomUser
     *
     * @param string $prenomUser
     * @return User
     */
    public function setPrenomUser($prenomUser)
    {
        $this->prenomUser = $prenomUser;

        return $this;
    }

    /**
     * Get prenomUser
     *
     * @return string 
     */
    public function getPrenomUser()
    {
        return $this->prenomUser;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->articles = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set quartier
     *
     * @param \AppBundle\Entity\Quartier $quartier
     * @return User
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
     * @return User
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

    /**
     * @ORM\PrePersist
     *
     */
    public function prePersist(){
        $this->setUsername($this->getEmail());
    }
}
