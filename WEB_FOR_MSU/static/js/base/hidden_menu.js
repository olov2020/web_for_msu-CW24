"use strict";

var courses = document.querySelector(".courses");
var hidden_menu_courses = document.querySelector(".hidden_menu_courses");

courses.addEventListener("mouseover", function () {
        hidden_menu_courses.style.visibility = "visible";
        courses.classList.add("header_button_mouseon");
    }

);

hidden_menu_courses.addEventListener("mouseover", function () {
    hidden_menu_courses.style.visibility = "visible";
    courses.classList.add("header_button_mouseon");
});

courses.addEventListener("mouseout", function () {
        hidden_menu_courses.style.visibility = "hidden";
        courses.classList.remove("header_button_mouseon");
    }

);

hidden_menu_courses.addEventListener("mouseout", function () {
    hidden_menu_courses.style.visibility = "hidden";
    courses.classList.remove("header_button_mouseon");
});



var events = document.querySelector(".events");
var hidden_menu_events = document.querySelector(".hidden_menu_events");

events.addEventListener("mouseover", function () {
        hidden_menu_events.style.visibility = "visible";
        events.classList.add("header_button_mouseon");
    }

);

hidden_menu_events.addEventListener("mouseover", function () {
    hidden_menu_events.style.visibility = "visible";
    events.classList.add("header_button_mouseon");
});

events.addEventListener("mouseout", function () {
        hidden_menu_events.style.visibility = "hidden";
        events.classList.remove("header_button_mouseon");
    }

);

hidden_menu_events.addEventListener("mouseout", function () {
    hidden_menu_events.style.visibility = "hidden";
    events.classList.remove("header_button_mouseon");
});





var community = document.querySelector(".community");
var hidden_menu_community = document.querySelector(".hidden_menu_community");

community.addEventListener("mouseover", function () {
        hidden_menu_community.style.visibility = "visible";
        community.classList.add("header_button_mouseon");
    }

);

hidden_menu_community.addEventListener("mouseover", function () {
    hidden_menu_community.style.visibility = "visible";
    community.classList.add("header_button_mouseon");
});

community.addEventListener("mouseout", function () {
        hidden_menu_community.style.visibility = "hidden";
        community.classList.remove("header_button_mouseon");
    }

);

hidden_menu_community.addEventListener("mouseout", function () {
    hidden_menu_community.style.visibility = "hidden";
    community.classList.remove("header_button_mouseon");
});
