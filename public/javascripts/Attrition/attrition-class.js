'use strict';

WP.Attrition = class {
    constructor () {
        this.units = []
    }
    
    addUnit (unit) {
        if (!unit) { return }
        if (!unit.canBeCountedInAttrition()) { return }
        var foundUnit = false
        var _this = this
        _this.units.forEach(u => {
            if (u == unit) {
                _this.removeUnit(unit)
                foundUnit = true
            }
        })
        
        if (!foundUnit) {
            _this.units.push(unit)
            unit.highlight = new WP.Color(255, 255, 72).toRgb()
        }
    }
    
    handleHexClick() {
 
        var map = game.currentMap
        var hex = map.currentHex
        var _this = this
        if (!hex) return;
        if (ctrlPressed()) {
            hex.units.forEach(u => _this.addUnit(u))
        } else {
            _this.addUnit(hex.getTopUnit());
        }
        hex.draw();
        this.refreshTotals();
    }
       
    removeUnit (unit) {
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
    
    refreshTotals () {
        var total = 0
        var countries = {}

        this.units.forEach(u => {
            if (countries[u.owner]) { countries[u.owner] += u.strength }
            else countries[u.owner] = u.strength
            total += u.strength
        })
        
        var details = "<table>"
        for (var cty in countries) {
		details += "<tr><td class='boldKey'>" + countries[cty] +
                 ":</td><td class='value'> " + cty + "</td></tr>";
        }
        details += "</table>";
        $("#attritionDetails").html(details);
        $("#attritionTotal").html(total);
    }
    
}

//  WP.Attrition.prototype.refreshTotals = function () {
// 	var total = 0;
// 	var countries = {};
// 	for (var i = 0; i < this.units.length; i++) {
// 		var unit = this.units[i];
// 		if (countries[unit.owner]) countries[unit.owner] += unit.strength;
// 		else countries[unit.owner] = unit.strength;
// 		total += unit.strength;
// 	}

// 	var details = "<table>";
// 	for (var cty in countries) {
// 		details += "<tr><td class='boldKey'>" + countries[cty] + ":</td><td class='value'> " + cty + "</td></tr>";
// 	}
// 	details += "</table>";
// 	$("#attritionDetails").html(details);
// 	$("#attritionTotal").html(total);
// }


// WP.Attrition = function() {
// 	this.units = new Array();
// }

// WP.Attrition.prototype.addUnit = function (unit) {
// 	if (!unit) return;
// 	if (!unit.canBeCountedInAttrition()) return;
// 	var foundUnit = false;
// 	for (var i = 0; i < this.units.length; i++) {
// 		if (this.units[i] == unit) {
// 			this.removeUnit(unit);
// 			foundUnit = true;
// 			break;
// 		}
// 	}

// 	if (!foundUnit) {
// 		this.units.push(unit);
// 		unit.highlight = new WP.Color(255, 255, 72).toRgb();
// 	}
// }

// WP.Attrition.prototype.handleHexClick = function () {
// 	var map = game.currentMap;
// 	var hex = map.currentHex;
// 	if (!hex) return;
// 	if (ctrlPressed()) {
// 		// for (var i = 0; i < hex.units.length; i++) {
// 		// 	this.addUnit(hex.units[i]);
// 		// }
//         hex.units.forEach(u => this.addUnit(u))
// 	}
// 	else {
// 		this.addUnit(hex.getTopUnit());
// 	}
// 	hex.draw();
// 	this.refreshTotals();
// }

// WP.Attrition.prototype.removeUnit = function (unit) {
// 	if (!unit) return;
// 	var j = 0;
// 	while (j < this.units.length) {
// 		if (this.units[j] == unit)
// 			this.units.splice(j, 1);
// 		else
// 			j++;
// 	}
// 	unit.highlight = null;
// }