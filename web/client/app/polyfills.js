/**
 * Created by touremamadou on 18/11/2015.
 */

if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}