/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('MainController',['$scope','VoitureService','usSpinnerService',
    ,'VoitureService','MarqueService','BoitierService',
    'CarburantService','$rootScope','InfiniteScrollService',
    function($scope,VoitureService,usSpinnerService,
        VoitureService,MarqueService,BoitierService,CarburantService,$rootScope,InfiniteScrollService)
    {
        usSpinnerService.spin('nt-spinner');
        $scope.voitures=[];
        $scope.nbreLoader=2;
        $scope.isLoad = false;
        var page=1;
        $scope.$emit('parameters.started.load');

        $rootScope.$on('parameters.completed.load',function(event,data){
            $scope.nbreLoader--;
            $scope.marques = MarqueService.getMarques();
            $scope.boitiers = BoitierService.getBoitiers();
            $scope.carburants = CarburantService.getCarburants();
            // VoitureService.setZoneDeRecherche($scope.voituresEnVedette);

        });

        $scope.Paging = function(){
            usSpinnerService.spin('nt-spinner');
            InfiniteScrollService.scrollVoiture(page++);
            $scope.isLoad = true;
            if($scope.nbreLoader<=0){ // chargement parallele
                usSpinnerService.stop('nt-spinner');
            }
        };

        $scope.$on('load.completed.scrollvoiture', function(event,args){
            $scope.nbreLoader--;
            $scope.voitures=$scope.voitures.concat(args.voitures);
            $scope.isLoad = false;
        });

        $scope.$watch('nbreLoader', function(newValue, oldValue, scope) {
            if(newValue<=0){
                usSpinnerService.stop('nt-spinner');
            }
        });

    }]);