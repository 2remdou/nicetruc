/**
 * Created by touremamadou on 23/08/2015.
 */
app.directive('equalsTo',function(){
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function(scope,elem,attrs, control){
            control.$validators.equalsTo = function(modelValue,viewValue){
                var v1=viewValue;
                var v2=scope.$eval(attrs.equalsTo).$viewValue;
                return v1==v2;
            };
        }
    };

});