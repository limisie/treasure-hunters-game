import Player from './player.js';
import {c, canvas} from './canvas.js';

const player = new Player(canvas);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
}

animate();
