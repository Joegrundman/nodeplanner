
WP.Hex = function (id, map, x, y) {
	this.id = id;
	this.map = map;
	this.letter = "A";
	this.number = 0;
	this.size = 36.45; // 47.3;
	this.width = 0;
	this.owner = null;
	this.cityName = null;
	this.isPort = null;
	this.isCapital = null;
	this.isBeach = null;
	this.isTerrain = null;
	this.isIsland = null;
	this.units = new Array();
	this.coordinate = new Point(x, y);
	this.pixelPoint = new Point(x, y);
	this.unitStartPoint = new Point(x, y);
	this.background = null;
	this.largeBackground = null;
	this.setZoom = WP.Hex.UI.setHexZoom;

	this.toString = function () {
		return this.letter + this.number.toString();
	}

	WP.Hex.Util.setAttributes(this);
}

WP.Hex.Util = {
		setAttributes: function (hex) {
			hex.letter = Convert.toAscii(hex.coordinate.y);
			hex.number = hex.coordinate.x + 16;
			hex.number -= Math.floor(hex.coordinate.y / 2);
		}
}

WP.Hex.prototype.addUnit = function (unit) {
	if (!unit) return;
	this.units[this.units.length] = unit;
	unit.location = 2;
	unit.hex = this;
}

WP.Hex.prototype.addOrCombineUnit = function (unit) {
	for (var i = 0; i < this.units.length; i++) {
		if (unit.canCombineWith(this.units[i])) {
			this.units[i].strength += unit.strength;
			unit.owner.removeUnit(unit);
			return;
		}
	}
	this.units[this.units.length] = unit;
	unit.location = 2;
	unit.hex = this;
}

WP.Hex.prototype.combineAllUnits = function (unit) {
	var combined = this.combineUnit(unit);
	while (combined) {
		combined = this.combineUnit(unit);
	}
}

WP.Hex.prototype.combineUnit = function (unit) {
	for (var i = 0; i < this.units.length; i++) {
		if (unit.canCombineWith(this.units[i])) {
			unit.strength += this.units[i].strength;
			unit.owner.removeUnit(this.units[i]);
			this.removeUnit(this.units[i]);
			return true;
		}
	}
	return false;
}

WP.Hex.prototype.getTopUnit = function () {
	if (!this.units || this.units.length < 1) return null;
	return this.units[this.units.length - 1];
}

WP.Hex.prototype.removeUnit = function (unit) {
	var j = 0;
	while (j < this.units.length) {
		if (this.units[j] == unit)
			this.units.splice(j, 1);
		else
			j++;
	}
	unit.hex = null;
}

WP.Hex.prototype.rotateUnits = function () {
	var unit = this.units.shift();
	this.addUnit(unit);
}

WP.Hex.prototype.getOwner = function () {
	var owner = this.owner;
	return owner;
}
