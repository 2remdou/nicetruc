<?php

namespace AppBundle\Model;

use Doctrine\ORM\Mapping as ORM;

class Article implements ArticleInterface
{

    protected $id;

    /**
     * @var string
     * @ORM\Column(name="description", type="text")
     */
    protected  $description;

    /**
     * @var \DateTime
     * @ORM\Column(name="datePublication", type="datetime")
     */
    protected  $datePublication;


    /**
     * Set description
     *
     * @param string $description
     * @return Article
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set datePublication
     *
     * @param \DateTime $datePublication
     * @return Article
     */
    public function setDatePublication($datePublication)
    {
        $this->datePublication = $datePublication;

        return $this;
    }

    /**
     * Get datePublication
     *
     * @return \DateTime 
     */
    public function getDatePublication()
    {
        return $this->datePublication;
    }

}
