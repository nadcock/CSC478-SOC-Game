/**
 * Created by Matthew Polsgrove 11/13/2017
 */

var settlement_animation;

/**
 * Called when backend confirms it is player's turn
 */
function start_turn() {
    hideTradeUI();
    document.getElementById("is_turn").innerHTML = "true";
    render_board();
    get_player_info(function(data) {});
    get_turn_options(function (data) {
        if(data.success == "True"){
            enableTurnControls(data.turn_options);
            showTurnControlsButtons();
            showTurnControls();
        }

    });
}


/**
 * Displays snackbar message at bottom of screen
 * @param message
 */
function displaySnackbar(message) {
    var snackbar = document.getElementById("snackbar");
    snackbar.innerText = message;

    snackbar.className = "showsnack";

    setTimeout(function(){
        snackbar.className = snackbar.className.replace("showsnack", "");
        snackbar.innerText = "";
    }, 5000);

}

/**
 * Called when player chooses to end turn
 */
function end_turn() {
    document.getElementById("is_turn").innerHTML = "false";
    hideTurnControls();
    wait_for_turn(start_turn);
}

/**
 * Called to show turn controls (including buttons, and dice)
 */
function showTurnControls() {
    document.getElementById("turnControls").style.display = "block";
}

/**
 * Called to hide turn controls (including buttons, and dice)
 */
function hideTurnControls() {
    document.getElementById("turnControls").style.display = "none";
}

/**
 * Called to show turn controls for the turn buttons
 */
function showTurnControlsButtons() {
    document.getElementById("turn_option_buttons").style.display = "block";
}

/**
 * Called to hide turn controls for the turn buttons
 */
function hideTurnControlsButtons() {
    document.getElementById("turn_option_buttons").style.display = "none";
}

/**
 * Called to show the UI controls for trading
 */
function showTradeUI() {
    document.getElementById("trade_ui_div").style.display = "block";
}

/**
 * Called to hide the UI controls for trading (also resets drop down)
 */
function hideTradeUI() {
    document.getElementById("trade_ui_div").style.display = "none";
    var trade_for_resource_sel = document.getElementById("trade_for_resource_sel");
    trade_for_resource_sel.innerHTML = "";
}

/**
 * Called to show turn controls for the turn instructions
 */
function showTurnControlsInstructionsWithMessage(message) {
    var instruction_div = document.getElementById("turn_option_instructions");
    instruction_div.innerHTML = "<p align='left' style=\"padding: 10px\">" + message + "</p>";
    instruction_div.style.display = "block";
}

/**
 * Called to hide turn controls for the turn instructions
 */
function hideTurnControlsInstructions() {
    var instruction_div = document.getElementById("turn_option_instructions");
    instruction_div.innerHTML = "";
    instruction_div.style.display = "block";
}

/**
 * Sets the turn buttons to enabled or disabled based on what turn options
 * were received from the backend
 * @param turn_options
 */
function enableTurnControls(turn_options) {
    var roll_dice_button = document.getElementById("roll_dice");
    var settlement_button = document.getElementById("buy_settlement");
    var trade_button = document.getElementById("trade_resource");
    var end_turn_button = document.getElementById("end_turn");

    roll_dice_button.disabled = true;
    settlement_button.disabled = true;
    trade_button.disabled = true;
    end_turn_button.disabled = true;

    for (var i = 0; i < turn_options.length; i++) {
        switch(turn_options[i]) {
            case "roll_dice":
                roll_dice_button.disabled = false;
                break;
            case "buy_settlement":
                settlement_button.disabled = false;
                break;
            case "trade_resource":
                trade_button.disabled = false;
                break;
            case "end_turn":
                end_turn_button.disabled = false;
                break;
        }
    }
}

/**
 * Adds the turn buttons to the turn controls div
 */
