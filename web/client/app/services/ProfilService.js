/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('ProfilService',['Restangular','$rootScope','$cookies','$state',
                        function(Restangular,$rootScope,$cookies,$state){

    var _profilService = Restangular.all('users');


    this.change = function(user){
        return _profilService.one('change');
    }
}]);