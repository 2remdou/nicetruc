/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('InscriptionService',['Restangular','$rootScope','$cookies','$state',
                        function(Restangular,$rootScope,$cookies,$state){

    var _inscriptionService = Restangular.all('inscription');

    this.create = function(user,scope){
      _inscriptionService.post(user).then(function(response){
          successRequest(response,scope);

          $cookies.put('email',response.user.email);

          $rootScope.user = response.user;

          $state.go('nicetruc');
      },function(response){
          errorRequest(response,scope);
      });
    };
}]);