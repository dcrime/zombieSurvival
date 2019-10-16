class Gun {
    constructor() {
        this.s = 10;
        this.r = this.s / 2;
        this.rot = 0;
        this.x = player.x;
        this.y = player.y;
        this.sound = 100
        this.speed = 5
        this.cooldown = 0
        this.maxCooldown = 7;
        this.endPos
    }
    shoot() {
        if(!this.isCool()) return
        zombies.forEach(zombie => {zombie.canHear()})
        createBullets(gun.endPos.x, gun.endPos.y, 2, this.rot, this.speed)
        this.cooldown = 0;
    }
    isCool(){
        if (this.cooldown >= this.maxCooldown) return true
        return false;
    }
    coolUpdate(){
        if (this.cooldown < this.maxCooldown){
            this.cooldown++
        }
    }
    draw() {
        this.rot = rotation(mouse, player)

        var pos = direction(player, this.rot, player.r);
        this.x = pos.x;
        this.y = pos.y;

        this.endPos = direction(player, this.rot, player.r + this.s);
        var lineX = this.endPos.x;
        var lineY = this.endPos.y;

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
        this.draw();
        this.coolUpdate();
    }
}