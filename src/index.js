import GameController from './components/gameController.js';
import { keyInput, keyUp } from './components/inputController.js';

const gameController = new GameController();
gameController.initLevel1();

window.addEventListener('keydown', ({keyCode}) => keyInput(keyCode));
window.addEventListener('keyup', ({keyCode}) => keyUp(keyCode));
