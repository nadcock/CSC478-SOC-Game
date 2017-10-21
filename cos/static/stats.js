/**
 * Created by mattpolsgrove on 10/17/17.
 */

function display_score() {

    var score = 0;

    document.getElementById("score").innerHTML = "Score: " + score;

}

//Displays table of resources
function display_resources() {

    //Fetch from backend
    var brick = 0;
    var wool = 0;
    var ore = 0;
    var grain = 0;
    var lumber = 0;

    //Generates table
    var body = document.getElementById("resources");
    var resourceTable = document.createElement("table");
    resourceTable.style.width = '100%';
    resourceTable.setAttribute('border', '1');
    var resourceTableBody = document.createElement("tbody");
    for (var i = 0; i < 2; i++){
        var row = document.createElement("tr");
        for (var j = 0; j < 5; j++){
            var cell = document.createElement("td");
            var cellText = document.createTextNode("ERR");

            if (i == 0) {
                switch (j) {
                    case 0:
                        cellText = document.createTextNode("Brick");
                        break;
                    case 1:
                        cellText = document.createTextNode("Wool");
                        break;
                    case 2:
                        cellText = document.createTextNode("Ore");
                        break;
                    case 3:
                        cellText = document.createTextNode("Grain");
                        break;
                    case 4:
                        cellText = document.createTextNode("Lumber");
                        break;
                }
            }
            else {
                switch (j) {
                    case 0:
                        cellText = document.createTextNode("" + brick);
                        break;
                    case 1:
                        cellText = document.createTextNode("" + wool);
                        break;
                    case 2:
                        cellText = document.createTextNode("" + ore);
                        break;
                    case 3:
                        cellText = document.createTextNode("" + grain);
                        break;
                    case 4:
                        cellText = document.createTextNode("" + lumber);
                        break;
                }
            }
            cell.style.width = '40px';
            cell.appendChild(cellText);
            row.appendChild(cell);


        }
        resourceTableBody.appendChild(row);
    }

    resourceTable.appendChild(resourceTableBody);
    body.appendChild(resourceTable);

    resourceTable.setAttribute("border", "2");
}

//Displays table of players
function display_players() {

    //Fetch from backend
    var playerCount = 3;
    var playerName = ["davmmeyer", "mpolsgrove", "nadcock"];
    var playerColor = ["blue", "red", "orange", "white"];
    var playerRoad = ["","Yes",""];
    var playerArmy = ["","","Yes"];

    //Generates table
    var body = document.getElementById("players");
    var playerTable = document.createElement("table");
    playerTable.style.width = '100%';
    playerTable.setAttribute('border', '1');
    var playerTableBody = document.createElement("tbody");
    for (var i = 0; i < playerCount+1; i++){
        var row = document.createElement("tr");
        for (var j = 0; j < 3; j++){
            var cell = document.createElement("td");
            var cellText = document.createTextNode("ERR");

            if (i > 0) {
                switch (j) {
                    case 0:
                        cell.style.color = playerColor[i-1];
                        cellText = document.createTextNode(playerName[i-1]);
                        break;
                    case 1:
                        cellText = document.createTextNode(playerRoad[i-1]);
                        break;
                    case 2:
                        cellText = document.createTextNode(playerArmy[i-1]);
                        break;
                }
            }
            else {
                switch (j) {
                    case 0:
                        cellText = document.createTextNode("Player");
                        break;
                    case 1:
                        cellText = document.createTextNode("Longest Road");
                        break;
                    case 2:
                        cellText = document.createTextNode("Largest Army");
                        break;

                }
            }

            cell.appendChild(cellText);
            row.appendChild(cell);


        }
        playerTableBody.appendChild(row);
    }

    playerTable.appendChild(playerTableBody);
    body.appendChild(playerTable);

    playerTable.setAttribute("border", "2");
}

//Displays table of development cards
function display_devcards(){

    //Fetch from backend
    var knight_cards = 0;
    var victory_point_cards = 0;
    var monopoly_cards = 0;
    var road_building_cards = 0;
    var year_of_plenty_cards = 0;

    //Generates table
    var body = document.getElementById("devcards");
    var playerTable = document.createElement("table");
    playerTable.style.width = '100%';
    playerTable.setAttribute('border', '1');
    var playerTableBody = document.createElement("tbody");
    for (var i = 0; i < 5; i++){
        var row = document.createElement("tr");
        for (var j = 0; j < 2; j++){
            var cell = document.createElement("td");
            var cellText = document.createTextNode("ERR");

            if (j == 0) {
                switch (i) {
                    case 0:
                        cellText = document.createTextNode("Knight Cards");
                        break;
                    case 1:
                        cellText = document.createTextNode("Victory Cards");
                        break;
                    case 2:
                        cellText = document.createTextNode("Monopoly Cards");
                        break;
                    case 3:
                        cellText = document.createTextNode("Road Building Cards");
                        break;
                    case 4:
                        cellText = document.createTextNode("Year of Plenty Cards");
                        break;
                    }
                }
            else
                {
                    switch (i) {
                        case 0:
                            cellText = document.createTextNode("" + knight_cards);
                            break;
                        case 1:
                            cellText = document.createTextNode("" + victory_point_cards);
                            break;
                        case 2:
                            cellText = document.createTextNode("" + monopoly_cards);
                            break;
                        case 3:
                            cellText = document.createTextNode("" + road_building_cards);
                            break;
                        case 4:
                            cellText = document.createTextNode("" + year_of_plenty_cards);
                            break;
                    }
                }

            cell.appendChild(cellText);
            row.appendChild(cell);


        }
        playerTableBody.appendChild(row);
    }

    playerTable.appendChild(playerTableBody);
    body.appendChild(playerTable);

    playerTable.setAttribute("border", "2");
}

//Displays table of current road and army sizes
function display_road_and_army(){

    //Fetch from backend
    var army = 0;
    var road =0;

    //Generates table
    var body = document.getElementById("road_and_army");
    var playerTable = document.createElement("table");
    playerTable.style.width = '100%';
    playerTable.setAttribute('border', '1');
    var playerTableBody = document.createElement("tbody");
    for (var i = 0; i < 2; i++){
        var row = document.createElement("tr");
        for (var j = 0; j < 2; j++){
            var cell = document.createElement("td");
            var cellText = document.createTextNode("ERR");

            if (j == 0) {
                switch (i) {
                    case 0:
                        cellText = document.createTextNode("Current Army Size: ");
                        break;
                    case 1:
                        cellText = document.createTextNode("Current Road Length: ");
                        break;

                    }
                }
            else
                {
                    switch (i) {
                        case 0:
                            cellText = document.createTextNode("" + army);
                            break;
                        case 1:
                            cellText = document.createTextNode("" + road);
                            break;
                    }
                }

            cell.appendChild(cellText);
            row.appendChild(cell);


        }
        playerTableBody.appendChild(row);
    }

    playerTable.appendChild(playerTableBody);
    body.appendChild(playerTable);

    playerTable.setAttribute("border", "2");
}
