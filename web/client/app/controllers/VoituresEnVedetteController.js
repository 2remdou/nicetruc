/**
 * Created by touremamadou on 12/09/2015.
 */
app.controller('VoituresEnVedetteController',['$scope','usSpinnerService','VoitureService','$rootScope','$timeout',
    function($scope,usSpinnerService,VoitureService,$rootScope,$timeout){
		var LIMIT_VEDETTE = 9;
		$scope.voitures=[];
		var listeVoituresEnVedette={forInsert:[],forDelete:[],oldVedette:[]};
		VoitureService.setNextPage(1);
		$scope.fin=false;

		var listWithPagination = function(){
			if($scope.fin)
				return;

			usSpinnerService.spin('nt-spinner');
			$scope.isLoad = true;
			VoitureService.listWithPagination().then(function(response){
				if(response.data.items.length === 0){
					$scope.fin=true;
				}
				$scope.isLoad = false;
				v = VoitureService.defineImagePrincipale(response.data.items);
				$scope.voitures=$scope.voitures.concat(v);
				VoitureService.setNextPage(parseInt(response.data.current_page_number)+1);
				listeVoituresEnVedette.oldVedette = VoitureService.getIdVoituresEnVedette($scope.voitures);
				$scope.totalSelect = listeVoituresEnVedette.oldVedette.length;
				usSpinnerService.stop('nt-spinner');
			});

		};
		listWithPagination();
        $scope.defineVedette = function(voiture)
        {

    		var idxForInsert = listeVoituresEnVedette.forInsert.indexOf(voiture);
    		var idxForOld = listeVoituresEnVedette.oldVedette.indexOf(voiture);
    		var idxForDelele = listeVoituresEnVedette.forDelete.indexOf(voiture);

        	if(voiture.isVedette){
				$scope.totalSelect++;
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
				usSpinnerService.spin('nt-spinner');
        		VoitureService.postVoitureEnVedette(angular.copy(voiture)).then(function(response){
        			usSpinnerService.stop('nt-spinner');
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
					usSpinnerService.stop('nt-spinner');
        			voiture.isOk=true;
					voiture.typeResultat="danger"
					voiture.typeIcon="remove"
        		});
        	});
        	
        }

		$scope.$watch('totalSelect',function(newValue,oldValue){
			$rootScope.$broadcast('vedette.limite.exceed');
		});

		$scope.Paging = function(){
			listWithPagination(VoitureService.getNextPage());
		};

    }]);