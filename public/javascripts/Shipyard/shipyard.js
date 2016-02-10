WP.Shipyard = function () {
	this.id = null;
	this.name = null;
	this.owner = null;
	this.rate = null;
	this.unitHolder = null;
	this.shipyardUnits = new Array();
	this.currentSquareX = null;
	this.currentSquareY = null;
	this.dragging = false;
}

WP.Shipyard.Util = {

	shipyardBuilder: function (id, name, owner, rate) {
		var shipyard = new WP.Shipyard();
		shipyard.id = id;
		shipyard.name = name;
		shipyard.owner = owner;
		shipyard.rate = rate;
		return shipyard;
	}
}

WP.Shipyard.prototype.addShipyardUnit = function (shipyardUnit) {
	this.shipyardUnits.push(shipyardUnit);
	//shipyardUnit.owner = this;
}

WP.Shipyard.prototype.removeUnitFromShipyard = function (shipyard, unit) {
	shipyard = game.getShipyardFromUnit(unit.id);
	var j = 0;
	while (j < shipyard.shipyardUnits.length) {
		if (shipyard.shipyardUnits[j].id == unit.id) {
			shipyard.shipyardUnits.splice(j, 1);
		}
		else {
			j++;
		}
	}
}

WP.Shipyard.prototype.updateShipyardUnitAddress = function (unit) {
	var shipyard = game.getShipyardFromUnit(unit.id);
	for (var i = 0; i < shipyard.shipyardUnits.length; i++) {
		if (shipyard.shipyardUnits[i].id == unit.id) {
			shipyard.shipyardUnits[i].x = unit.holderX;
			shipyard.shipyardUnits[i].y = unit.holderY;
		}
	}
}


WP.ShipyardUnit = function () {
	this.id = null;
	this.x = null;
	this.y = null;
}

WP.ShipyardUnit.Util = {

	shipyardUnitBuilder: function (id, x, y) {
		var shipyardUnit = new WP.ShipyardUnit();
		shipyardUnit.id = id;
		shipyardUnit.x = x;
		shipyardUnit.y = y;
		return shipyardUnit;
	}

}
