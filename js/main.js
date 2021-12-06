import {
  getCellElementAtIdx,
  getCellElementList,
  getCurrentTurnElement,
  getGameStatusElement,
} from "./selectors.js";
import { TURN } from "./constants.js";
/**
 * Global variables
 */
let currentTurn = TURN.CROSS; // first stage is X
let isGameEnded = false;
let cellValues = new Array(9).fill("");

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
const handleCellClick = (cell, index) => {
  // if that cell was clicked -> stop and not allow click again
  const isClicked =
    cell.classList.contains(TURN.CIRCLE) || cell.classList.contains(TURN.CROSS);
  if (isClicked) return;
  // click and set - currentTurn can is TURN.CROSS or TURN.CIRCLE (in global)
  cell.classList.add(currentTurn);
  // toggle turn
  toggleTurn();
};

const initCellElementList = () => {
  const cellList = getCellElementList();
  cellList.forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(cell, index));
  });
};

(() => {
  // bind click event for all li element
  initCellElementList();
  // bind click event for replay button
  // ..
})();
