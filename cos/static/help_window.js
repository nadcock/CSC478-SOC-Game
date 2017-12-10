/**
 * Opens links to user manual
 */
$(document).on("click", "#helpButton", function(e){
    e.preventDefault();

    window.open('/help');
});