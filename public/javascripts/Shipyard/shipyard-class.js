'use strict';
/**
 * creates a WP.Shipyard, a container handling construction and repair of ships
 * @class
 */
WP.Shipyard = class {
    /**
     * Create a shipyard
     */
    constructor () {
       /**
        * @property {number} id -identification code of the shipyard
        * @property {string} name - name of the shipyard
        * @property {object} owner - country object to which shipyard belongs
        * @property {number} rate - shipbuilding rate (ship advances(or new keels laid down)/turn)of the shipyard
        * @property {object} unitHolder - currently instantiated holder object for the stacks of units in the shipyard
        * @property {array} shipyardUnits - naval units currently in the shipyard
        * @property {number} currentSquareX - x coordinate(of shipyard grid) of the currently selected unit
        * @property {number} currentSquareY - y coordinate(of shipyard grid) of the currently selected unit
        * @property {boolean} dragging - whether the currently selected unit can be dragged
        */
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
    /**
     * Build an instance of shipyard
     * @static
     * shipyardBuilder
     * @param {number} id - the shipyard id number
     * @param {string} name - the shipyard name e.g. Glasgow
     * @param {object} owner - the country to which the shipyard belongs
     * @param {number} rate - the number of ship advances per turn that can be handled, linked to shipard capacity
     * @returns {object} Instance of shipyard
     */    
    static shipyardBuilder (id, name, owner, rate) {
        var shipyard = new WP.Shipyard();
		shipyard.id = id;
		shipyard.name = name;
		shipyard.owner = owner;
		shipyard.rate = rate;
		return shipyard;
    }
    /**
     * Adds a unit to the shipyard
     * @param {object} shipyardUnit - the unit to be added to the shipyard
     */    
    addShipyardUnit (shipyardUnit) {
        this.shipyardUnits.push(shipyardUnit)
    }
    /**
     * Removes a unit from the shipyard
     * @param {object} shipyard - this shipyard instance from which the unit will be removed
     * @param {object} unit - the unit to be removed from the shipyard
     */     
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
     /**
     * Updates the current address of the unit in the shipyard to match the address of the unit
     * @param {object} unit - the unit to which the shipyard address must be matched
     */    
    updateShipyardUnitAddress (unit) {
        var shipyard = game.getShipyardFromUnit(unit.id);
        for (var i = 0; i < shipyard.shipyardUnits.length; i++) {
            if (shipyard.shipyardUnits[i].id == unit.id) {
                shipyard.shipyardUnits[i].x = unit.holderX;
                shipyard.shipyardUnits[i].y = unit.holderY;
            }
        }
    }
    /**
     * Upon selecting a shipyard, this function draws a new flag and updates details
     * @param {number} id -  the id of the shipyard
     */    
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
    /**
     * Increments the shipyard building rate
     * @param {number} id -  the id of the shipyard
     */     
    changeRateUp (id) {
        var shipyard = game.getShipyards(id);
        shipyard.rate++;
        shipyard.handleShipyardSelected(id);
    }
    /**
     * Decrements the shipyard building rate
     * @param {number} id -  the id of the shipyard
     */      
    changeRateDown (id) {
        var shipyard = game.getShipyards(id);
        shipyard.rate--;
        shipyard.handleShipyardSelected(id);        
    }
    /**
     * Upon clicking the mouse button, this function finds the unit in the shipyard display under the mouse cursor
     * @param {object} e -  the mouse event object
     */     
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
    /**
     * Upon double clicking the mouse, this function rotates the units in the stack under the mouse cursor
     */     
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
    /**
     * Upon moving the mouse, this function drags the currently selected unit
     * @param {object} e - the mouse event object
     */     
    onMouseMove (e) {
        shipyard.setCurrentSquare(e);
        if (game.selectedUnit  && shipyard.dragging == true) {
            var unit = game.selectedUnit;
            if ((shipyard.currentSquareX != unit.holderX) || (shipyard.currentSquareY != unit.holderY)) {
                shipyard.moveUnit(unit);
            }
        }
    }
    /**
     * Upon letting go of the mouse button, this function stops dragging the currently selected unit
     */     
    onMouseUp () {
        shipyard.dragging = false
    }
     /**
     * Upon moving the mouse, this function finds the shipyard square currently under the cursor
     * @param {object} e - the mouse event object
     */   
    setCurrentSquare (e) {
        var point = getPoint('shipyardCanvas', e);
        this.currentSquareX = Math.floor((point.x - 10) / 66);
        this.currentSquareY = Math.floor((point.y - 30) / 66);
        if (this.currentSquareY < 0) this.currentSquareY = 0;
        if (this.currentSquareX < 0) this.currentSquareX = 0;
        if ((this.currentSquareX < 1) && (this.currentSquareY < 5)) this.currentSquareX = 1;        
    }
    /**
     *  Updates the unit address to match its location after being dragged
     * @param {object} unit - the unit that has been moved
     */    
    moveUnit (unit) {
        var stack = shipyard.unitHolder.findStackContaining(unit);
        stack.removeUnit(unit);
        unit.holderX = shipyard.currentSquareX;
        unit.holderY = shipyard.currentSquareY;
        shipyard.updateShipyardUnitAddress(unit);
        shipyard.unitHolder.drawShipyard();
    }
    /**
     * Draws the units onto the shipyard display
     */    
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
