'use strict';

WP.Country  = class {
    constructor () {
        this.id = -1;
        this.name = "unknown";
        this.ally = null;
        this.colonyOf = null;
        this.coalition = null;
        this.isOrganization = false;
        this.isMajorPower = false;
        this.partOf = null;
        this.pacific = false;

        this.backColor = null;
        this.foreColor = null;
        this.innerColor = null;
        this.lineColor = null;
        this.shadow = null;
        this.flagImage = null;

        this.forcepoolGroupings = [];
        this.colonies = []
        this.units = []
        this.codebreaking = null;
    }
    
    static countryBuilder (id, name) {
        var country = new WP.Country();
		country.id = id;
		country.name = name;
		WP.Country.UI.Colors.setColors(country);
		return country;       
    }
    
    static forcepoolGroupingBuilder (id, name) {
        var grouping = new WP.ForcepoolGrouping();
		grouping.id = id;
		grouping.name = name;
		return grouping;
    }
    
    static sort (a, b) {
        if (a.name > b.name) return 1;
		else if (a.name < b.name) return -1;
		return 0;
    }
    
    addColony (colony) {
        colony.colonyOf = this
        this.colonies.push(colony)
        colony.colonyOf = this
    }
    
    addForcepoolGrouping (grouping) {
        this.forcepoolGroupings.push(grouping)
    }
    
    addUnit (unit) {
        this.units.push(unit)
        unit.owner = this
    }
    
    getUnit (id) {
        var res = null
        this.units.forEach(u => {
            if (u.id === id) { res = u}
        })      
        if (res == null) { console.log("Game.getUnit: Unknown unit: " + id); }      
        return res
    }
    
    removeUnit (unit) {
         this.units = this.units.filter(u => u != unit)
    }
    
    toString () {
        return this.name + " (" + this.id + ")"
    }
	
};





WP.ForcepoolGrouping = class {
    constructor () {
        this.id = -1;
        this.name = "unknown";       
    }
}
