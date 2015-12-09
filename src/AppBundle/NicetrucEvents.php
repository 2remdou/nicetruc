<?php



namespace AppBundle;


final class NicetrucEvents
{
    /**
     * The REGISTRATION_SUCCESS event occurs when the registration form is submitted successfully.
     *
     * This event allows you to set the response instead of using the default one.
     * The event listener method receives a FOS\UserBundle\Event\UserEvent instance.
     */
    const REGISTRATION_SUCCESS = 'nicetruc_user.registration.success';
    /**
     * The RESETTING_RESET_SUCCESS event occurs when the resetting form is submitted successfully.
     *
     * This event allows you to set the response instead of using the default one.
     * The event listener method receives a FOS\UserBundle\Event\UserEvent instance.
     */
    const RESETTING_RESET_SUCCESS = 'nicetruc_user.resetting.reset.success';

}
