/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ModeleMarqueController',['$scope','MarqueService','ModeleService','ModeleMarqueService','$q',function($scope,MarqueService,ModeleService,ModeleMarqueService,$q){
    $scope.modeleMarques = ModeleMarqueService.list().$object;
    $scope.modeles = ModeleService.list().$object;
    $scope.marques = MarqueService.list().$object;
    $scope.modele = {};

    $scope.create = function(modeleMarque,modele){

        //verifier si le meme libelle existe
        var exist = getModeleByLibelle(modele);
        //creer le modele si n'existe pas
        if(exist == undefined){
            ModeleService.create(modele).then(function(data){
                modeleMarque.modele=data;
                ModeleMarqueService.create(modeleMarque);
                nettoyage();

            });
        }
        else{
            modeleMarque.modele=exist;
            ModeleMarqueService.create(modeleMarque);
            nettoyage();
        }

    };

    $scope.update = function(modeleMarque){
        modeleMarque.visible = !marque.modeleMarque;

    };

    $scope.valideUpdate = function(modeleMarque){
        modeleMarque.visible = !modeleMarque.visible;
        modele=getModeleById(modeleMarque.modele);
        if(modele == undefined){
            $rootScope.$on('nicetruc.error',function(){
               return 'Ce modele est invalide';
            });
        }
        else{
            var oldModele=modeleMarque.modele;
            modeleMarque.modele=modele;
            modeleMarque.modele.libelleModele=oldModele.libelleModele;

            ModeleService.update(modeleMarque.modele).then(function(data){
                modeleMarque.modele=data;
                ModeleMarqueService.update(modeleMarque);
            });

        }

    };

    $scope.delete = function(modeleMarque){
        ModeleMarqueService.delete(modeleMarque);
    };


    $scope.$on('modeleMarque.create',function(){
       refreshList();
    });

    $scope.$on('modeleMarque.update',function(){
       refreshList();
    });

    $scope.$on('modeleMarque.delete',function(){
       refreshList();
    });



    var refreshList = function(){
        $scope.modeleMarques = ModeleMarqueService.list().$object;
    };

    var nettoyage = function(){
        $scope.modeleMarque = {};
        $scope.marque = {};
        $scope.modele = {};
    };
    
    var getModeleByLibelle = function(modele){
        return _.find($scope.modeles,function(mod){
            if(!mod.hasOwnProperty('libelleModele') || !modele.hasOwnProperty('libelleModele')){
                return undefined;
            }
            return modele.libelleModele.toUpperCase() === mod.libelleModele.toUpperCase();
        });
    };

    var getModeleById = function(modele){
        return _.find($scope.modeles,function(mod){
            if(!mod.hasOwnProperty('id') || !modele.hasOwnProperty('id')){
                return undefined;
            }
            return modele.id === mod.id;
        });

    }

}]);