/**
 * Created by David Meyer 10/29/2017
 */


/**
 * This function renders two dice on the game board
 *
 * The render will appear as two separate elements initialized to '0'
 *  --------------
 * |      |       |
 * |  5   |   3   |
 * |      |       |
 *  --------------
 *   <Roll Dice>
 */
function display_dice() {

    // Generate dice structure
    var body = document.getElementById("gamedice");



    var diceTable = document.createElement("table");
    var row = document.createElement("tr");

    // Create first dice cell
    var cell1 = document.createElement("td");
    var cell1div = document.createElement("div");
    var cellh3 = document.createElement("h3");
    var span1 = document.createElement("span");
    var cellh3Text1 = document.createTextNode("0");
    var cellspanText1 = document.createTextNode("dice one");



/*    // Append first cell
    cell1.appendChild(cellText1);
    row.appendChild(cell1);

    // Create second dice cell
    var cell2 = document.createElement("td");
    var cellText2 = document.createTextNode("0");

    // Append second cell
    cell2.appendChild(cellText2);
    row.appendChild(cell2);

    diceTableBody.appendChild(row);
    diceTable.appendChild(diceTableBody);
    body.appendChild(diceTable);

    // Styling
    diceTable.setAttribute("border", "2");*/
}


/**
 * Landing Page modal: this function checks if start game modal form has a game name. If it has,
 * then the game name is submitted and a new game is started:
 * 1) Game name
  */
$(document).on("click", "#rollDiceBtn", function(e){

    console.log("Roll dice clicked");

    var gameID = document.getElementById("game_id").innerText;
    var playerID = document.getElementById("player_id").innerText;


    // Set the dice on the screen to the random values returned from the backend.
    roll_dice(gameID, playerID, function(roll){

        document.getElementById("dice1").innerText = roll.dice_one;
        document.getElementById("dice2").innerText = roll.dice_two;
    });
});