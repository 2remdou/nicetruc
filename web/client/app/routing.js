/**
 * Created by mdoutoure on 20/08/2015.
 */
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    //$urlRouterProvider.otherwise("/");
    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('nicetruc');
    });
    var nav = {templateUrl: 'client/app/views/nav.html',controller: 'NavController'};
    var advancedSearch = {templateUrl: 'client/app/views/advancedSearch.html',controller: 'AdvancedSearchController'};
   $stateProvider
       .state('nicetruc',{
           url:'/',
           views:{
               'nav':nav,
               'content':{
                   templateUrl: 'client/app/views/main.html',
                   controller: 'MainController'
               },
               'advancedSearch':advancedSearch
           }
       })
       .state('main',{
           url: 'main',
           views:{
               'content':{
                   templateUrl: 'client/app/views/main.html',
                   controller: 'MainController'
               }
           }
       })
       .state('login',{
           url: '/login',
           views:{
            'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
             'body':{
                 templateUrl: 'client/app/views/login.html',
                 controller: 'LoginController'
             }
           }
       })
       .state('resetSendMail',{
           url: '/resetSendMail',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/resetSendMail.html',
                   controller: 'ResetSendMailController'
               }
           }
       })
       .state('resetCheckToken',{
           url: '/resetCheckToken/:token',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/resetCheckToken.html',
                   controller: 'ResetCheckTokenController'
               }
           }
       })
       .state('resetting',{
           url: '/resetting/:token',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/resetting.html',
                   controller: 'ResettingController'
               }
           }
       })
       .state('inscription',{
           url: '/inscription',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/inscription.html',
                   controller: 'InscriptionController',
               }

           }
       })
       .state('enableEmail',{
           url: '/enableEmail/:token',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/enableEmail.html',
                   controller: 'EnableEmailController'
               }
           }
       })
       .state('profil',{
           url: '/profil',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/profile.html',
                   controller: 'ProfilController'
               }
           }
       })
       .state('villes',{
           url:'/villes',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/ville.html',
                   controller: 'VilleController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
               }
           }
       })
       .state('quartiers',{
           url:'/quartiers',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/quartier.html',
                   controller: 'QuartierController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
               }
           }
       })
       .state('categories',{
           url:'/categories',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/categorie.html',
                   controller: 'CategorieController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
               }
           }
       })
       .state('carburants',{
           url:'/carburants',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/carburant.html',
                   controller: 'CarburantController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
               }
           }
       })
       .state('boitiers',{
           url:'/boitiers',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/boitier.html',
                   controller: 'BoitierController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
               }
           }
       })
       .state('marques',{
           url:'/marques',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/marque.html',
                   controller: 'MarqueController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
               }
           }
       })
       .state('modeles',{
           url:'/modeles',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/modele.html',
                   controller: 'ModeleMarqueController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_ADMIN']
               }
           }
       })
       .state('annonces',{
           url:'/annonces',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/annonceVoiture.html',
                   controller: 'AnnonceVoitureController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_API','ROLE_ADMIN']
               }
           }
       })
       .state('imageAnnonceVoiture',{
           url:'/imageAnnonce/:voitureId',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/imageAnnonceVoiture.html',
                   controller: 'ImageAnnonceVoitureController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_API','ROLE_ADMIN']
               }
           }
       })
       .state('voitures',{
           url:'/voitures',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/searchVoiture.html',
                   controller: 'SearchVoitureController'
               }
           }
       })
       .state('showVoiture',{
           url:'/showVoiture/:voitureId',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/showVoiture.html',
                   controller: 'ShowVoitureController'
               }
           }
       })
       .state('editVoiture',{
           url:'/editVoiture/:voitureId',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'body':{
                   templateUrl: 'client/app/views/editVoiture.html',
                   controller: 'EditVoitureController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_API','ROLE_ADMIN']
               }
           }
       })
       .state('voitureByUser',{
           url:'/listVoiture',
           views:{
                'nav':{
                   templateUrl: 'client/app/views/nav.html',
                   controller: 'NavController'
               },
               'content':{
                   templateUrl: 'client/app/views/voitureByUser.html',
                   controller: 'VoitureByUserController'
               },
               'advancedSearch':{
                   templateUrl: 'client/app/views/advancedSearch.html',
                   controller: 'AdvancedSearchController'
               }
           },
           data: {
               permissions: {
                   only: ['ROLE_API','ROLE_ADMIN']
               }
           }
         })
       .state('voituresEnVedette',{
             url:'/voituresEnVedette',
             views:{
                 'nav':nav,
                 'content':{
                     templateUrl: 'client/app/views/voituresEnVedette.html',
                     controller: 'VoituresEnVedetteController'
                 },
                 'advancedSearch':advancedSearch
             },
              data: {
                  permissions: {
                      only: ['ROLE_ADMIN']
                  }
              }
       })

}]);