function addTurnOptionButtons() {
    var turn_option_buttons = document.createElement("DIV");
    turn_option_buttons.id = "turn_option_buttons";

    var turn_option_instructions = document.createElement("DIV");
    turn_option_instructions.id = "turn_option_instructions";

    var roll_dice_div = document.createElement("DIV");
    roll_dice_div.id = "roll_dice_div";
    roll_dice_div.setAttribute("align", "center");
    roll_dice_div.setAttribute("style", "padding: 10px");
    var roll_dice_button = document.createElement("BUTTON");
    roll_dice_button.id = "roll_dice";
    roll_dice_button.classList.add("btn");
    roll_dice_button.classList.add("btn-block");
    roll_dice_button.classList.add("btn-turn-options");

    var roll_dice_text = document.createTextNode("Roll Dice");
    roll_dice_button.appendChild(roll_dice_text);
    roll_dice_div.appendChild(roll_dice_button);

    var settlement_div = document.createElement("DIV");
    settlement_div.id = "settlement_div";
    settlement_div.setAttribute("align", "center");
    settlement_div.setAttribute("style", "padding: 10px");
    var settlement_button = document.createElement("BUTTON");
    settlement_button.id = "buy_settlement";
    settlement_button.classList.add("btn");
    settlement_button.classList.add("btn-block");
    settlement_button.classList.add("btn-turn-options");

    var settlement_text = document.createTextNode("Buy Settlement");
    settlement_button.appendChild(settlement_text);
    settlement_div.appendChild(settlement_button);

    var trade_div = document.createElement("DIV");
    trade_div.id = "trade_div";
    trade_div.setAttribute("align", "center");
    trade_div.setAttribute("style", "padding: 10px");
    var trade_button = document.createElement("BUTTON");
    trade_button.id = "trade_resource";
    trade_button.classList.add("btn");
    trade_button.classList.add("btn-block");
    trade_button.classList.add("btn-turn-options");

    var trade_text = document.createTextNode("Trade Resource");
    trade_button.appendChild(trade_text);
    trade_div.appendChild(trade_button);

    var end_turn_div = document.createElement("DIV");
    end_turn_div.id = "end_turn_div";
    end_turn_div.setAttribute("align", "center");
    end_turn_div.setAttribute("style", "padding: 10px");
    var end_turn_button = document.createElement("BUTTON");
    end_turn_button.id = "end_turn";
    end_turn_button.classList.add("btn");
    end_turn_button.classList.add("btn-block");
    end_turn_button.classList.add("btn-turn-options");

    var end_turn_text = document.createTextNode("End Turn");
    end_turn_button.appendChild(end_turn_text);
    end_turn_div.appendChild(end_turn_button);

    turn_option_buttons.appendChild(roll_dice_div);
    turn_option_buttons.appendChild(settlement_div);
    turn_option_buttons.appendChild(trade_div);
    turn_option_buttons.appendChild(end_turn_div);

    var turn_controls = document.getElementById("turnControls");
    turn_controls.appendChild(turn_option_buttons);
    turn_controls.appendChild(turn_option_instructions);
}

/**
 * Adds the UI controls for trading resources. It is initially hidden.
 */
function add_trade_ui() {
    var trade_div = document.createElement("DIV");
    trade_div.style.display = "none";
    trade_div.id = "trade_ui_div";
    trade_div.setAttribute("align", "center");
    trade_div.setAttribute("style", "padding: 10px");
    var trade_innerHTML = "<form id='trade-form' action=''>" +
                           "<div class='form-group'>" +
                                "<label for='trade_for_resource_sel'>Trade 4 resources:</label>" +
                                "<select class='form-control' id='trade_for_resource_sel'></select>" +
                           "</div>" +
                           "<div class='form-group'>" +
                                "<label for='requested_resource_sel'>For 1 resources:</label>" +
                                "<select class='form-control' id='requested_resource_sel'>" +
                                    "<option value='brick'>Brick</option>" +
                                    "<option value='wool'>Wool</option>" +
                                    "<option value='ore'>Ore</option>" +
                                    "<option value='lumber'>Lumber</option>" +
                                    "<option value='grain'>Grain</option>" +
                                "</select><br/>" +
                           "<button type='button' id='trade_submit_btn' class='btn btn-turn-options'>Perform Trade</button>" +
                           "</div>" +
                      "</form>";

    trade_div.innerHTML = trade_innerHTML;
    var turn_controls = document.getElementById("turnControls");
    turn_controls.appendChild(trade_div);
}


