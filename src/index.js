import { GameController, keyInput, keyUp } from './components/gameController.js';

const gameController = new GameController();
gameController.initLevel1();

window.addEventListener('keydown', ({keyCode}) => keyInput(keyCode));
window.addEventListener('keyup', ({keyCode}) => keyUp(keyCode));
