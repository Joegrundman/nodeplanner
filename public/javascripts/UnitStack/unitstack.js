/* global WP */
WP.UnitStack = function () {
	this.x = 0;
	this.y = 0;
	this.units = new Array();
}

WP.UnitStack.prototype.getTopUnit = function () {
	if (!this.units) return null;
	return this.units[this.units.length - 1];
}

WP.UnitStack.prototype.removeUnit = function (unit) {
	var j = 0;
	while (j < this.units.length) {
		if (this.units[j] == unit)
			this.units.splice(j, 1);
		else
			j++;
	}
}

WP.UnitStack.prototype.addUnit = function (unit) {
	if (!unit) return;
	this.units[this.units.length] = unit;
	unit.stack = this;
}

WP.UnitStack.prototype.rotateUnits = function () {
	var unit = this.units.shift();
	this.addUnit(unit);

}
