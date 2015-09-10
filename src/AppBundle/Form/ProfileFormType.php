<?php

/*
 * This file is part of the FOSUserBundle package.
 *
 * (c) FriendsOfSymfony <http://friendsofsymfony.github.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use AppBundle\Form\QuartierType;

class ProfileFormType extends AbstractType
{
    private $class;

    /**
     * @param string $class The User class name
     */
    public function __construct($class)
    {
        $this->class = $class;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->buildUserForm($builder, $options);

        $builder->add('current_password', 'password', array(
            'label' => 'form.current_password',
            'translation_domain' => 'FOSUserBundle',
            'mapped' => false,
            'constraints' => new UserPassword(),
        ));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => $this->class,
            'intention'  => 'profile',
        ));
    }

    // BC for SF < 2.7
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $this->configureOptions($resolver);
    }

    public function getName()
    {
        return 'nicetruc_user_profile';
    }

    public function getParent()
    {
        return 'fos_user_profile';
    }

    /**
     * Builds the embedded form representing the user.
     *
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    protected function buildUserForm(FormBuilderInterface $builder, array $options)
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
            ->add('actuelPassword','password',array(
                'label' => 'Mot de passe',
                'required' => true,
                'mapped' => false,
                'constraints' => new UserPassword(),
                'attr' => array(
                    'placeholder' => 'Mot de passe actuel'
                )
            ))
            ->add('plainPassword','password',array(
                'label' => 'Mot de passe',
                'required' => true,
                'attr' => array(
                    'placeholder' => 'Nouveau mot de passe'
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
            ->add('telephone',null,array(
                'label' => 'Telephone',
                'attr' => array(
                    'placeholder' => 'Numero de telephone'
                )
            ))
            ->add('siteWeb',null,array(
                'label' => 'Site Web',
                'attr' => array(
                    'placeholder' => 'Site web'
                )
            ))
            ->add('quartier',new QuartierType(),array(
                'label' => false
            ))
            ->remove('username')
        ;
    }
}
