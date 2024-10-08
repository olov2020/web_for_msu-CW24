"use strict";

window.addEventListener('load', function () {
    showHiddenMenu();
});

function showHiddenMenu() {
    var hidden_menu = document.querySelector(".hidden_menu");

    var hidden_menu_courses = document.querySelector(".hidden_menu_courses");

    hidden_menu_courses.addEventListener("mouseover", function () {
        hidden_menu_courses.style.visibility = "visible";
        hidden_menu.style.display = "flex";
    });

    hidden_menu_courses.addEventListener("mouseout", function () {
        hidden_menu_courses.style.visibility = "hidden";
        hidden_menu.style.display = "none";
    });

    var hidden_menu_events = document.querySelector(".hidden_menu_events");

    hidden_menu_events.addEventListener("mouseover", function () {
        hidden_menu_events.style.visibility = "visible";
        hidden_menu.style.display = "flex";
    });

    hidden_menu_events.addEventListener("mouseout", function () {
        hidden_menu_events.style.visibility = "hidden";
        hidden_menu.style.display = "none";
    });

    var hidden_menu_community = document.querySelector(".hidden_menu_community");

    hidden_menu_community.addEventListener("mouseover", function () {
        hidden_menu_community.style.visibility = "visible";
        hidden_menu.style.display = "flex";
    });

    hidden_menu_community.addEventListener("mouseout", function () {
        hidden_menu_community.style.visibility = "hidden";
        hidden_menu.style.display = "none";
    });


    var menu_courses = document.querySelector(".courses");

    menu_courses.addEventListener("mouseover", function () {
        hidden_menu_courses.style.visibility = "visible";
        hidden_menu.style.display = "flex";
    });

    menu_courses.addEventListener("mouseout", function () {
        hidden_menu_courses.style.visibility = "hidden";
        hidden_menu.style.display = "none";
    });

    var menu_events = document.querySelector(".events");

    menu_events.addEventListener("mouseover", function () {
        hidden_menu_events.style.visibility = "visible";
        hidden_menu.style.display = "flex";
    });

    menu_events.addEventListener("mouseout", function () {
        hidden_menu_events.style.visibility = "hidden";
        hidden_menu.style.display = "none";
    });

    var menu_community = document.querySelector(".community");

    menu_community.addEventListener("mouseover", function () {
        hidden_menu_community.style.visibility = "visible";
        hidden_menu.style.display = "flex";
    });

    menu_community.addEventListener("mouseout", function () {
        hidden_menu_community.style.visibility = "hidden";
        hidden_menu.style.display = "none";
    });
}
