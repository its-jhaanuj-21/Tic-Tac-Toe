let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let mainContaint = document.querySelector("#main-containt");

// const clickSound = document.getElementById("#clickSound");
const clickSound = new Audio('click.mp3'); // Replace 'click_sound.mp3' with the path to your audio file
const winSound = new Audio('win.mp3');
clickSound.preload = 'auto'; // Preload the audio for better performance

let turnO = true;
let count = 0;

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    playClickSound();
    console.log("Box Was Clicked!!");
    if (turnO) {
      box.innerText = "X";
      turnO = false;
    } else {
      box.innerText = "O";
      turnO = true;
    }
    box.disabled = true;
    count = count + 1;
    checkWinner();
    checkDraw();
  });
});

const playClickSound = async () => {
    try {
      await clickSound.play();
    } catch (error) {
      console.error('Failed to play click sound:', error);
    }
  };

const playWinSound = async () => {
    try {
      await winSound.play();
    } catch (error) {
      console.error('Failed to play click sound:', error);
    }
  };



const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  mainContaint.style.display = "block";
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `"${winner}" is Winner`;
  playWinSound();
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //     boxes[pattern[0]].innerText,
    //     boxes[pattern[1]].innerText,
    //     boxes[pattern[2]].innerText);

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner", pos1Val);
        showWinner(pos1Val);
        disableBoxes();
        mainContaint.style.display = "none";
        count=0;
      }
    }
  }
};

const checkDraw = () => {
    if (count === 9) {
      msg.innerText = "It's a draw!";
      msgContainer.classList.remove("hide");
      disableBoxes();
      mainContaint.style.display = "none";
      count=0;
    }
  };

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
