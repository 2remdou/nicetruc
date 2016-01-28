/**
 * Created by touremamadou on 27/01/2016.
 */
app.filter('separateurMillier',function(){
    return function(input) {
        if(input)
            return input.toLocaleString();
        else
            return 0;
    };
});