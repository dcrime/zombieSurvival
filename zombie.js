class Zombie {
    constructor(x, y, s, rot, speed, atkCool, damage, health, id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = s / 2;
        this.worth = Math.round(Math.random() * health / s);
        this.detRad = s * 3;
        this.maxtHealth = health
        this.health = health;
        this.speed = speed;
        this.goal = { x: x, y: y };
        this.rot = rot;
        this.damage = damage
        this.atkCool = atkCool
        this.cool = 0;
    }

    newGoal() {
        do {
            var pos = {
                x: Math.random() * c.width,
                y: Math.random() * c.height
            }
        } while (dist(pos.x, pos.y, this.x, this.y) > 100)
        var thispos = {
            x: this.x,
            y: this.y
        }
        this.goal = pos;
        this.rot = rotation(thispos, pos)
    }

    attack() {
        player.health -= this.damage
    }

    shouldAttack() {
        if (this.cool <= 0) {
            if (dist(player.x, player.y, this.x, this.y) < this.r + player.r) {
                this.attack()
                this.cool = this.atkCool
            }
        } else {
            if (this.cool > 0)
                this.cool -= 0.1
            else if (this.cool < 0)
                this.cool = 0
        }
    }

    drawRad(col, rad) {
        drawArc(this.x, this.y, rad, col);
    }

    radius() {
        if (esp.sound) {
            if (dist(player.x, player.y, this.x, this.y) < gun.sound + player.r)
                this.drawRad('red', gun.sound + player.r)
            else
                this.drawRad('blue', gun.sound + player.r)
        }
        if (esp.vision) {
            if (dist(player.x, player.y, this.x, this.y) < this.detRad + player.r)
                this.drawRad("red", this.detRad)
            else
                this.drawRad('green', this.detRad);
        }

        if (dist(player.x, player.y, this.x, this.y) < this.detRad + player.r) return true;
        return false;
    }

    canHear() {
        if (dist(player.x, player.y, this.x, this.y) < gun.sound + player.r) {
            this.goal = {
                x: player.x,
                y: player.y
            }
        }
    }

    move() {
        var pos = {
            x: this.x,
            y: this.y
        }

        this.rot = rotation(this.goal, pos)

        if (dist(this.goal.x, this.goal.y, pos.x, pos.y) < 1) this.newGoal();

        if (this.radius()) {
            this.goal = {
                x: player.x,
                y: player.y
            }
            this.rot = rotation(player, pos)
        }
        if (dist(player.x, player.y, pos.x, pos.y) < this.r + player.r) {
            //this.rot = rotation(pos, player)
            pos = { x: this.x, y: this.y }
        } else {
            var pos = direction(pos, this.rot, this.speed);
        }
        zombies.forEach(zombie => {
            if (zombie.id == this.id) return;
            if (dist(zombie.x, zombie.y, pos.x, pos.y) < this.r + zombie.r) {
                this.rot = rotation(pos, zombie)
            }
        });

        this.x = pos.x;
        this.y = pos.y;
    }

    drawPath() {
        var path = [
            this.x, this.y,
            this.goal.x, this.goal.y
        ]

        drawShape(path, false, "purple")
    }

    drawHealth() {
        if (this.health >= this.maxtHealth) return;
        progressBar(this.x - this.r, this.y + this.s, this.s, this.r / 2, this.health, this.maxtHealth)
    }

    draw() {
        if (esp.path) this.drawPath();
        var cool = this.cool/this.atkCool % 2
        var pos = {
            x: this.x,
            y: this.y
        }
        this.drawHealth();
        drawArc(this.x, this.y, this.r);
        var startPos = direction(pos, this.rot + 5, this.r);
        var endPos = direction(startPos, this.rot - cool, this.r);
        drawLine(startPos, endPos, 'white')
        var startPos = direction(pos, this.rot - 5, this.r);
        var endPos = direction(startPos, this.rot + cool, this.r);
        drawLine(startPos, endPos, 'white')
    }

    destroy() {
        player.money += this.worth;
        zombieIDs.push(this.id);
        // Gets the index of this asteroid using it's id
        var id = zombies.findIndex(e => (e.id == this.id))
        destroyZombies.push(id);
    };

    shouldDie() {
        var damage = false
        var dmg = 0;
        bullets.forEach(bullet => {
            if ((dist(bullet.x, bullet.y, this.x, this.y) < this.r + bullet.r)) {
                damage = true;
                dmg = bullet.damage
                bullet.destroy();
                destroyBullets()
            }
        });
        if (damage) this.health -= dmg;
        if (this.health <= 0)
            return true;
        else return false;
    }

    update() {
        this.move();
        this.radius();
        this.draw();
        this.shouldAttack();
        if (this.shouldDie()) this.destroy();
    };
}

zombies = [];
zombieIDs = [];
destroyZombies = [];

function createZombies(x, y, s, rot, speed, atk, damage, health) {
    var id;
    if (!zombieIDs.length) {
        id = zombies.length + 1
    } else {
        id = zombieIDs.shift();
    }
    zombies.push(new Zombie(x, y, s, rot, speed, atk, damage, health, id))
}

function drawZombies() {
    for (p in zombies) {
        if (zombies.hasOwnProperty(p)) {
            zombies[p].update();
        }
    }
    while (destroyZombies.length) {
        // Removes all the zombie
        var id = destroyZombies.pop()
            // Remove this zombie from the array
        zombies.splice(id, 1);
    }
}