/**
 * Created by touremamadou on 01/03/2016.
 */
app.controller('ListePostulantController',
    ['$scope','postulants','usSpinnerService','$element','close','PostulantService',
    'usSpinnerService','$filter','ModalService',
    function($scope,postulants,usSpinnerService,$element,close,PostulantService,
        usSpinnerService,$filter,ModalService){

        $scope.postulants = postulants;
        $scope.close = function(result){
            $element.modal('hide');
            close(result,500);
        };

        $scope.send = function(postulant,formIsValid){
            $scope.formSubmit = true;
            if(!formIsValid) return;
            $element.modal('hide');
            close(postulant,500);


            $scope.formSubmit = false;
        };

        $scope.disabledPostulant = function(postulant){
            ModalService.showModal({
                templateUrl : 'client/app/views/modalConfirmation.html',
                controller: 'ModalConfirmationController',
                inputs:{
                    texte : 'Voulez-vous vraiment supprimer ce postulant?'
                },
            }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result){
                    if(result) {
                        usSpinnerService.spin('nt-spinner');
                        PostulantService.disabledPostulant(postulant);
                    }
                })
            })
        };

        $scope.$on('disabled.postulant',function(event,args){
            displayAlert(args.alert.textAlert,args.alert.typeAlert,$scope);
            usSpinnerService.stop('nt-spinner');
        });

        $scope.sortByDate = function(){
            if($scope.dateCroissant){
                $scope.postulants=$filter('orderBy')($scope.postulants,'datePostule');
            }
            else{
                $scope.postulants=$filter('orderBy')($scope.postulants,'-datePostule');
            }
            $scope.dateCroissant = !$scope.dateCroissant;
        };


}]);