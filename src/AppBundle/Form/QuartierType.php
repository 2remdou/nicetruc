<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use AppBundle\Form\VilleType;

class QuartierType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('libelleQuartier',null,array(
                'label' => 'Nom Quartier',
                'attr' => array(
                    'placeholder' => 'Nom du quartier'
                )
            ))
            ->add('ville','entity',array(
                'class' => 'AppBundle:Ville',
                'property'=> 'libelleVille'
            ))
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Quartier'
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'nicetruc_quartier';
    }
}
