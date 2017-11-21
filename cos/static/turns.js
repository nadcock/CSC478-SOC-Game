/**
 * Created by Matthew Polsgrove 11/13/2017
 */

//Called when backend confirms it is player's turn
function start_turn() {
    document.getElementById("is_turn").innerHTML = "true";
}

//Called when player chooses to end turn
function end_turn() {
    document.getElementById("is_turn").innerHTML = "false";
    wait_for_turn(start_turn);
}

//End turn button functionality
$(document).on("click", "#endTurnBtn", function(e){

    if (document.getElementById("is_turn").innerHTML == "true") {
        complete_turn(end_turn);
    }
});