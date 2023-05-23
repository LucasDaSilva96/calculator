"use strict";
//  DOM selections
const display_text = document.querySelector(".display-txt");
const clear_btn = document.querySelector(".clear-btn");
const delete_btn = document.querySelector(".delete-btn");
const btns = document.querySelectorAll(".btns");

const operator_function = function (value1, operator, value2) {
  Number(value1);
  Number(value2);
  switch (operator) {
    case "*":
      return value1 * value2;
    case "+":
      return value1 + value2;
    case "-":
      return value1 - value2;
    case "÷":
      return value1 / value2;
    default:
      return "Something went wrong";
  }
};

let math_operator;
let second_nr;
let first_nr;
let controller = 1;
btns.forEach((el) => {
  el.addEventListener("click", function () {
    if (el.hasAttribute("data-number") && controller === 1) {
      if (typeof first_nr === "undefined") {
        first_nr = el.textContent;
      } else {
        first_nr += el.textContent;
      }
    }

    if (el.hasAttribute("data-operator")) {
      controller === 1 ? (controller = 2) : (controller = 1);
      math_operator = el.textContent;
    }
    if (controller === 2) {
      if (typeof second_nr === "undefined") {
        second_nr = el.textContent;
      } else {
        second_nr += el.textContent;
      }
    }

    if (display_text.textContent === "0") {
      display_text.textContent = first_nr;
    } else {
      display_text.textContent += el.textContent;
    }
  });
});
