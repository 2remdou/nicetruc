<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\GroupInterface;
use FOS\UserBundle\Model\User as BaseUser;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * User
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\UserRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ExclusionPolicy("all")
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
     * @Expose()
     * @SerializedName("nomUser")
     * @Assert\NotBlank()
     */
    private $nomUser;

    /**
     * @var string
     *
     * @ORM\Column(name="prenomUser", type="string", length=255, nullable=true)
     * @Expose()
     * @SerializedName("prenomUser")
     */
    private $prenomUser;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone",type="string",length=255,nullable=true)
     * @Expose()
     * @SerializedName("telephone")
     */
    private $telephone;

    /**
     * @var string
     *
     * @ORM\Column(name="siteWeb",type="string",length=255,nullable=true)
     * @Expose()
     * @SerializedName("siteWeb")
     */
    private $siteWeb;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Quartier",inversedBy="users")
     * @ORM\JoinColumn(nullable=true)
     * @Expose()
     * @SerializedName("quartier")
     */
    private $quartier;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Voiture",mappedBy="user")
     */
    private $voitures;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Group")
     * @ORM\JoinTable(name="nicetruc_user_user_group",
     *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="group_id", referencedColumnName="id")}
     * )
     */
    protected $groups;
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

    public function setEmail($email)
    {
       parent::setEmail($email);
        $this->setUsername($this->getEmail());
    }


    /**
     * Set telephone
     *
     * @param string $telephone
     * @return User
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
     * Set siteWeb
     *
     * @param string $siteWeb
     * @return User
     */
    public function setSiteWeb($siteWeb)
    {
        $this->siteWeb = $siteWeb;

        return $this;
    }

    /**
     * Get siteWeb
     *
     * @return string 
     */
    public function getSiteWeb()
    {
        return $this->siteWeb;
    }

    public function setGroups(\FOS\UserBundle\Model\GroupInterface $groups=null)
    {
        if($groups === null){
            return $this;
        }
        return $this->addGroup($groups);
    }

    /**
     * Returns the user roles
     *
     * @return array The roles
     */
    public function getRoles()
    {
        $roles = $this->roles;

        foreach ($this->getGroups() as $group) {
            if(is_array($group->getRoles()))
                $roles = array_merge($roles, $group->getRoles());
            $roles[] = $group->getRoles();

        }

        // we need to make sure to have at least one role
        $roles[] = static::ROLE_DEFAULT;
        return array_unique($roles);
    }

    public function addGroup(GroupInterface $group)
    {
        if(!in_array($group->getRoles(),$this->getRoles())){
            $this->addRole($group->getRoles()) ;
        }

        if (!$this->getGroups()->contains($group)) {
            $this->getGroups()->add($group);
        }


        return $this;
    }


}
