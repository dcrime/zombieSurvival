class Buttons {
    constructor(text, area, id, center = 'center', off = 0, offLeft = 0, color = 'white', h) {
        this.text = text
        this.area = area
        this.textArea = { x: this.area.x + this.area.w, y: c.height / 4 + (id * h), h: h, w: c.height / 3 }
        this.id = id
        this.center = center
        this.off = off
        this.offLeft = offLeft
        this.color = color
    }

    mouseIn() {
        return inside(mouse, this.area)
    }

    upgrades(item, name) {
        if (player.money < item.money) return
        switch (name) {
            case 'damage':
                player.money -= item.money
                item.money *= 2
                item.points++
                gun.damage += 0.5
                    break;
            case 'speed':
                player.money -= item.money
                item.money *= 2
                item.points++
                player.speed += 0.5
                    break;
            case 'fireRate':
                player.money -= item.money
                item.money *= 2
                item.points++
                gun.maxCooldown -= 0.5
                    break;
            case 'health':
                player.money -= item.money
                player.health = player.maxHealth
                    break;

            default:
                break;
        }
    }

    writePoints(col){
        switch (this.text) {
            case 'health':
                items['health'].points = player.health
                items['health'].money = Math.floor((player.maxHealth - player.health) *1.5)
                writeText(items[this.text].points + '/' + player.maxHealth, (this.offLeft == 0 ? this.textArea.x : this.textArea.x - this.offLeft), this.textArea.y + (this.off == 0 ? this.textArea.w : this.textArea.h / this.off), this.textArea.h / this.off, 'right', col)
                break;
        
            default:
                writeText(items[this.text].points, (this.offLeft == 0 ? this.textArea.x : this.textArea.x - this.offLeft), this.textArea.y + (this.off == 0 ? this.textArea.w : this.textArea.h / this.off), this.textArea.h / this.off, 'right', col)
                break;
        }
    }

    draw(click) {
        var col;
        if (this.mouseIn()) {
            col = this.color
            if (click)
                this.upgrades(items[this.text], this.text)
        } else col = 'gray'
        drawRect(this.area.x, this.area.y, this.area.w, this.area.h, col)
        this.writePoints(col)
        writeText(this.text.capitalize() + ' ' + items[this.text].money + '$', (this.offLeft == 0 ? this.area.x : this.area.x + this.offLeft), this.area.y + (this.off == 0 ? this.area.w : this.area.h / this.off), this.area.h / this.off, 'left', col)
    }

    update(click = false) {
        this.draw(click)
    }
}

c.addEventListener('mouseup', buyMenu)

window.addEventListener('keyup', release, false)

menuVisible = false

function buyMenu(e = false) {
    if (!menuVisible) return false
    for (i of buttons) {
        i.update(e)
    }
    return true
}

function release(e) {
    if (e.key == 'b')
        menuVisible = !menuVisible
}

var items = {
    damage: { points: 0, money: 5 },
    speed: { points: 0, money: 5 },
    fireRate: { points: 0, money: 5 },
    health: { points: 0, money: 10}
}

var buttons = []

function setup() {
    var l = 0
    for (i in items) {
        l++
        var h = 50
        var s = { x: c.width / 4, y: c.height / 4 + (l * h), h: h, w: c.height / 3 }
        buttons.push(new Buttons(i, s, l, 'center', 1.5, 5, 'white', h))
    }
}

setup()