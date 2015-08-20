/**
 * Created by mdoutoure on 20/08/2015.
 */
app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
   $stateProvider
       .state('main',{
           url:'/',
           templateUrl: 'client/app/views/main.html'
       });
});