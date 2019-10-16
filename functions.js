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