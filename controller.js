const keys = {
    68: {
        direction: 'right',
        pressed: false
    },
    65: {
        direction: 'left',
        pressed: false
    },
    87: {
        direction: 'up',
        pressed: false,
        executed: false,
    },
    83: {
        direction: 'down',
        pressed: false
    },
    validKeys: {
        codes: [65, 68, 87, 83]
    }
};

export const playerMovement = (player) => {
    if (keys[65].pressed) {
        player.addVelocity(-player.maxVelocity, 0);
    } else if (keys[68].pressed) {
        player.addVelocity(player.maxVelocity, 0);
    } else if (keys[87].pressed) {
        if (!keys[87].executed) {
            player.addVelocity(0, -player.maxVelocity * 2);
            keys[87].executed = true;
        }
    } else if (keys[83].pressed) {
        player.addVelocity(0, player.maxVelocity);
    } else {
        player.stop();
    }
    
    player.update();
};

export const keyInput = (keyCode) => {
    if (keys.validKeys.codes.includes(keyCode)) {
        keys[keyCode].pressed = true;
    }
};

export const keyUp = (keyCode) => {
    if (keys.validKeys.codes.includes(keyCode)) {
        keys[keyCode].pressed = false;
        if (keyCode === 87) keys[keyCode].executed = false;
    }
};
