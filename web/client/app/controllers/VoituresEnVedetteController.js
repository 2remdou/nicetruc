/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VoituresEnVedetteController',['$scope','usSpinnerService','VoitureService','$rootScope','$state',
    function($scope,usSpinnerService,VoitureService,$rootScope,$state){
		var LIMIT_VEDETTE = 9;
        usSpinnerService.spin('nt-spinner');
        var listeVoituresEnVedette={forInsert:[],forDelete:[],oldVedette:[]};
		$scope.totalSelect = 0;
        VoitureService.list().then(function(response){
           $scope.voitures = VoitureService.defineImagePrincipale(response.data);
           listeVoituresEnVedette.oldVedette = VoitureService.getIdVoituresEnVedette($scope.voitures);
			$scope.totalSelect = listeVoituresEnVedette.oldVedette.length;
			log($scope.totalSelect);
            usSpinnerService.stop('nt-spinner');
        });

        $scope.defineVedette = function(voiture)
        {

    		var idxForInsert = listeVoituresEnVedette.forInsert.indexOf(voiture);
    		var idxForOld = listeVoituresEnVedette.oldVedette.indexOf(voiture);
    		var idxForDelele = listeVoituresEnVedette.forDelete.indexOf(voiture);

        	if(voiture.isVedette){
				$scope.totalSelect++;
				log($scope.totalSelect);
				if($scope.totalSelect > LIMIT_VEDETTE){
					displayAlert('Vous ne pouvez pas depasser '+LIMIT_VEDETTE+' voitures en vedette','danger',$scope);
					voiture.isVedette=false;
					$scope.totalSelect = LIMIT_VEDETTE;
					return;
				}
        		if(idxForInsert == -1 && idxForOld ==-1){//existe pas dans les insertions et old
        			listeVoituresEnVedette.forInsert.push(voiture);
        		}
        	}
        	else{
				$scope.totalSelect--;
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
					voiture.isOk=true;
					voiture.typeResultat="success";
					voiture.typeIcon="ok";
        		},function(error){
					usSpinnerService.stop('nt-spinVedette'+voiture.id);
        			voiture.isOk=true;
					voiture.typeResultat="danger"
					voiture.typeIcon="remove"
        		});
        	});
        	
        }

		$scope.$watch('totalSelect',function(newValue,oldValue){
			$rootScope.$broadcast('vedette.limite.exceed');
		});


    }]);