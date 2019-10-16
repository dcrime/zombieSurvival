class Bullet {
    constructor(x, y, s, rot, speed, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = this.s / 2;
        this.speed = speed;
        this.lifeTime = 0;
        this.lifeSpan = 50;
        this.rot = rot;
    }

    destroy() {
        bulletIDs.push(this.id);
        // Gets the index of this asteroid using it's id
        var id = bullets.findIndex(e => (e.id == this.id))
        destroybullets.push(id);
    };

    move() {
        var pos = {
            x: this.x,
            y: this.y
        }
        var pos = direction(pos, this.rot, this.speed);
        this.x = pos.x;
        this.y = pos.y;
    }

    draw() {
        var pos = {
            x: this.x,
            y: this.y
        }
        var pos = direction(pos, this.rot, this.s);
        var lineX = pos.x;
        var lineY = pos.y;

        ctx.save();
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(lineX, lineY);
        //ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    update() {
        this.move();
        this.draw();
        if(this.lifeTime >= this.lifeSpan) this.destroy();
        else this.lifeTime++
    }
}


bullets = [];
bulletIDs = [];
destroybullets = [];

function createBullets(x, y, s, rot, size) {
    var id;
    if (!bulletIDs.length) {
        id = bullets.length + 1
    } else {
        id = bulletIDs.shift();
    }
    bullets.push(new Bullet(x, y, s, rot, size, id));
}

function drawBullets() {
    for (p in bullets) {
        if (bullets.hasOwnProperty(p)) {
            bullets[p].update();
        }
    }
    while (destroybullets.length) {
        var id = destroybullets.pop()
        bullets.splice(id, 1);
    }
}