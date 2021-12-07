// Implement selector function to get elements needed
// 1. Cell List
// 2. Current Turn
// 3. Replay Game
// 4. Game status
// viết các hàm get element riêng đề khi mình muốn sử dụng ở nhiều nơi thì mình chỉ cần gọi hàm mà k cần get bằng việc gõ document lặp lại code nữa

export function getCellElementList() {
  return document.querySelectorAll("#cellList > li");
}

export function getCurrentTurnElement() {
  return document.querySelector("#currentTurn");
}
export function getCellElementAtIdx(index) {
  // do index trong arr bắt đầu từ 0 mà thăng nth-child trong css bắt đầu từ 1 nên mình mới +1
  return document.querySelector(`#cellList > li:nth-child( ${index + 1} )`);
}
export function getGameStatusElement() {
  return document.querySelector("#gameStatus");
}
export function getReplayButtonElement() {
  return document.querySelector("#replayGame");
}
export function getElementListCell() {
  return document.querySelector("#cellList");
}
