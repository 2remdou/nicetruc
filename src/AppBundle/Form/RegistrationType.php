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
            ->add('nomUser',null,array(
                'label' => 'Nom',
                'attr' => array(
                    'placeholder' => 'Nom'
                )
            ))
            ->add('prenomUser',null,array(
                'label' => 'Prenom',
                'attr' => array(
                    'placeholder' => 'Prenom'
                )
            ))
            ->add('email', 'email', array(
                'label' => 'Adresse email',
                'attr' => array(
                    'placeholder' => 'Adresse email'
                )
            ))
            ->add('plainPassword','password',array(
                'label' => 'Mot de passe',
                'required' => true,
                'attr' => array(
                    'placeholder' => 'Mot de passe'
                )
            ))
            ->add('confirmationPassword','password',array(
                'label' => 'Confirmation',
                'required' => true,
                'mapped' => false,
                'attr' => array(
                    'placeholder' => 'Confirmation mot de passe'
                )
            ))
            ->remove('username')
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
