class GameController {
    constructor(player, endOffset) {
        this.player = player;
        this.endOffset = endOffset;
    }
    
    endCondition = () => {
        console.log(this.player.scrollOffset);
        return this.player.scrollOffset >= this.endOffset;
    };
    
    endGame = () => {
        console.log('You Won!');
    };
}

export default GameController;