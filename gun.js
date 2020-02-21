class Gun {
    constructor() {
        this.s = 10;
        this.r = this.s / 2;
        this.rot = 0;
        this.x = player.x;
        this.y = player.y;
        this.sound = 100
        this.speed = 5
        this.damage = 10
        this.cooldown = 0
        this.maxCooldown = 20;
        this.endPos
    }

    shoot() {
        if (!this.isCool()) return
        zombies.forEach(zombie => { zombie.canHear() })
        createBullets(gun.endPos.x, gun.endPos.y, 2, this.rot, this.speed, this.damage)
        this.cooldown = 0;
    }
    isCool() {
        if (this.cooldown >= this.maxCooldown) return true
        return false;
    }
    coolUpdate() {
        if (this.cooldown < this.maxCooldown) {
            this.cooldown++
        }
    }

    move(){
        this.rot = rotation(mouse, player)

        var pos = direction(player, this.rot, player.r);
        this.x = pos.x;
        this.y = pos.y;
    }

    draw() {
        this.endPos = direction(player, this.rot, player.r + this.s);
        var lineX = this.endPos.x;
        var lineY = this.endPos.y;

        var path = [
            this.x, this.y,
            lineX, lineY
        ]

        drawShape(path, false)
    }

    update() {
        this.move();
        this.draw();
        this.coolUpdate();
    }
}