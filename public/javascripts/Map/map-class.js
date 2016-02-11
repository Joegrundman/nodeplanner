WP.Map = function (theater, id) {
    this.theater = theater
    this.width = 0
    this.height = 0
    this.currentX = 0
    this.currentY = 0
    this.id = id
    this.dragging = false
    this.hexes = null
    this.currentHex = null

    this.getHex = function (id) {
        return this.hexes[id]
    }
}

WP.Map.prototype.createHexes = function (id) {
    this.hexes = new Array();
    var i = 1;
    for (var x = 0; x < 51; x++) {
        for (var y = 0; y < 40; y++) {
            if ((id == 0) && (x == 50 && (y % 2 > 0)))
            { i++; continue; }
            this.hexes[i] = new WP.Hex(i, this, x, y);
            i++;
        }
    }
};


// first argument must be the dialog that currently holds the unit to be placed on the map
// ie taskforce, shipyard or forcepool
WP.Map.prototype.placeUnitFrom = function (dialog, unit, hex) {
    game.selectedUnit == null
    var stack = dialog.unitHolder.findStackContaining(unit)

    if (unit.type.toLowerCase() == "cruiser") {
        if (!ctrlPressed() && unit.strength > 2) {
            unit = unit.breakdownAndCreate(2);
        }
        else if (ctrlPressed() && unit.strength > 6) {
            unit = unit.breakdownAndCreate(6);
        }
        else {
            stack.removeUnit(unit);
        }
    }
    else if (unit.factorable && !ctrlPressed() && unit.strength > 1) {
        unit = unit.breakdownAndCreate(1);
    }
    else if (unit.factorable && ctrlPressed() && unit.strength > 5) {
        unit = unit.breakdownAndCreate(5);
    }
    else {
        stack.removeUnit(unit);
    }
    
    hex.addOrCombineUnit(unit);
    hex.clear();
    hex.draw();
    dialog.removeUnitFrom(dialog, unit) 
    
    game.setSelectedUnit(stack.getTopUnit());
    dialog.draw();

}

// end refactored

// WP.Map.prototype.placeUnitFromForcepool = function (unit, hex) {
//     game.selectedUnit = null;
//     var stack = forcepool.unitHolder.findStackContaining(unit);
//     if (unit.type.toLowerCase() == "cruiser") {
//         if (!ctrlPressed() && unit.strength > 2) {
//             unit = unit.breakdownAndCreate(2);
//         }
//         else if (ctrlPressed() && unit.strength > 6) {
//             unit = unit.breakdownAndCreate(6);
//         }
//         else {
//             stack.removeUnit(unit);
//         }
//     }
//     else if (unit.factorable && !ctrlPressed() && unit.strength > 1) {
//         unit = unit.breakdownAndCreate(1);
//     }
//     else if (unit.factorable && ctrlPressed() && unit.strength > 5) {
//         unit = unit.breakdownAndCreate(5);
//     }
//     else {
//         stack.removeUnit(unit);
//     }

//     hex.addOrCombineUnit(unit);
//     hex.clear();
//     hex.draw();

//     game.setSelectedUnit(stack.getTopUnit());
//     forcepool.draw();
// };

// WP.Map.prototype.placeUnitFromShipyard = function (unit, hex) {
//     game.selectedUnit = null;

//     var stack = shipyard.unitHolder.findStackContaining(unit);
//     if (unit.factorable && !ctrlPressed() && unit.strength > 1) {
//         unit = unit.breakdownAndCreate(1);
//     }
//     else if (unit.factorable && ctrlPressed() && unit.strength > 5) {
//         unit = unit.breakdownAndCreate(5);
//     }
//     else {
//         stack.removeUnit(unit);
//     }

//     hex.addOrCombineUnit(unit);
//     hex.clear();
//     hex.draw();
//     shipyard.removeUnitFromShipyard(shipyard, unit);
//     game.setSelectedUnit(stack.getTopUnit());

//     shipyard.draw();
// };

// WP.Map.prototype.placeUnitFromTaskforce = function (unit, hex) {
//     game.selectedUnit = null;

//     var stack = taskforce.unitHolder.findStackContaining(unit);
//     if (unit.factorable && !ctrlPressed() && unit.strength > 1) {
//         unit = unit.breakdownAndCreate(1);
//     }
//     else if (unit.factorable && ctrlPressed() && unit.strength > 5) {
//         unit = unit.breakdownAndCreate(5);
//     }
//     else {
//         stack.removeUnit(unit);
//     }

//     hex.addOrCombineUnit(unit);
//     hex.clear();
//     hex.draw();
//     taskforce.removeUnitFromTaskforce(taskforce, unit);
//     game.setSelectedUnit(stack.getTopUnit());

//     taskforce.draw();
// };
