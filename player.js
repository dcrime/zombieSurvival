class Player {
    constructor(name, health, maxHealth, speed, lives, money, x, y) {
        this.name = name;
        this.maxHealth = maxHealth
        this.health = health;
        this.lives = lives;
        this.money = money;
        this.speed = speed
        this.s = 20;
        this.r = this.s/2;
        this.rot = 0;
        this.x = x;
        this.y = y;
        this.dead = false;
    }

    shoot(){
        gun.shoot();
    };

    move(){
        if(keymap['a']) this.x-=this.speed
        if(keymap['s']) this.y+=this.speed
        if(keymap['d']) this.x+=this.speed
        if(keymap['w']) this.y-=this.speed
        if(mouse.left) this.shoot()
    }
    
    die(){
        this.dead = true;
        this.respawn()
    }

    respawn(){
        if(this.lives > 0){
            this.x = c.clientWidth/2
            this.y = c.clientHeight/2
            this.dead = false
            this.health = this.maxHealth
            this.lives--
        }
    }

    shouldDie(){
        if(this.health <= 0) {
            this.die()
        }
    }

    miscs(){
        progressBar(20, 20, 200, 10, this.health, this.maxHealth)
        var text = tally(this.lives)
        writeText(text, 230 + ctx.measureText(text).width, 30, 20)
        writeText(this.money + '$', 30, 50, 20)
    }

    draw(){
        drawArc(this.x, this.y, this.r);
    }

    update() {
        this.shouldDie()
        this.move();
        this.draw();
    }
}