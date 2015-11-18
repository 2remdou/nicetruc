<?php
/**
 * Created by PhpStorm.
 * User: mdoutoure
 * Date: 18/11/2015
 * Time: 13:48
 */
if(@$_ENV['MYSQL_ADDON_HOST']) {
    $container->setParameter('database_host', $_ENV['MYSQL_ADDON_HOST']);
    $container->setParameter('database_port', $_ENV['MYSQL_ADDON_PORT']);
    $container->setParameter('database_name', $_ENV['MYSQL_ADDON_DB']);
    $container->setParameter('database_user', $_ENV['MYSQL_ADDON_USER']);
    $container->setParameter('database_password', $_ENV['MYSQL_ADDON_PASSWORD']);
}