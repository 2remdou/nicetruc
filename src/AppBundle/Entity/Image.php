<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;

/**
 * Image
 *
 * @ORM\Table()
 * @ORM\Entity
 * @Vich\Uploadable
 * @ExclusionPolicy("all")
 */
class Image
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
     * @ORM\Column(name="imageName", type="string", length=255)
     * @Expose()
     * @SerializedName("imageName")
     */
    private $imageName;

    /**
     *
     * @Vich\UploadableField(mapping="voiture_image", fileNameProperty="imageName")
     *
     * @var File
     * @Expose()
     * @SerializedName("imageFile")
     */
    private $imageFile;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Voiture")
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
     * Set imageName
     *
     * @param string $imageName
     * @return Image
     */
    public function setImageName($imageName)
    {
        $this->imageName = $imageName;

        return $this;
    }

    /**
     * Get imageName
     *
     * @return string 
     */
    public function getImageName()
    {
        return $this->imageName;
    }

    /**
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile $image
     */
    public function setImageFile(File $image = null)
    {
        $this->imageFile = $image;

    }

    /**
     * @return File
     */
    public function getImageFile()
    {
        return $this->imageFile;
    }

    /**
     * Set voiture
     *
     * @param \AppBundle\Entity\Voiture $voiture
     * @return Image
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