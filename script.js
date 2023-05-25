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
let first_nr;

// This variable is for saving the input values in an array.
// We can then use those values as input to the operator_function.
let display_array;

// This function is for displaying the current button, push the values to the display_array,
// assigned the right value to the math_operator, second_nr, and the first_nr variables.
btns.forEach((el) => {
  el.addEventListener("click", function () {
    // This makes sure that the user can't go outside of the calculators display
    // with the numbers and operators.
    if (display_text.textContent.length <= 14) {
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
      // If the amount of numbers is at 15, then the user should only be able
      // to press all the buttons with no number.
    } else if (
      el.hasAttribute("data-operator") &&
      display_text.textContent.length === 15
    ) {
      math_operator = el.textContent;

      display_text.textContent += el.textContent;

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
      // This makes sure the that user can't go outside of the calculators display after pressing one of the operators button.
    } else if (
      display_text.textContent.length >= 16 &&
      display_text.textContent.length <= 17
    ) {
      display_text.textContent += el.textContent;

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
    }
  });
});

// The clear function
clear_btn.addEventListener("click", function () {
  while (display_array.length > 0) {
    display_array.pop();
  }
  display_text.textContent = "0";
  first_nr = undefined;
});

// The delete function
delete_btn.addEventListener("click", function () {
  const display_string_array = display_text.textContent.split("");
  display_string_array.pop();
  display_string_array.join();
  display_text.textContent = display_string_array;
  if (display_text.textContent === "") {
    display_text.textContent = "0";
  }
});
