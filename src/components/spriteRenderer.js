class SpriteRenderer {
    constructor({path, size, frames}) {
        this.image = new Image();
        this.image.src = path;
        
        this.size = {
            width: size.width,
            height: size.height,
        };
        this.frames = frames - 1;
        this.currentFrame = 0;
    }
    
    nextFrame = () => {
        if (this.currentFrame < this.frames) this.currentFrame++;
        else this.currentFrame = 0;
    };
}

export default SpriteRenderer;