/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VoituresEnVedetteController',['$scope','usSpinnerService','VoitureService','$rootScope','$state',
    function($scope,usSpinnerService,VoitureService,$rootScope,$state){

        usSpinnerService.spin('nt-spinner');
        var listeVoituresEnVedette={forInsert:[],forDelete:[],oldVedette:[]};
        VoitureService.list().then(function(response){
           $scope.voitures = VoitureService.defineImagePrincipale(response.data);
           listeVoituresEnVedette.oldVedette = VoitureService.getIdVoituresEnVedette($scope.voitures);
            usSpinnerService.stop('nt-spinner');
        });

        $scope.defineVedette = function(voiture)
        {
    		var idxForInsert = listeVoituresEnVedette.forInsert.indexOf(voiture);
    		var idxForOld = listeVoituresEnVedette.oldVedette.indexOf(voiture);
    		var idxForDelele = listeVoituresEnVedette.forDelete.indexOf(voiture);

        	if(voiture.isVedette){
        		if(idxForInsert == -1 && idxForOld ==-1){//existe pas dans les insertions et old
        			listeVoituresEnVedette.forInsert.push(voiture);
        		}
        	}
        	else{
        		if(idxForOld !== -1 && idxForDelele == -1){//etait deja en vedette et n'existe pas dans delete
        			listeVoituresEnVedette.forDelete.push(voiture);
        		}
        		if(idxForInsert !== -1){//existe dans les insertions
        			listeVoituresEnVedette.forInsert.splice(idxForInsert,1);
        		}
        		if(idxForDelele !== -1){//existe dans les deletes
        			listeVoituresEnVedette.forDelete.splice(idxForDelele,1);
        		}
        	}     
        	log(listeVoituresEnVedette);
        };

        $scope.valider = function()
        {
        	liste = listeVoituresEnVedette.forInsert.concat(listeVoituresEnVedette.forDelete);
        	
        	angular.forEach(liste, function(voiture){
        		usSpinnerService.spin('nt-spinVedette'+voiture.id);
        		VoitureService.postVoitureEnVedette(angular.copy(voiture)).then(function(response){
        			usSpinnerService.stop('nt-spinVedette'+voiture.id);
        			if(voiture.isVedette){
        				var idxForInsert = listeVoituresEnVedette.forInsert.indexOf(voiture);
        				listeVoituresEnVedette.forInsert.splice(idxForInsert,1);
        			}
        			else{
        				var idxForDelele = listeVoituresEnVedette.forDelete.indexOf(voiture);
        				listeVoituresEnVedette.forDelete.splice(idxForDelele,1);
        			}
        			log('fin');
        			log(listeVoituresEnVedette);
        		},function(error){
        			log(error);
        		});
        	});
        	
        }


    }]);