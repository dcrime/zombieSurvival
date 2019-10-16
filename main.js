player = new Player("player1", 100, 0, c.width / 2, c.height / 2);
gun = new Gun();

function createFewZombies() {
    while (zombies.length < 10) {
        var randPos = {
            x: Math.random() * c.width,
            y: Math.random() * c.height
        }
        createZombies(randPos.x, randPos.y, 20, 50, 1, 100);
    }
}

createFewZombies();

function drawLines(pos) {
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function draw() {
    drawLines(mouse)
    console.log()
}

function gameLoop() {
    ctx.clearRect(0, 0, c.width, c.height)
    player.update();
    gun.update();
    drawBullets();
    drawZombies();
    //draw();
    request = requestAnimationFrame(gameLoop)
}

request = requestAnimationFrame(gameLoop)
