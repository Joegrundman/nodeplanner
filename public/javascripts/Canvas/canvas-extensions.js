CanvasRenderingContext2D.prototype.drawUnits = function (units, x, y) {
	if (game.hideUnits) { return; }
	if (!units || units.length < 1) return;

	// 7 units
	var count = units.length;
	var start = 0;
	if (count > 5) {
		start = units.length - 5; // start is 2
	}

	var size = units[0].size;
	var stagger = adjust(10);
	var displayed = count - start;
	if (displayed > 1) {
		var height = ((displayed - 1) * stagger) + size;
		while (height > adjust(50)) {
			stagger -= 1;
			height = ((displayed - 1) * stagger) + size;
		}

		x += (stagger / 2);
		y += (stagger / 2);
		if (displayed > 2) y++;
	}

	var i = start;
	//var i = 0;
	while (i < count) {
		units[i++].draw(this, x, y);
		x -= stagger;
		y -= stagger;
	}
}

CanvasRenderingContext2D.prototype.getImageDataSafely = function (x, y, width, height) {
	return this.getImageData(x, y, width, height);
    // deprecated
    
    // try {
	// 	return this.getImageData(x, y, width, height);
	// }
	// catch (e) {
	// 	netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	// 	return this.getImageData(x, y, width, height);
	// }
}

CanvasRenderingContext2D.prototype.roundRect = function (sx, sy, ex, ey, r) {
	var r2d = Math.PI / 180;
	if ((ex - sx) - (2 * r) < 0) { r = ((ex - sx) / 2); } //ensure that the radius isn't too large for x
	if ((ey - sy) - (2 * r) < 0) { r = ((ey - sy) / 2); } //ensure that the radius isn't too large for y
	sx = Math.floor(sx);
	sy = Math.floor(sy);
	ex = Math.floor(ex);
	ey = Math.floor(ey);
	r = Math.floor(r);
	if (r < 0) r = 0;
	this.beginPath();
	this.moveTo(sx + r, sy);
	this.lineTo(ex - r, sy);
	this.arc(ex - r, sy + r, r, r2d * 270, r2d * 360, false);
	this.lineTo(ex, ey - r);
	this.arc(ex - r, ey - r, r, r2d * 0, r2d * 90, false);
	this.lineTo(sx + r, ey);
	this.arc(sx + r, ey - r, r, r2d * 90, r2d * 180, false);
	this.lineTo(sx, sy + r);
	this.arc(sx + r, sy + r, r, r2d * 180, r2d * 270, false);
	this.closePath();
}

CanvasRenderingContext2D.prototype.shadow = function (sx, sy, ex, ey, r) {
	var r2d = Math.PI / 180;
	if ((ex - sx) - (2 * r) < 0) { r = ((ex - sx) / 2); } //ensure that the radius isn't too large for x
	if ((ey - sy) - (2 * r) < 0) { r = ((ey - sy) / 2); } //ensure that the radius isn't too large for y
	sx = Math.floor(sx);
	sy = Math.floor(sy);
	ex = Math.floor(ex);
	ey = Math.floor(ey);
	r = Math.floor(r);
	this.beginPath();
	this.moveTo(ex - r, sy);
	this.arc(ex - r, sy + r, r, r2d * 270, r2d * 360, false);
	this.lineTo(ex, ey - r);
	this.arc(ex - r, ey - r, r, r2d * 0, r2d * 90, false);
	this.lineTo(sx + r, ey);
	this.arc(sx + r, ey - r, r, r2d * 90, r2d * 180, false);
	this.closePath();
}
