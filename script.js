"use strict";
//  DOM selections
const display_text = document.querySelector(".display-txt");
const clear_btn = document.querySelector(".clear-btn");
const delete_btn = document.querySelector(".delete-btn");
const btns = document.querySelectorAll(".btns");

// This function calculates the values and return the result
const operator_function = function (expression) {
  const operators = ["x", "÷", "+", "-"];

  // Remove any spaces from the expression
  const cleanedExpression = expression.replace(/\s/g, "");
  // Replace comma with dot for decimal values
  const decimalExpression = cleanedExpression.replace(/,/g, ".");
  // Split the expression into separate values and operators
  const values = decimalExpression.split(/([+x÷-])/);
  let result = Number(values[0]);
  let current_operator = values[1];
  for (let i = 1; i < values.length; i += 2) {
    const element = values[i];
    const next_value = Number(values[i + 1]);

    if (!operators.includes(element) || isNaN(next_value)) {
      return "Invalid input";
    }
    current_operator = element;

    switch (current_operator) {
      case operators[0]:
        result *= next_value;
        break;
      case operators[1]:
        result /= next_value;
        break;
      case operators[2]:
        result += next_value;
        break;
      case operators[3]:
        result -= next_value;
        break;
    }
  }

  return result;
};

// These variables are for saving the first value, the match-operator and the second value.
let math_operator;
let first_nr;

// This variable is for saving the input values in an array.
// We can then use those values as input to the operator_function.
let display_array;

// This is for making sure that the user can't type more then one "."
let floating_point = true;
let function_called = false;

// This function is for displaying the current button, push the values to the display_array,
// assigned the right value to the math_operator, second_nr, and the first_nr variables.
display_text.textContent = "0";
btns.forEach((el) => {
  el.addEventListener("click", function () {
    // This is for making sure that the user can't type more then one "."
    if (el.id === "pointBtn") {
      if (!floating_point || function_called) return;
      floating_point = false;
    }
    // This checks if the user has a correct input to the calculator so that the calculator
    // can make a correct mathematical calculation.
    if (
      (display_text.textContent === "0" && el.hasAttribute("data-operator")) ||
      (el.id === "equalsbtn" && display_text.textContent === "0")
    ) {
      return (display_text.textContent = "0");
    }
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

      if (el.hasAttribute("data-operator") && display_text.textContent != "0") {
        math_operator = el.textContent;
        // This is for making sure that the user can't type more then one "."
        floating_point = true;
      }

      if (display_text.textContent === "0" && el.textContent != ".") {
        display_text.textContent = first_nr;
      } else {
        display_text.textContent += el.textContent;
      }

      if (el.id != "equalsbtn") {
        display_array = display_text.textContent;
      }

      if (el.id === "equalsbtn") {
        display_text.textContent = operator_function(display_array);
        function_called = true;
      } else {
        function_called = false;
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
        display_array = display_text.textContent;
      }

      if (el.id === "equalsbtn") {
        display_text.textContent = operator_function(display_array);
        function_called = true;
      } else {
        function_called = false;
      }

      // This makes sure the that user can't go outside of the calculators display after pressing one of the operators button.
    } else if (
      display_text.textContent.length >= 16 &&
      display_text.textContent.length <= 17
    ) {
      display_text.textContent += el.textContent;

      if (el.id != "equalsbtn") {
        display_array = display_text.textContent;
      }

      if (el.id === "equalsbtn") {
        display_text.textContent = operator_function(display_array);
        function_called = true;
      } else {
        function_called = false;
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
  floating_point = true;
});

// The delete function
delete_btn.addEventListener("click", function () {
  const display_text_array = display_text.textContent.split("");
  if (display_text_array.length > 0) {
    display_text_array.pop();
  }

  if (display_text_array.length === 0) {
    display_text.textContent = "0";
  } else {
    display_text.textContent = display_text_array.join("");
  }
});
