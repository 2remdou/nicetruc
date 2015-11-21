<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 18/11/2015
 * Time: 13:48
 */

$container->setParameter('database_host', $_ENV['SYMFONY__DB_HOST']);
$container->setParameter('database_port', $_ENV['SYMFONY__DB_PORT']);
$container->setParameter('database_name', $_ENV['SYMFONY__DB']);
$container->setParameter('database_user', $_ENV['SYMFONY__DB_USER']);
$container->setParameter('database_password', $_ENV['SYMFONY__DB_PASSWORD']);