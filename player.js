class Player {
    constructor(name, health, money, x, y) {
        this.name = name;
        this.health = health;
        this.money = money;
        this.s = 20;
        this.r = this.s/2;
        this.rot = 0;
        this.x = x;
        this.y = y;
    }

    shoot(){
        gun.shoot();
    };

    move(){
        if(keymap['a']) this.x-=1
        if(keymap['s']) this.y+=1
        if(keymap['d']) this.x+=1
        if(keymap['w']) this.y-=1
        if(mouse.left) this.shoot()
    }
    
    draw(){
        drawArc(this.x, this.y, this.r);
    }

    update() {
        this.move();
        this.draw();
    }
}