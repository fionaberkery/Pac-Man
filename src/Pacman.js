import MovingDirection from "./MovingDirection.js"

class PacMan {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x
        this.y = y
        this.tileSize = tileSize
        this.velocity = velocity
        this.tileMap = tileMap

        this.currentMovingDirection = null
        this.requestedMovingDirection = null

        this.pacManAnimationTimerDefault = 10
        this.pacManAnimationTimer = null

        document.addEventListener("keydown", this.#keydown)

        this.#loadPacManImages()
    }

draw(ctx){

    this.#move()
    this.#animate()

    ctx.drawImage(
        this.pacManImages[this.pacManImageIndex], 
        this.x, 
        this.y, 
        this.tileSize, 
        this.tileSize)
}

#loadPacManImages(){
    const pacManImage1 = new Image()
    pacManImage1.src = './images/pac0.png' 

    const pacManImage2 = new Image()
    pacManImage2.src = './images/pac1.png' 

    const pacManImage3 = new Image()
    pacManImage3.src = './images/pac2.png' 

    const pacManImage4 = new Image()
    pacManImage4.src = './images/pac1.png'
    
    this.pacManImages = [
        pacManImage1, 
        pacManImage2, 
        pacManImage3, 
        pacManImage4]

    this.pacManImageIndex = 0
}

#keydown = (event) => {
    // up
    if (event.keyCode == 38){
        if(this.currentMovingDirection == MovingDirection.down)
            this.currentMovingDirection = MovingDirection.up
        this.requestedMovingDirection = MovingDirection.up
    }
    // down
    if (event.keyCode == 40){
        if(this.currentMovingDirection == MovingDirection.up)
            this.currentMovingDirection = MovingDirection.down
        this.requestedMovingDirection = MovingDirection.down
    }
    // left
    if (event.keyCode == 37){
        if(this.currentMovingDirection == MovingDirection.right)
            this.currentMovingDirection = MovingDirection.left
        this.requestedMovingDirection = MovingDirection.left
    }
    // right
    if (event.keyCode == 39){
        if(this.currentMovingDirection == MovingDirection.left)
            this.currentMovingDirection = MovingDirection.right
        this.requestedMovingDirection = MovingDirection.right
    }
}

#move(){
    if (this.currentMovingDirection !== this.requestedMovingDirection){
        if(
            Number.isInteger(this.x/this.tileSize) 
            && 
            Number.isInteger(this.y/this.tileSize) 
            ) {
                if (
                    !this.tileMap.didCollideWithEnvironment(
                    this.x, 
                    this.y, 
                    this.requestedMovingDirection 
                    )
                )
                this.currentMovingDirection = this.requestedMovingDirection
            }
        }

    if (
        this.tileMap.didCollideWithEnvironment(
            this.x, 
            this.y, 
            this.currentMovingDirection
            )
            ) {
                this.pacManAnimationTimer = null
                this.pacManImageIndex = 1
                return
            }
            else if(
                this.currentMovingDirection != null && 
                this.pacManAnimationTimer == null
            ) {
                this.pacManAnimationTimer = this.pacManAnimationTimerDefault
            }

    switch(this.currentMovingDirection){
        case MovingDirection.up:
        this.y -= this.velocity
        break 
    }

    switch(this.currentMovingDirection){
        case MovingDirection.down:
        this.y += this.velocity
        break 
    }

    switch(this.currentMovingDirection){
        case MovingDirection.left:
        this.x -= this.velocity
        break 
    }
    
    switch(this.currentMovingDirection){
        case MovingDirection.right:
        this.x += this.velocity
        break 
    }

}

#animate() {
    if(this.pacManAnimationTimer == null){
        return
    }
    this.pacManAnimationTimer--
    if(this.pacManAnimationTimer == 0){
        this.pacManAnimationTimer = this.pacManAnimationTimerDefault
        this.pacManImageIndex++
        if(this.pacManImageIndex == this.pacManImages.length)
            this.pacManImageIndex = 0
    }
}

}

export default PacMan