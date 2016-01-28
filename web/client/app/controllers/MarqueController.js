/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MarqueController',['$scope','MarqueService','usSpinnerService','Restangular',
    function($scope,MarqueService,usSpinnerService,Restangular){
        $scope.marques=[];
        $scope.fin=false;
        MarqueService.setNextPage(1);
        var listWithPagination = function(){
            if($scope.fin)
                return;

            usSpinnerService.spin('nt-spinner');
            $scope.isLoad = true;
            MarqueService.listWithPagination().then(function(response){
                if(response.data.items.length === 0){
                    $scope.fin=true;
                }
                MarqueService.setNextPage(parseInt(response.data.current_page_number)+1);
                $scope.marques=$scope.marques.concat(Restangular.restangularizeCollection(null,response.data.items,response.parentResource.route));
                usSpinnerService.stop('nt-spinner');
                $scope.isLoad = false;
            });

        };

        listWithPagination(MarqueService.getNextPage());
        $scope.marque = {};

        $scope.create = function(marque,formIsValid){
            $scope.formSubmit=true;
            if(!formIsValid) return;
            usSpinnerService.spin('nt-spinner');
            MarqueService.create(marque);
            $scope.formSubmit=false;
            $scope.marque = {};
        };

        $scope.update = function(marque){
            marque.visible = !marque.visible;

        };

        $scope.valideUpdate = function(marque,formIsValid){
            $scope.upformSubmit=true;
            if(!formIsValid) return;
            usSpinnerService.spin('nt-spinner');
            marque.visible = !marque.visible;
            MarqueService.update(marque);
            $scope.upformSubmit=false;

        };

        $scope.delete = function(marque){
            usSpinnerService.spin('nt-spinner');
            MarqueService.delete(marque);
        };


        $scope.$on('marque.create',function(){
            displayAlert('Marque ajoutée avec succès','success',$scope);
           refreshList();
        });

        $scope.$on('marque.update',function(){
            displayAlert('Marque modifiée avec succès','success',$scope);
            refreshList();
        });

        $scope.$on('marque.delete',function(){
            displayAlert('Marque supprimée avec succès','success',$scope);
            refreshList();
        });



        var refreshList = function(){
            return;
            // listWithPagination(MarqueService.getNextPage()-1);
        };

        $scope.Paging = function(){
            listWithPagination(MarqueService.getNextPage());
        };
}]);