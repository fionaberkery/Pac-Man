import TileMap from "./TileMap.js"

const tileSize = 32
const velocity = 2

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const tileMap = new TileMap(tileSize)
const pacMan = tileMap.getPacMan(velocity)

function gameLoop() {
    tileMap.draw(ctx)
    pacMan.draw(ctx)
}

tileMap.setCanvasSize(canvas)

setInterval(gameLoop, 1000 / 75)