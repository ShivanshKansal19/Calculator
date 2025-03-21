document.addEventListener("DOMContentLoaded", () => {
  const equationDisplay = document.querySelector(".equation");
  const answerDisplay = document.querySelector(".answer");
  const buttons = document.querySelector(".buttons");

  let equation = "";
  let previousAnswer = "";

  function updateDisplay() {
    equationDisplay.textContent = equation || "write here";
    answerDisplay.textContent = previousAnswer || "answer";
  }

  buttons.addEventListener("click", (event) => {
    const target = event.target;
    const value = target.textContent;

    if (target.classList.contains("digit")) {
      equation += value;
    } else if (
      target.classList.contains("operation") &&
      "0123456789".includes(equation.slice(-1))
    ) {
      equation += value.replace("×", "*").replace("÷", "/");
    } else if (target.classList.contains("bracket")) {
      if (target.getAttribute("left") === "true") {
        equation += "(";
        target.setAttribute("left", "false");
      } else if (equation.slice(-1) !== "(") {
        equation += ")";
        target.setAttribute("left", "true");
      }
    } else if (target.classList.contains("point")) {
      equation += ".";
    } else if (target.classList.contains("delete")) {
      equation = equation.slice(0, -1);
    } else if (target.classList.contains("all-clear")) {
      equation = "";
      previousAnswer = "";
    } else if (target.classList.contains("equal")) {
      try {
        previousAnswer = eval(equation).toString();
      } catch {
        previousAnswer = "Error";
      }
      equation = "";
    } else if (target.classList.contains("prev-answer")) {
      equation += previousAnswer;
    }

    updateDisplay();
  });

  updateDisplay();
});
