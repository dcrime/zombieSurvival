window.addEventListener('keydown', press, false)
window.addEventListener('keyup', release, false)
fired = false
function press(e) {
    if (!fired && e.key == 'b') {
        fired = true;
        shop();
    }
}
function release() {
    fired = false
}

buyMenu = new buyMenu();
function shop() {
    buyMenu.visible = !buyMenu.visible
}

function buyMenuHandler() {
    if (!buyMenu.visible) return;
    buyMenu.menu()
}

function buyMenu() {
    this.lastPress = false;
    this.visible = false;
    this.menu = function () {
        var l = 0;
        for (i in items) {
            l++
            drawRect(c.width / 4, c.height / 4 + (l * 20), c.height / 2, 20)
        }

    }
}

var items = {
    damage: 0,
    speed: 0,
    fireRate: 0,
}