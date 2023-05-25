"use strict";
//  DOM selections
const display_text = document.querySelector(".display-txt");
const clear_btn = document.querySelector(".clear-btn");
const delete_btn = document.querySelector(".delete-btn");
const btns = document.querySelectorAll(".btns");

// This function calculates the values and return the result
const operator_function = function (value1, operator, value2) {
  const first_value = Number(value1);
  const second_value = Number(value2);

  switch (operator) {
    case "x":
      return first_value * second_value;
    case "+":
      return first_value + second_value;
    case "-":
      return first_value - second_value;
    case "÷":
      return first_value / second_value;
    default:
      return "Something went wrong";
  }
};

// These variables are for saving the first value, the match-operator and the second value.
let math_operator;
let second_nr;
let first_nr;

// This variable is for saving the input values in an array.
// We can then use those values as input to the operator_function.
let display_array;

// This function is for displaying the current button, push the values to the display_array,
// assigned the right value to the math_operator, second_nr, and the first_nr variables.
btns.forEach((el) => {
  el.addEventListener("click", function () {
    if (el.hasAttribute("data-number")) {
      if (typeof first_nr === "undefined") {
        first_nr = el.textContent;
      } else {
        first_nr += el.textContent;
      }
    }

    if (el.hasAttribute("data-operator")) {
      math_operator = el.textContent;
    }

    if (display_text.textContent === "0" && el.textContent != ".") {
      display_text.textContent = first_nr;
    } else {
      display_text.textContent += el.textContent;
    }

    if (el.id != "equalsbtn") {
      display_array = display_text.textContent.split(math_operator);
    }

    if (el.id === "equalsbtn") {
      display_text.textContent = operator_function(
        display_array[0],
        math_operator,
        display_array[1]
      );
    }
  });
});

// The clear function
clear_btn.addEventListener("click", function () {
  display_array = [];
  first_nr = 0;
  display_text.textContent = 0;
});

// console.log(operator_function(17.5, "+", 0.5));
