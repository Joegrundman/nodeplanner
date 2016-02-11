WP.Attrition = function() {
	this.units = new Array();
}

WP.Attrition.prototype.addUnit = function (unit) {
	if (!unit) return;
	if (!unit.canBeCountedInAttrition()) return;
	var foundUnit = false;
	for (var i = 0; i < this.units.length; i++) {
		if (this.units[i] == unit) {
			this.removeUnit(unit);
			foundUnit = true;
			break;
		}
	}

	if (!foundUnit) {
		this.units.push(unit);
		unit.highlight = new WP.Color(255, 255, 72).toRgb();
	}
}

WP.Attrition.prototype.handleHexClick = function () {
	var map = game.currentMap;
	var hex = map.currentHex;
	if (!hex) return;
	if (ctrlPressed()) {
		// for (var i = 0; i < hex.units.length; i++) {
		// 	this.addUnit(hex.units[i]);
		// }
        hex.units.forEach(u => this.addUnit(u))
	}
	else {
		this.addUnit(hex.getTopUnit());
	}
	hex.draw();
	this.refreshTotals();
}

WP.Attrition.prototype.removeUnit = function (unit) {
	if (!unit) return;
	var j = 0;
	while (j < this.units.length) {
		if (this.units[j] == unit)
			this.units.splice(j, 1);
		else
			j++;
	}
	unit.highlight = null;
}