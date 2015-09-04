<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class RegistrationType  extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nomUser')
            ->add('prenomUser')
            ->add('quartier')
        ;
    }

    public function getParent()
    {
        return 'fos_user_registration';
    }


    /**
     * @return string
     */
    public function getName()
    {
        return 'nicetruc_user_registration';
    }
}
