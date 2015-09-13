/**
 * Created by mdoutoure on 20/08/2015.
 */
app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
   $stateProvider
       .state('ville',{
           url:'/ville',
           templateUrl: '/client/app/views/ville.html',
           controller: 'VilleController'
       })
   ;
});