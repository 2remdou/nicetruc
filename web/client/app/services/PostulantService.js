/**
 * Created by touremamadou on 12/09/2015.
 */

app.service('PostulantService',
    ['$rootScope','Restangular','ModalService','$state',
    function($rootScope,Restangular,ModalService,$state){
        var that = this;

        var _postulantService = Restangular.all('postulants');

        this.add = function(postulant){
            _postulantService.post(postulant).then(function(response){
                $rootScope.$broadcast('added.postulant',{message:''});
            },function(error){
                $rootScope.$broadcast('show.error',{message:error.data  });
            });
        };

        this.manifesterInteret = function(voiture){
            if($rootScope.isAuthenticated()){
                if(!isDefined($rootScope.user.telephone)){
                    ModalService.showModal({
                        templateUrl: 'client/app/views/modalMessage.html',
                        controller: 'ModalMessageController',
                        inputs:{
                            texte : 'Renseignez le Telephone dans votre profile, pour manifester votre intérêt',
                            title: 'Renseignez le telephone'
                        }
                    }).then(function(modal){
                        modal.element.modal();
                        modal.close.then(function(result){
                            if(result){
                                $state.go('profil');
                            }
                        })
                    })
                }
                else{
                    var postulant = {
                        nomPostulant:$rootScope.user.nomUser+' '+ $rootScope.user.prenomUser,
                        telephone : $rootScope.user.telephone,
                        idVoiture:voiture.id
                    }
                    that.add(postulant);
                }

            }
            else{
                ModalService.showModal({
                    templateUrl: 'client/app/views/manifesterInteret.html',
                    controller: 'ManifesterInteretController'
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
                })

            }

        };
}]);