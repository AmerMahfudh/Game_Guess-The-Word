//Setting Game Name 

let gameName = "Guess The Word";
document.title = gameName;

document.querySelector('h1').innerHTML = gameName;
document.querySelector('footer').innerHTML = `${gameName} Game Created By Amer`;

//Setting Game Options 
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;



// Manage Words
let wordToGuess = "";
const Words = ["create", "Updata", "Delete", "Master", "Branch", "Mainly", "AmerMh", "AmerSy"];

wordToGuess = Words[Math.floor(Math.random() * Words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButtton = document.querySelector(".hint");

getHintButtton.addEventListener("click", getHint);



function generateInput() {

  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) {
      tryDiv.classList.add("disabled-inputs");
    }
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();

  //Disabled All Inputs Except First One 
  const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");


  inputsInDisabledDiv.forEach((input) => input.disabled = true);

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {

    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(this);//or event.target
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();

      } else if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });

  });

}



const guesButton = document.querySelector(".check");
guesButton.addEventListener("click", handleGuesses);


console.log(wordToGuess);
function handleGuesses() {

  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {

    const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }


  if (successGuess) {
    messageArea.innerHTML = `you win the world is <span>${wordToGuess}</span>`;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
    }
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((a) => a.classList.add("disabled-inputs"));
    getHintButtton.disabled = true;
    guesButton.disabled = true;
  } else {


    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => input.disabled = true);
    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guesButton.disabled = true;
      getHintButtton.disabled = true;
      messageArea.innerHTML = `Game Over The Word is <span>${wordToGuess}</span>`;
    }



  }


}


function getHint() {

  if (numberOfHints > 0) {

    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;

  }

  if (numberOfHints === 0) {
    getHintButtton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    // console.log(randomIndex);
    // console.log(randomInput);
    // console.log(indexToFill);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }

}

function handleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackSpace);

window.onload = function () {
  generateInput();
}

















