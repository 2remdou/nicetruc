/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('PostulantService',
    ['$rootScope','Restangular','ModalService','$state','usSpinnerService',
    function($rootScope,Restangular,ModalService,$state,usSpinnerService){
        var that = this;

        var _postulantService = Restangular.all('postulants');

        this.add = function(postulant){
            _postulantService.post(postulant).then(function(response){
                $rootScope.$broadcast('added.postulant',{alert:response.data});
            },function(error){
                $rootScope.$broadcast('show.error',{alert:error.data});
            });
        };

        this.manifesterInteret = function(voiture){
            if($rootScope.isAuthenticated()){

                var nomPostulant=$rootScope.user.nomUser;
                if(isDefined($rootScope.user.prenomUser)) nomPostulant=nomPostulant+' '+$rootScope.user.prenomUser;

                var postulant = {
                    nomPostulant:nomPostulant,
                    telephone : $rootScope.user.telephone,
                    idVoiture:voiture.id
                };
            }
            else{
                var postulant={};
            }

            ModalService.showModal({
                templateUrl: 'client/app/views/manifesterInteret.html',
                controller: 'ManifesterInteretController',
                inputs:{
                    postulant: postulant
                }
            }).then(function(modal){
                modal.element.modal();
                modal.close.then(function(result){
                    if(typeof  result === "object"){
                        var postulant = result;
                        usSpinnerService.spin('nt-spinner');
                        postulant.idVoiture=voiture.id;
                        that.add(postulant);
                    }
                });
            });


        };

        this.listePostulant = function(postulants){
          ModalService.showModal({
              templateUrl: 'client/app/views/listePostulant.html',
              controller: 'ListePostulantController',
              inputs:{
                  postulants: postulants
              }
          }).then(function(modal){
              modal.element.modal();
              modal.close.then(function(){

              });

          });
        };

        this.disabledPostulant = function(postulant){

        };
}]);