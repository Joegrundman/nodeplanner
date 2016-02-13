'use strict';

WP.Shipyard = class {
    constructor () {
     	this.id = null;
        this.name = null;
        this.owner = null;
        this.rate = null;
        this.unitHolder = null;
        this.shipyardUnits = [];
        this.currentSquareX = null;
        this.currentSquareY = null;
        this.dragging = false;   
    }
    
    static shipyardBuilder (id, name, owner, rate) {
        var shipyard = new WP.Shipyard();
		shipyard.id = id;
		shipyard.name = name;
		shipyard.owner = owner;
		shipyard.rate = rate;
		return shipyard;
    }
    
    addShipyardUnit (shipyardUnit) {
        this.shipyardUnits.push(shipyardUnit)
    }
    
    removeUnitFrom (shipyard, unit) {
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
    
    updateShipyardUnitAddress (unit) {
        var shipyard = game.getShipyardFromUnit(unit.id);
        for (var i = 0; i < shipyard.shipyardUnits.length; i++) {
            if (shipyard.shipyardUnits[i].id == unit.id) {
                shipyard.shipyardUnits[i].x = unit.holderX;
                shipyard.shipyardUnits[i].y = unit.holderY;
            }
        }
    }
    
    handleShipyardSelected (id) {
        var shipyard = game.getShipyards(id);
        var ctyName = shipyard.owner;
        var cty = game.getCountryFromName(ctyName);
        var rate = shipyard.rate;
        var capacity;
        if (((shipyard.name == "Atlantic") || (shipyard.name == "Pacific")) && (rate <= 5)) { capacity = 10; }
        else { capacity = rate * 2; }
        $("#syCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
        $("#syRate").html(rate);
        $("#syCapacity").html(capacity);
        shipyard.draw();
    }
    
    changeRateUp (id) {
        var shipyard = game.getShipyards(id);
        shipyard.rate++;
        shipyard.handleShipyardSelected(id);
    }
    
    changeRateDown (id) {
        var shipyard = game.getShipyards(id);
        shipyard.rate--;
        shipyard.handleShipyardSelected(id);        
    }
    
    onMouseDown (e) {
        var point = getPoint('shipyardCanvas', e);
        var stack = shipyard.unitHolder.findStackFor(point.x, point.y);
        if (stack) {
            game.setSelectedUnit(stack.getTopUnit());
            shipyard.unitHolder.drawStack(stack);
            shipyard.dragging = true;
        }
        else {
            game.setSelectedUnit(null);
        }
    }
    
    onDoubleClick () {
        var unit = game.selectedUnit;
        var stack = shipyard.unitHolder.findStackContaining(unit);
        if (!stack) { return; }
        game.setSelectedUnit(null);
        if (stack.units.length > 1) {
            stack.rotateUnits();
            shipyard.unitHolder.drawStack(stack);
        }        
    }
    
    onMouseMove (e) {
        shipyard.setCurrentSquare(e);
        if (game.selectedUnit  && shipyard.dragging == true) {
            var unit = game.selectedUnit;
            if ((shipyard.currentSquareX != unit.holderX) || (shipyard.currentSquareY != unit.holderY)) {
                shipyard.moveUnit(unit);
            }
        }
    }
    
    onMouseUp () {
        shipyard.dragging = false
    }
    
    setCurrentSquare (e) {
        var point = getPoint('shipyardCanvas', e);
        this.currentSquareX = Math.floor((point.x - 10) / 66);
        this.currentSquareY = Math.floor((point.y - 30) / 66);
        if (this.currentSquareY < 0) this.currentSquareY = 0;
        if (this.currentSquareX < 0) this.currentSquareX = 0;
        if ((this.currentSquareX < 1) && (this.currentSquareY < 5)) this.currentSquareX = 1;        
    }
    
    moveUnit (unit) {
        var stack = shipyard.unitHolder.findStackContaining(unit);
        stack.removeUnit(unit);
        unit.holderX = shipyard.currentSquareX;
        unit.holderY = shipyard.currentSquareY;
        shipyard.updateShipyardUnitAddress(unit);
        shipyard.unitHolder.drawShipyard();
    }
    
    draw () {
        var syd = game.getShipyards($('#syYard').val());
        var cty = game.getCountryFromName(syd.owner);
        var units = []
      	var holder = WP.UnitHolder.unitHolderBuilder(shipyardCtx, $("#syDetails"));
    
        syd.shipyardUnits.forEach(syUnit => {
            var unit = game.getUnitForShipyard(syUnit.id, syUnit.x, syUnit.y)
            units.push(unit)
        })
        
        holder.units = units;
        holder.drawShipyard();
        shipyard.unitHolder = holder;
    }
}








// WP.Shipyard = function () {
// 	this.id = null;
// 	this.name = null;
// 	this.owner = null;
// 	this.rate = null;
// 	this.unitHolder = null;
// 	this.shipyardUnits = new Array();
// 	this.currentSquareX = null;
// 	this.currentSquareY = null;
// 	this.dragging = false;
// }

// WP.Shipyard.Util = {

// 	shipyardBuilder: function (id, name, owner, rate) {
// 		var shipyard = new WP.Shipyard();
// 		shipyard.id = id;
// 		shipyard.name = name;
// 		shipyard.owner = owner;
// 		shipyard.rate = rate;
// 		return shipyard;
// 	}
    
// }

// WP.Shipyard.prototype.addShipyardUnit = function (shipyardUnit) {
// 	this.shipyardUnits.push(shipyardUnit);
// 	//shipyardUnit.owner = this;
// }

// // WP.Shipyard.prototype.removeUnitFromShipyard = function (shipyard, unit) {
// // 	shipyard = game.getShipyardFromUnit(unit.id);
// // 	var j = 0;
// // 	while (j < shipyard.shipyardUnits.length) {
// // 		if (shipyard.shipyardUnits[j].id == unit.id) {
// // 			shipyard.shipyardUnits.splice(j, 1);
// // 		}
// // 		else {
// // 			j++;
// // 		}
// // 	}

// // }

// WP.Shipyard.prototype.removeUnitFrom = function (shipyard, unit) {
// 	shipyard = game.getShipyardFromUnit(unit.id);
// 	var j = 0;
// 	while (j < shipyard.shipyardUnits.length) {
// 		if (shipyard.shipyardUnits[j].id == unit.id) {
// 			shipyard.shipyardUnits.splice(j, 1);
// 		}
// 		else {
// 			j++;
// 		}
// 	}

// }

// WP.Shipyard.prototype.updateShipyardUnitAddress = function (unit) {
// 	var shipyard = game.getShipyardFromUnit(unit.id);
// 	for (var i = 0; i < shipyard.shipyardUnits.length; i++) {
// 		if (shipyard.shipyardUnits[i].id == unit.id) {
// 			shipyard.shipyardUnits[i].x = unit.holderX;
// 			shipyard.shipyardUnits[i].y = unit.holderY;
// 		}
// 	}
//     // var syUnits = game.getShipyardFromUnit(unit.id).shipyardUnits
//     // syUnits.forEach(su => {
//     //     if (su.id == unit.id) {
//     //         su.x = unit.holderX
//     //         su.y = unit.holderY
//     //     }
//     // })
// }


// WP.ShipyardUnit = function () {
// 	this.id = null;
// 	this.x = null;
// 	this.y = null;
// }

// WP.ShipyardUnit.Util = {

// 	shipyardUnitBuilder: function (id, x, y) {
// 		var shipyardUnit = new WP.ShipyardUnit();
// 		shipyardUnit.id = id;
// 		shipyardUnit.x = x;
// 		shipyardUnit.y = y;
// 		return shipyardUnit;
// 	}

// }
