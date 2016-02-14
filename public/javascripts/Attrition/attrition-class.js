'use strict';

WP.Attrition = class {
    constructor () {
        this.units = []
    }
    
    addUnit (unit) {
        if (!unit) { return }
        if (!unit.canBeCountedInAttrition()) { return }

        var foundUnit = this.units.some(u => u == unit)
        
        if (!foundUnit) {
            this.units.push(unit)
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
        var unitFound = false
        var j = 0;
        while (j < this.units.length) {
            if (this.units[j] == unit) {
                    this.units.splice(j, 1);
                    unitFound = true
                }
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
