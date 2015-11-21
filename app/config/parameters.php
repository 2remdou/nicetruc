<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 18/11/2015
 * Time: 13:48
 */

$container->setParameter('database_host', $_SERVER['MYSQL_ADDON_URI']);
$container->setParameter('database_port', $_SERVER['MYSQL_ADDON_PORT']);
$container->setParameter('database_name', $_SERVER['MYSQL_ADDON_DB']);
$container->setParameter('database_user', $_SERVER['MYSQL_ADDON_USER']);
$container->setParameter('database_password', $_SERVER['MYSQL_ADDON_PASSWORD']);