/**
 * Opens links to user manual
 */
$(document).on("click", "#helpButton", function(e){
    e.preventDefault();

    console.log("help button clicked")

    window.open('/help');
});