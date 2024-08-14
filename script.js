const checkBoxList = document.querySelectorAll(".checkbox");
const inputBoxLists = document.querySelectorAll(".input-box");
const errorMessage = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".desc-text");

// Save each input value to localStorage

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

updateProgressBar();
function saveDataInLocal() {
  inputBoxLists.forEach((input, index) => {
    localStorage.setItem(`goal${index}`, input.value);
  });
}

// Load each input value from localStorage
function loadDataFromLocal() {
  inputBoxLists.forEach((input, index) => {
    const savedValue = localStorage.getItem(`goal${index}`);
    if (savedValue) {
      input.value = savedValue;
    }
  });
}

inputBoxLists.forEach((input, index) => {
  // Save each input value to LocalStorage
  input.addEventListener("input", () => {
    localStorage.setItem(`goal${index}`, input.value);
  });
});

// Attach event listeners to inputs to save their values on change
inputBoxLists.forEach((input) => {
  input.addEventListener("input", () => {
    saveDataInLocal();

    // Uncheck all checkboxes if any input is empty
    if (input.value.trim() === "") {
      checkBoxList.forEach((cb) => {
        cb.checked = false;
        cb.parentElement.classList.remove("completed");
      });
    }
  });
});

// Attach event listeners to checkboxes to handle their state based on input values
checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    if (!inputBoxLists || inputBoxLists.length === 0) {
      console.error("input box list is empty or not defined");
      return;
    }

    let allFieldsFilled = [...inputBoxLists].every(
      (input, index) => input.value.trim() !== ""
    );

    if (allFieldsFilled) {
      const isCompleted = checkbox.parentElement.classList.toggle("completed");
      inputBoxLists.forEach((input) => {
        input.disabled = isCompleted;
        errorMessage.style.display = "none";
      });
    } else {
      errorMessage.style.display = "block";
      checkBoxList.forEach((cb) => {
        cb.checked = false;
        cb.parentElement.classList.remove("completed");
      });
      input.disabled = "false";
    }
    updateProgressBar();
  });
});

function updateProgressBar() {
  let completedGoalsCount = 0;
  checkBoxList.forEach((checkbox) => {
    if (checkbox.parentElement.classList.contains("completed")) {
      completedGoalsCount++;
    }
  });

  const progresspercentage = (completedGoalsCount / checkBoxList.length) * 100;
  progressValue.style.width = `${progresspercentage}%`;
  if (progresspercentage === 0) {
    progressValue.style.opacity = "0";
  } else {
    progressValue.style.opacity = "1";
  }
  progressValue.innerText = `${completedGoalsCount}/${checkBoxList.length} completed`;
  progressLabel.innerText = allQuotes[completedGoalsCount];
}

inputBoxLists.forEach((input) => {
  input.addEventListener("focus", () => {
    errorMessage.style.display = "none";
  });
});
// Load saved input values when the page loads
window.addEventListener("load", () => {
  loadDataFromLocal();
});
