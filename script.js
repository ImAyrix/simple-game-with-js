"use strict";
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, activePlayer, currentScore, playing;

const init = function () {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    document.querySelector(".dice").classList.add("hidden");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
};
init();

const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
    activePlayer = activePlayer == 0 ? 1 : 0;
};

btnRoll.addEventListener("click", function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.setAttribute("src", `./images/dice-${dice}.png`);
        diceEl.classList.remove("hidden");

        if (dice != 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];
        if (scores[activePlayer] >= 50) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init);
