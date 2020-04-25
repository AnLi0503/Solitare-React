export const newGame = () => ({ type: 'newGame' });
export const changeColumn = (newColumn,oldColumn,dragCards) => ({ type: 'changeColumn',newColumn,oldColumn,dragCards});
export const newPack = () => ({ type: 'newPack'});
export const backStep = () => ({ type: 'backStep'});

