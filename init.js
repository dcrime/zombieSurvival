var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

var esp = {
    enable: function () {
        this.path = true;
        this.sound = true;
        this.vision = true;
    },
    disable: function () {
        this.path = false;
        this.sound = false;
        this.vision = false;
    },
    path: false,
    sound: false,
    vision: false,
}

var keymap = {
    a: false,
    s: false,
    d: false,
    w: false,
    b: false,
}

var mouse = {
    x: c.offsetLeft,
    y: c.offsetTop,
    left: false
}

function keydown(e) {
    if (keymap.hasOwnProperty(e.key) && !keymap[e.key]) {
        keymap[e.key] = true;
    }
}

function keyup(e) {
    if (keymap.hasOwnProperty(e.key) && keymap[e.key]) {
        keymap[e.key] = false;
    }
}

var focused = false

function changeFocus(e) {
    console.log('Changed focus')
}

function mousemove(e) {
    if (e.buttons == 2) { e.preventDefault(); e.stopPropagation() }
    var r = c.getBoundingClientRect();
    mouse = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        left: e.buttons == 1 ? true : false
    }
}
window.oncontextmenu = function (e) {
    if (e.button == 2) stopEvent(e);
}
function stopEvent(event) {
    if (event.preventDefault != undefined)
        event.preventDefault();
    if (event.stopPropagation != undefined)
        event.stopPropagation();
}
// Call keydown() while a key is pressed
window.addEventListener("keydown", keydown, false);
// Call keyup() when a key is released
window.addEventListener("keyup", keyup, false);
window.addEventListener("mousemove", mousemove, false);
window.addEventListener("mousedown", mousemove, false);
window.addEventListener("mouseup", mousemove, false);
// window.addEventListener("mousemove", mousemove, false);
// Call lostFocus() on focus loss
//window.addEventListener("blur", lostFocus);
// Calls resizeCanva() on window resize
//window.addEventListener("resize", resizeCanvas);