/**
 * Event handler for clicking end turn button
 */
$(document).on("click", "#end_turn", function(e){
    if (document.getElementById("is_turn").innerHTML == "true") {
        complete_turn(end_turn);
    }
});

/**
 * Event handler for clicking trade resource button
 */
$(document).on("click", "#trade_resource", function(e){
    if (document.getElementById("is_turn").innerHTML == "true") {
        hideTurnControlsButtons();
        cbFunc = function (data) {
           var tradable_resources = data.tradable_resources;
           var trade_for_resource_sel = document.getElementById("trade_for_resource_sel");
           tradable_resources.forEach( function (resource) {
               var resource_option = document.createElement('option');
               resource_option.value = resource;
               resource_option.innerHTML = resource.charAt(0).toUpperCase() + resource.slice(1);
               trade_for_resource_sel.appendChild(resource_option);
           });
           showTradeUI();
        };
        get_tradable_resources(cbFunc);
    }
});

/**
 * Event handler for clicking perform trade button
 */
$(document).on("click", "#trade_submit_btn", function(e){
    if (document.getElementById("is_turn").innerHTML == "true") {
        cbFunc = function (data) {
           update_player_resources_table(data);
           hideTradeUI();
           start_turn();
        };
        var to_trade_select = document.getElementById("trade_for_resource_sel");
        var to_trade = to_trade_select.options[to_trade_select.selectedIndex].value;
        var for_trade_select = document.getElementById("requested_resource_sel");
        var for_trade = for_trade_select.options[for_trade_select.selectedIndex].value;
        perform_trade(to_trade, for_trade, cbFunc);
    }
});

/**
 * Event handler for clicking roll dice button
 */
$(document).on("click", "#roll_dice", function(e){
    if (document.getElementById("is_turn").innerHTML == "true") {
        hideTurnControlsButtons();
        showDice();
    }
});

/**
 * Event handler for clicking buy settlement button
 */
$(document).on("click", "#buy_settlement", function(e){
    if (document.getElementById("is_turn").innerHTML == "true") {
        hideTurnControlsButtons();
        showTurnControlsInstructionsWithMessage("Choose a settlement to purchase on the left." +
            "<div align='center'>" +
            "<div class='card' align='center' style='width: 200px'>" +
            "<div class='card-header'>Cost of Settlement</div>" +
            "<div class='card-block'><ul align='center' style='list-style-type: none; padding: 0; margin: 0;'>" +
            "<li>1 Brick</li>" +
            "<li>1 Wool</li>" +
            "<li>1 Grain</li>" +
            "<li>1 Lumber</li>" +
            "</ul></div></div></div>");
        document.getElementById("turn_option_instructions")
        var settlements = stage.find('.settlement_area');
        settlement_animation = new Konva.Animation(function (frame) {
            settlements.each(function (settlement) {
                var scale = (1/5) * (Math.sin(frame.time * 2 * Math.PI / 1500) + 6);
                settlement.scale({x: scale, y: scale});
                settlement.fill('red');
                settlement.on('mouseup', function() {
                    console.log("settlement id: " + settlement.ID);
                    if (settlement.getFill() == 'red') {
                        initiate_place_settlement(this.x(),this.y(), this.ID);
                    }
                    end_settlement_animation();
                    hideTurnControlsInstructions();
                    start_turn();
                });
            });

        }, settlement_layer);
        settlement_animation.start();
    }
});

/**
 * Turns off pulsating animation for settlements
 */
function end_settlement_animation() {
    settlement_animation.stop();
    var settlements = stage.find('.settlement_area');
    settlements.each(function(settlement) {
        settlement.scale({x: 1, y: 1});
        settlement.fill('grey');
        settlement.off('mouseup');
    });
    settlement_layer.batchDraw()
}
