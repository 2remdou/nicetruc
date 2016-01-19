/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('ModeleMarqueController',['$scope','MarqueService','ModeleService','ModeleMarqueService','$q','usSpinnerService',
    function($scope,MarqueService,ModeleService,ModeleMarqueService,$q,usSpinnerService){
    
    usSpinnerService.spin('nt-spinner');   
    //$scope.modeleMarques = ModeleMarqueService.list().$object;
    $scope.modeles = ModeleService.list().$object;

    MarqueService.list().then(function(response){
        $scope.marques = response;
        usSpinnerService.stop('nt-spinner');
    });
    $scope.modele = {};

    $scope.create = function(modeleMarque,modele,formIsValid){
        $scope.formSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
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

    $scope.valideUpdate = function(modeleMarque,formIsValid){
        $scope.upformSubmit=true;
        if(!formIsValid) return;
        usSpinnerService.spin('nt-spinner');
        modeleMarque.visible = !modeleMarque.visible;
        modele=getModeleById(modeleMarque.modele);
        if(modele == undefined){
            displayAlert('Ce modele est invalide','danger',$scope);
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
        $scope.upformSubmit=false;

    };

    $scope.delete = function(modeleMarque){
        usSpinnerService.spin('nt-spinner');
        ModeleMarqueService.delete(modeleMarque);
    };


    $scope.$on('modeleMarque.create',function(){
        displayAlert('Modele ajouté avec succès','success',$scope);
        refreshList();
    });

    $scope.$on('modeleMarque.update',function(){
        displayAlert('Modele modifié avec succès','success',$scope);
        refreshList();
    });

    $scope.$on('modeleMarque.delete',function(){
        displayAlert('Modele supprimé avec succès','success',$scope);
        refreshList();
    });



    var refreshList = function(){
         ModeleMarqueService.list().then(function(response){
            $scope.modeleMarques = response;
            usSpinnerService.stop('nt-spinner');
        });


    };

    var nettoyage = function(){
        $scope.formSubmit=false;
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