class Collider {
    constructor(me) {
        this.me = me;
    }
    
    checkForCollisions(other) {
        return other.position.y + other.size.height <= this.me.position.y
            && other.position.y + other.size.height + other.velocity.y >= this.me.position.y
            && other.position.x + other.size.width >= this.me.position.x
            && other.position.x <= this.me.position.x + this.me.size.width;
    }
}

export default Collider;