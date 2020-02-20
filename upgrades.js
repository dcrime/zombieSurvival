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

    draw(click) {
        var col;
        if (this.mouseIn()) {
            col = this.color
            if(click)
                items[this.text]++
        } else col = 'gray'
        drawRect(this.area.x, this.area.y, this.area.w, this.area.h, col)
        writeText(items[this.text], (this.offLeft == 0 ? this.textArea.x : this.textArea.x - this.offLeft), this.textArea.y + (this.off == 0 ? this.textArea.w : this.textArea.h / this.off), this.textArea.h / this.off, 'right', col)
        writeText(this.text, (this.offLeft == 0 ? this.area.x : this.area.x + this.offLeft), this.area.y + (this.off == 0 ? this.area.w : this.area.h / this.off), this.area.h / this.off, 'left', col)
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
    damage: 0,
    speed: 0,
    fireRate: 0,
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