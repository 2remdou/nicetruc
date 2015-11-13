/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('InscriptionService',['Restangular','$rootScope','$cookies','$state',
                        function(Restangular,$rootScope,$cookies,$state){

    var _inscriptionService = Restangular.all('inscription');

    this.create = function(user){
      return _inscriptionService.post(user);
    };
}]);