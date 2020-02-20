function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function angle(p1, p2) {
    return Math.atan2(p2.y - p1.y, -(p2.x - p1.x)) * (180 / Math.PI)
}

function degree(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}

function thatPoint(rot, dist) {
    return Math.cos((rot - 90) * (Math.PI / 180)) * dist;
}

function dir(p, d) {
    return (p / d)
}

function rotation(pos, pos2) {
    var dx = pos.x - pos2.x,
        dy = pos.y - pos2.y
    return Math.atan2(dy, dx)
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function inside(pos, rect){
	return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y+rect.h && pos.y > rect.y
}

function direction(pos, rot, rad = 0) {
    var cos = Math.cos(rot)
    var sin = Math.sin(rot)
    if (rad == 0) {
        return {
            x: pos.x + cos,
            y: pos.y + sin
        }
    }
    return {
        x: pos.x + cos * rad,
        y: pos.y + sin * rad
    }
}

function findNewPoint(x, y, angle, distance) {
    var result = {};

    result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
    result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);

    return result;
}

function tally(num) {
    var text = ''
    text += '卌'.repeat(num / 5)
    text += '|'.repeat(num % 5)
    return text;
}

function progressBar(x, y, w, h, p, mP) {
    var percentage = (p / mP) * w
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'lime';
    ctx.beginPath();
    ctx.fillRect(x, y + 1, percentage - 1, h - 1);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.restore();
}

function writeText(text, x, y, textSize, center = 'center', color = 'white', font = 'Arial') {
    ctx.save()
    ctx.font = textSize + "px " + font;
    ctx.fillStyle = color;
    ctx.textAlign = center;
    ctx.fillText(text, x, y);
    ctx.restore()
}

function drawArc(x, y, r, c = "white") {
    ctx.save();
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}

function drawRect(x, y, w, h, c = "white") {
    ctx.save();
    ctx.strokeStyle = c;
    //ctx.lineWidth = "10";
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
    ctx.restore();
}

function drawShape(shape, close, color = "white") {
    ctx.save();
    var i = 0;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(shape[i++], shape[i++]);
    while (i < shape.length) {
        ctx.lineTo(shape[i++], shape[i++]);
    }
    if (close) { ctx.closePath() }
    ctx.stroke();
    ctx.restore();
}

function drawLine(start, end, color = "white") {
    ctx.save();
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore()
}