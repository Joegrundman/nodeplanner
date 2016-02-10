WP.Map.Mouse = {};

WP.Map.prototype.displayCoordinates = function () {
	var coord = "&nbsp;(" + this.currentX + ", " + this.currentY + ")";
	if (this.currentHex) coord += ": " + this.currentHex.toString();

	var mapDiv = $("#mapDiv");
	var hexReport = "";
	if (this.currentHex) { hexReport = " id: " + this.currentHex.id + " x: " + this.currentHex.coordinate.x + " y: " + this.currentHex.coordinate.y; }
	coord += " map[" + mapDiv.width() + ", " + mapDiv.height() + "]" + hexReport;
	$("#mousePosition").html(coord);
};

WP.Map.prototype.displayMapUnitsInHexInfo = function (force) {
	if (this.currentHex) {
		if (!window.hexInfo) window.hexInfo = new WP.HexInfo();
		hexInfo.updateFor(this.currentHex, force);
	}
};

WP.Map.prototype.getHexAt = function (point) {
	for (var x = 0; x < this.hexes.length; x++) {
		var hex = this.hexes[x];
		if (!hex || !hex.pixelPoint) continue;
		if (point.x > hex.pixelPoint.x) {
			if (point.x < hex.pixelPoint.x + hex.width) {
				if (point.y > hex.pixelPoint.y + (hex.size / 4)) {
					if (point.y < hex.pixelPoint.y + (hex.size * 1.6)) {
						return hex;
					}
				}
			}
		}
	}
	return null;
};

WP.Map.prototype.handleHexClick = function () {
	if (game.hexControlDialogIsOpen) { hexControl.handleHexClick(this.currentHex); return; }

	var unit = game.selectedUnit;
	if (unit && unit.location == 1 && this.currentHex) {
		// this.placeUnitFromForcepool(unit, this.currentHex);
		this.placeUnitFrom(forcepool, unit, this.currentHex);
	}
	if (unit && unit.location == 3 && this.currentHex) {
		// this.placeUnitFromShipyard(unit, this.currentHex);
        this.placeUnitFrom(shipyard, unit, this.currentHex);
	}
	if (unit && unit.location == 4 && this.currentHex) {
        this.placeUnitFrom(taskforce, unit, this.currentHex);
		// this.placeUnitFromTaskforce(unit, this.currentHex);
	}
	else {
		this.selectUnit();
		if (game.selectedUnit) {
			this.dragging = true;
		}
	}


};

WP.Map.prototype.moveUnitTo = function (unit, hex) {
	if (unit.hex == hex) return;

	if (unit.hex) {
		var oldHex = unit.hex;
		oldHex.removeUnit(game.selectedUnit);
		//setTimeout(function () {
			oldHex.clear();
			oldHex.draw();
		//}, 0)
	}
	hex.addUnit(unit);
	hex.clear();
	hex.draw();
};

WP.Map.prototype.onDoubleClick = function () {
	var unit = game.selectedUnit;
	if (unit && unit.location == 1 && map.currentHex) {
		return;
	}
	game.setSelectedUnit(null);
	var map = game.currentMap;
	if (map.currentHex) {
		if (map.currentHex.units && map.currentHex.units.length > 1) {
			map.currentHex.rotateUnits();
			map.currentHex.draw();
			hexInfo.units = null;
			map.displayMapUnitsInHexInfo(true);
		}
	}
};

WP.Map.prototype.onMouseMove = function (e) {
	var map = game.currentMap;
	map.setCurrentHex(e);
	map.displayMapUnitsInHexInfo(false);
	map.displayCoordinates();

	if (game.selectedUnit && map.dragging && map.currentHex) {
		if (map.currentHex != game.selectedUnit.hex) {
			map.moveUnitTo(game.selectedUnit, map.currentHex);
		}
	}
};

WP.Map.prototype.onMouseDown = function () {
	var map = game.currentMap;
	if (game.state == 0) {
		map.handleHexClick();
	}
	else if (game.state == 1) {
		attrition.handleHexClick();
	}
};

WP.Map.prototype.onMouseUp = function () {
	//var point = getPoint('mapCanvas', e);
	var map = game.currentMap;
	map.dragging = false;
};

WP.Map.prototype.setCurrentHex = function (e) {
	var point = getPoint('mapCanvas', e);
	point.x += $("#mapDiv").scrollLeft();
	point.y += $("#mapDiv").scrollTop();

	this.currentX = point.x;
	this.currentY = point.y;
	this.currentHex = this.getHexAt(point);
};

WP.Map.prototype.selectUnit = function () {
	var unit = null;
	if (this.currentHex)
		unit = this.currentHex.getTopUnit();
	game.setSelectedUnit(unit);
};

WP.Map.Mouse.Util = {
	getRelativePosition: function (obj, x, y) {
		var curtop;
		var curleft = curtop = 0;

		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}

		if (document.body.scrollLeft > 0)
			var scrollLeft = document.body.scrollLeft;
		else
			scrollLeft = document.documentElement.scrollLeft;

		if (document.body.scrollTop > 0)
			var scrollTop = document.body.scrollTop;
		else
			scrollTop = document.documentElement.scrollTop;

		return [(x - curleft + scrollLeft), (y - curtop + scrollTop)];
	}
}
