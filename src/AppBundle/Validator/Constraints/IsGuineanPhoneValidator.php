<?php
/**
 * Created by PhpStorm.
 * User: touremamadou
 * Date: 04/03/2016
 * Time: 06:13
 */

namespace AppBundle\Validator\Constraints;



use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * @Annotation
 */
class IsGuineanPhoneValidator extends ConstraintValidator
{
    public $message= 'Le numero "%telephone%" n\'est pas valide';

    /**
     * Checks if the passed value is valid.
     *
     * @param mixed $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint)
    {
        $this->context->addViolation($constraint->message,array("%telephone%"=>$value));
    }
}