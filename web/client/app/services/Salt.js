/**
 * Created by touremamadou on 11/10/2015.
 */

app.factory('Salt', ['$resource', function($resource) {
    // Service to load Salt
    return $resource('/app_dev.php/:username/salt', {username:'@id'});
}]);
