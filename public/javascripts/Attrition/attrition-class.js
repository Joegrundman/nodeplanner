'use strict';
/**
 * WP.Attrition class defines the attrition object which is created each time the attrition button is pressed
 */
WP.Attrition = class {
    /**
     * Create an attrition object
     */
    constructor () {
        /**
         * @property {object} units - array of units currently counted towards the attrition total
         */
        this.units = []
    }
    /**
     * Adds a unit to the attrition array
     * @param {object} unit - the unit to be added and counted towards attrition total
     */
    addUnit (unit) {
        if (!unit) { return }
        if (!unit.canBeCountedInAttrition()) { return }

        var foundUnit = this.units.some(u => u == unit)
        
        if (!foundUnit) {
            this.units.push(unit)
            unit.highlight = new WP.Color(255, 255, 72).toRgb()
        }
    }
    /**
     * handles the onmouseclick event, sending units to be added to the units array
     */
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
    
    /**
     * removes unit from the attrition units array
     * @param {object} unit - the unit to be removed from the attrition units array
     */
       
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
    
    /**
     * refreshes the calculated attrition total and displays the result on the dialog
     */
    
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
