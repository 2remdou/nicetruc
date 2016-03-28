<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Quartier
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\QuartierRepository")
 * @ExclusionPolicy("all")
 */
class Quartier
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @Expose()
     * @SerializedName("id")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="libelleQuartier", type="string", length=255)
     * @Expose()
     * @SerializedName("libelleQuartier")
     * @Assert\NotBlank()
     */
    private $libelleQuartier;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Ville",inversedBy="quartiers")
     * @ORM\JoinColumn(nullable=false)
     * @Expose()
     * @SerializedName("ville")
     */
    private $ville;
    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\User",mappedBy="quartier")
     */
    private $users;


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
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Add users
     *
     * @param \AppBundle\Entity\User $users
     * @return Quartier
     */
    public function addUser(\AppBundle\Entity\User $users)
    {
        $this->users[] = $users;

        return $this;
    }

    /**
     * Remove users
     *
     * @param \AppBundle\Entity\User $users
     */
    public function removeUser(\AppBundle\Entity\User $users)
    {
        $this->users->removeElement($users);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getUsers()
    {
        return $this->users;
    }
}
