// EVENT DELEGATION là mình viết code làm sao cho nó nhận sự kiện ở thằng cha , và các thằng con đều nhận dc sự kiện đó (Capturing and Bubbling)

import {
  getCellElementAtIdx,
  getCellElementList,
  getCurrentTurnElement,
  getGameStatusElement,
  getReplayButtonElement,
  getElementListCell,
} from "./selectors.js";
import { CELL_VALUE, GAME_STATUS, TURN } from "./constants.js";
import { checkGameStatus } from "./utils.js";
/**
 * Global variables
 */

let currentTurn = TURN.CROSS; // first stage is X
let gameStatus = GAME_STATUS.PLAYING; // first stage is status
let isGameEnded = false;
let cellValues = new Array(9).fill("");
// console.log(checkGameStatus(["X", "O", "O", "", "O", "", "", "O", "X"]));

/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */
const toggleTurn = () => {
  // toggleTurn : if currentTurn is CIRCLE => toggle to CROSS , if is CROSS => CIRCLE
  currentTurn = currentTurn === TURN.CIRCLE ? TURN.CROSS : TURN.CIRCLE;
  // update status turn and display on title
  const currentTurnDisplayed = getCurrentTurnElement();
  if (currentTurnDisplayed) {
    currentTurnDisplayed.classList.remove(TURN.CROSS, TURN.CIRCLE);
    currentTurnDisplayed.classList.add(currentTurn);
  }
};

const updateGameStatus = (newGameStatus) => {
  gameStatus = newGameStatus;

  const statusElement = getGameStatusElement();
  if (statusElement) statusElement.textContent = newGameStatus;
};
const showReplayBtn = () => {
  const replayBtn = getReplayButtonElement();
  if (replayBtn) replayBtn.classList.add("show");
};
const higlightWinCell = (winPositions) => {
  if (!Array.isArray(winPositions) || winPositions.length !== 3) {
    throw new Error("Invalid win position");
  }
  for (const position of winPositions) {
    console.log(winPositions);
    const cellAtPosition = getCellElementAtIdx(position);
    if (cellAtPosition) cellAtPosition.classList.add("win");
  }
};

const handleCellClick = (cell, index) => {
  // if that cell was clicked -> stop and not allow click again
  const isClicked =
    cell.classList.contains(TURN.CIRCLE) || cell.classList.contains(TURN.CROSS);
  const isEndGame = gameStatus !== GAME_STATUS.PLAYING;
  if (isClicked || isEndGame) return;
  // click and set - currentTurn can is TURN.CROSS or TURN.CIRCLE (in global)
  cell.classList.add(currentTurn);

  // update into cellValue List -  if currentTurn is circle , value in list will be circle and vice versa
  cellValues[index] =
    currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;

  // toggle turn
  toggleTurn();

  // check game status
  const game = checkGameStatus(cellValues);
  switch (game.status) {
    case GAME_STATUS.ENDED: {
      //update game status
      updateGameStatus(game.status);
      // show replay btn
      showReplayBtn();

      break;
    }

    case GAME_STATUS.X_WIN:
    case GAME_STATUS.O_WIN: {
      //update game status
      updateGameStatus(game.status);
      // show replay btn
      showReplayBtn();
      // highlight win cells
      higlightWinCell(game.winPositions);
      break;
    }

    default:
    // PLAYING
  }
};

const initCellElementList = () => {
  const liCellElement = getCellElementList(); //li
  // set attr for li element to get index
  liCellElement.forEach((cell, idx) => {
    cell.dataset.id = idx;
  });
  //---------------------------
  // handle on UL tag
  const ulElementListCell = getElementListCell(); // ul
  if (!ulElementListCell) return;
  ulElementListCell.addEventListener("click", (e) => {
    const cell = e.target;
    const index = Number.parseInt(cell.getAttribute("data-id"));
    // get dataset id in li cell and parse to number
    if (cell.tagName !== "LI") return; // not allow handle on tag not LI
    handleCellClick(cell, index);
  });
};

const resetGame = () => {
  // reset global variable
  currentTurn = TURN.CROSS;
  gameStatus = GAME_STATUS.PLAYING;
  cellValues = cellValues.map((x) => (x = ""));
  // reset game status
  updateGameStatus(GAME_STATUS.PLAYING);
  // reset game currentTurn
  const currentTurnDisplayed = getCurrentTurnElement();
  if (currentTurnDisplayed) {
    currentTurnDisplayed.classList.remove(TURN.CROSS, TURN.CIRCLE);
    currentTurnDisplayed.classList.add(TURN.CROSS);
  }
  // reset game  game board
  const cellElement = getCellElementList();
  for (const cell of cellElement) {
    cell.removeAttribute("class");
  }
  // hide replay button
  const replayBtn = getReplayButtonElement();
  if (replayBtn) replayBtn.classList.remove("show");
};

const initReplayBtn = () => {
  const replayBtn = getReplayButtonElement();
  if (replayBtn) replayBtn.addEventListener("click", resetGame);
};

(() => {
  // bind click event for all li element
  initCellElementList();
  initReplayBtn();
  // bind click event for replay button
  // ..
})();
