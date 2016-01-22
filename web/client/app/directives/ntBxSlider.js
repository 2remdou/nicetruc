/**
 * Created by mdoutoure on 30/10/2015.
 */

app.directive('ntBxSlider',['$timeout','$rootScope',function($timeout,$rootScope){
   return {
       restrict: 'A',
       replace: true,
       scope: {
         voitures: '='
       },
       transclude: true,
       templateUrl: 'client/app/views/bxSlider.html',
       link : function(scope,element,attributes){

       			$rootScope.$on('parameters.completed.load',function(event,data){
		            element.ready(function() {

	            	$timeout(function() {
						scope.$apply(function() {
		                	scope.voitures = $rootScope.voituresEnVedette;
		                	log(scope.voitures);
		            	}); 
					});

					element.bxSlider({
			              auto: true,
				          pause: 3000,
				          pager: false
	          		});   
		        });
	            
		             

		            
            });
       }
   }
}]);