class PacMan {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x
        this.y = y
        this.tileSize = tileSize
        this.velocity = velocity
        this.tileMap = tileMap
        this.#loadPacManImages()
    }

draw(ctx){

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



}

export default PacMan