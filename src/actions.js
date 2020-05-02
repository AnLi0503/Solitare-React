export const newGame = () => ({ type: 'newGame' });
export const changeColumn = (arr) => ({ type: 'changeColumn',arr});
export const newPack = () => ({ type: 'newPack'});
export const autoMove = (dragCards) => ({ type: 'autoMove',dragCards:dragCards});
export function undoMove () {
  return {
    type: "UNDO_MOVE"
  };
}
export function clearHistory () {
  return {
    type: "CLEAR_HISTORY"
  };
}

