'use strict';

window.addEventListener('load', function () {
    submitMarks();
});

function submitMarks() {
    var marks = document.getElementsByClassName('mark');
    var submit_button = document.getElementsByClassName('submit')[0];
    for (let i = 0; i < marks.length; ++i) {
        marks[i].addEventListener('mouseout', function () {
            if (checkMark(marks).length != 0) {
                errorFind([1]);
            }
        });
    }
}

function errorFind(errors) {
    for (let i = 0; i < errors.length; ++i) {
        errors[i].classList.add('error');
    }
}

function checkMark(marks) {
    var ans = [];
    for (let i = 0; i < marks.length; ++i) {
        var text = marks[i].value;

        if (typeof (text) != 'Number' || text.toLowerCase() != 'н' || text != '') {
            ans.push(marks[i]);
        }
    }
    return ans;
}
