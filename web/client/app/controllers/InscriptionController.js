/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('InscriptionController',['$scope','InscriptionService','$cookies','Digest','$window',
                                function($scope,InscriptionService,$cookies,Digest,$window){


    $scope.create = function(user){
            InscriptionService.create(user,$scope);
    }
}]);