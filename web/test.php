<?php
if (function_exists('apcu_clear_cache')) {
    echo "exist";
    /*// clear system cache
    apcu_clear_cache();
    // clear user cache
    apcu_clear_cache('user');*/
}
else{
    echo "!exist";
}
/*if (function_exists('apc_clear_cache')) {
    // clear system cache
    apc_clear_cache();
    // clear user cache
    apc_clear_cache('user');
    // clear opcode cache (on old apc versions)
    apc_clear_cache('opcode');
}*/
?>
