/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('PostulantService',
    ['$rootScope','Restangular',
    function($rootScope,Restangular){
        var that = this;

        var _postulantService = Restangular.all('postulants');

        this.add = function(postulant){
            _postulantService.post(postulant).then(function(response){
                $rootScope.$broadcast('added.postulant',{message:''});
            },function(error){
                $rootScope.$broadcast('show.error',{message:error.data  });
            });
        };
}]);