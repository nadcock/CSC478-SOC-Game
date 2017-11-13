/**
 * Created by Matthew Polsgrove 11/13/2017
 */

//Called when backend confirms it is player's turn
function start_turn() {
    document.getElementById("is_turn").innerHTML = "false";
}

//Called when player chooses to end turn
function end_turn() {
    document.getElementById("is_turn").innerHTML = "true";
    wait_for_turn(start_turn());
}

$(document).on("click", "#endTurnBtn", function(e){

    console.log("End Turn clicked");

    complete_turn(end_turn);

});