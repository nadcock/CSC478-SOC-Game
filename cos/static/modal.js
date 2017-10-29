// Created by David Meyer

window.onload = function() {

// Get the new game modal
    var modal = document.getElementById('newGame');

// Get the button that opens the new game modal
    var btn = document.getElementById("newGameBtn");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
/*
    $('newGame').on('show', function () {
        $(this).find('.modal-content').css({
            width:'300px',
            height:'300px',
            'max-height':'100%'
        });
    });*/
};

function dismiss_modal() {

}