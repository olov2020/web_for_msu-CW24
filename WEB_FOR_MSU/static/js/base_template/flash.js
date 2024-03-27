'use strict';

window.addEventListener('load', function () {
    hideFlashMessages();
});

function hideFlashMessages() {
    var inputs = document.querySelectorAll('input[type=email], input[type=text], input[type=password], input[type=phone]');
    var flash_message = document.getElementsByClassName('flash_message');

    for (var i = 0; i < inputs.length; ++i) {
        inputs[i].addEventListener('click', function () {
            flash_message[0].style.visibility = 'hidden';
            flash_message[0].style.display = 'none';
        });
    }
}
