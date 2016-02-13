/* global getPoint */
/* global $ */
/* global shipyard */
'use strict';

WP.ShipyardUnit = class {
    constructor () {
        this.id = null;
        this.x = null;
        this.y = null;
    }
    
    static shipyardUnitBuilder (id, x, y) {
        var shipyardUnit = new WP.ShipyardUnit();
		shipyardUnit.id = id;
		shipyardUnit.x = x;
		shipyardUnit.y = y;
		return shipyardUnit;
    }
}


// WP.Shipyard.prototype.handleShipyardSelected = function (id) {
// 	var shipyard = game.getShipyards(id);
// 	var ctyName = shipyard.owner;
// 	var cty = game.getCountryFromName(ctyName);
// 	var rate = shipyard.rate;
// 	var capacity;
// 	if (((shipyard.name == "Atlantic") || (shipyard.name == "Pacific")) && (rate <= 5)) { capacity = 10; }
// 	else { capacity = rate * 2; }
// 	$("#syCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
// 	$("#syRate").html(rate);
// 	$("#syCapacity").html(capacity);
// 	shipyard.draw();
// }

// WP.Shipyard.prototype.changeRateUp = function (id) {
// 	var shipyard = game.getShipyards(id);
// 	shipyard.rate++;
// 	shipyard.handleShipyardSelected(id);
// }

// WP.Shipyard.prototype.changeRateDown = function (id) {
// 	var shipyard = game.getShipyards(id);
// 	shipyard.rate--;
// 	shipyard.handleShipyardSelected(id);
// }

// WP.Shipyard.prototype.onMouseDown = function (e) {
// 	var point = getPoint('shipyardCanvas', e);
// 	var stack = shipyard.unitHolder.findStackFor(point.x, point.y);
// 	if (stack) {
// 		game.setSelectedUnit(stack.getTopUnit());
// 		shipyard.unitHolder.drawStack(stack);
// 		shipyard.dragging = true;
// 	}
// 	else {
// 		game.setSelectedUnit(null);
// 	}
// }

// WP.Shipyard.prototype.onDoubleClick = function () {
// 	var unit = game.selectedUnit;
// 	var stack = shipyard.unitHolder.findStackContaining(unit);
// 	if (!stack) { return; }
// 	game.setSelectedUnit(null);
// 	if (stack.units.length > 1) {
// 		stack.rotateUnits();
// 		shipyard.unitHolder.drawStack(stack);
// 	}
// }


// WP.Shipyard.prototype.onMouseMove = function (e) {
// 	shipyard.setCurrentSquare(e);
// 	if (game.selectedUnit  && shipyard.dragging == true) {
// 		var unit = game.selectedUnit;
// 		if ((shipyard.currentSquareX != unit.holderX) || (shipyard.currentSquareY != unit.holderY)) {
// 			shipyard.moveUnit(unit);
// 		}
// 	}
// };

// WP.Shipyard.prototype.onMouseUp = function () {
// 	shipyard.dragging = false;
// }

// WP.Shipyard.prototype.setCurrentSquare = function (e) {
// 	var point = getPoint('shipyardCanvas', e);
// 	this.currentSquareX = Math.floor((point.x - 10) / 66);
// 	this.currentSquareY = Math.floor((point.y - 30) / 66);
// 	if (this.currentSquareY < 0) this.currentSquareY = 0;
// 	if (this.currentSquareX < 0) this.currentSquareX = 0;
// 	if ((this.currentSquareX < 1) && (this.currentSquareY < 5)) this.currentSquareX = 1;
// }

// WP.Shipyard.prototype.moveUnit = function (unit) {
// 	var stack = shipyard.unitHolder.findStackContaining(unit);
// 	stack.removeUnit(unit);
// 	unit.holderX = shipyard.currentSquareX;
// 	unit.holderY = shipyard.currentSquareY;
// 	shipyard.updateShipyardUnitAddress(unit);
// 	shipyard.unitHolder.drawShipyard();

// }
