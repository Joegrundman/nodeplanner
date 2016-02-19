'use strict';

/**
 *  WP.Country class holds all the information of a country -testing compile by jsdoc.conf.json and using opts and now also using npm to run the script
 */
WP.Country  = class {
    /**
     * Create a country
     */
    constructor () {
        /**
         * @property {number} id - id of country
         * @property {string} name - name of country
         * @property {number} ally - value shows allied status
         * @property {object} colonyOf - gives ruling power of this colony
         * @property {number} coalition - gives the coalition to which this country belongs (axis, western allied, russia)
         * @property {boolean} isOrganization - whether the country is an organization or not
         * @property {boolean} isMajorPower -  whether country is a major power (e.g. Germany, Russia) or not (e.g. Romania, Thailand)
         * @property {object} partOf - Not sure what this property is for
         * @property {boolean} pacific - whether the country is in the pacific theater (i think - not sure what this is for, or even if needed)
         * @property {color} backColor - the background color for this country's units
         * @property {color} foreColor - the foreground color for this country's units
         * @property {color} innerColor - the color to fill the inner shield (on e.g. infantry) on this country's units
         * @property {color} lineColor - the color used for drawing lines for this country's units
         * @property {color} shadow - the shadowing color for this country's units
         * @property {string} flagImage - the path to his country's flag image
         * @property {object} forcepoolGroupings - the different groups for this country's forcepool dialog
         * @property {object} colonies - the colonies that belong to this country
         * @property {object} units - the currently instantiated units that belong to this country
         * @property {object} codebreaking - the codebreaking cards and record held for this country (actually not sure about how this works)
         */
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
    
    /**
     * Build an instance of country
     * @static
     * countryBuilder
     * @param {number} id - The country id number
     * @param {string} name - the name of the country
     * @returns {object} a new country
     */
    
    static countryBuilder (id, name) {
        var country = new WP.Country();
		country.id = id;
		country.name = name;
		WP.Country.UI.Colors.setColors(country);
		return country;       
    }

    /**
     * Build an instance of forcepoolGrouping
     * @static
     * forcepoolGroupingBuilder
     * @param {number} id - The forcepoolGrouping id number
     * @param {string} name - the name of the forcepoolGrouping
     * @returns {object} a new forcepoolGrouping
     */    
    static forcepoolGroupingBuilder (id, name) {
        var grouping = new WP.ForcepoolGrouping();
		grouping.id = id;
		grouping.name = name;
		return grouping;
    }
    
    /**
     * sort algorithm by name
     * @static
     * sort
     * @param {object} a - object 'a' with name property
     * @param {object} b - object 'b' with name property
     * @returns {number} 1, 0 or -1 for sorting
     */
    static sort (a, b) {
        if (a.name > b.name) return 1;
		else if (a.name < b.name) return -1;
		return 0;
    }
   /**
    * adds a colony to the colonies array property
    */
    addColony (colony) {
        colony.colonyOf = this
        this.colonies.push(colony)
        colony.colonyOf = this
    }
   /**
    * adds a forcepoolGrouping to the forcepoolGroupings array property
    */    
    addForcepoolGrouping (grouping) {
        this.forcepoolGroupings.push(grouping)
    }
   /**
    * adds a unit to the units array property
    */    
    addUnit (unit) {
        this.units.push(unit)
        unit.owner = this
    }
  /**
    * gets a unit from the units array by id 
    * @param {number} id - id of the requested unit
    * @results {object} the requested unit or null
    */      
    getUnit (id) {
        var res = null
        this.units.forEach(u => {
            if (u.id === id) { res = u}
        })      
        if (res == null) { console.log("Game.getUnit: Unknown unit: " + id); }      
        return res
    }
    /**
     * removes a unit from the units array
     * @param {object} unit - the unit to be removed
     */
    removeUnit (unit) {
         this.units = this.units.filter(u => u != unit)
    }
    
    /**
     * converts the country name and id to a string
     * @returns {string} "USA(5)"
     */
    toString () {
        return this.name + " (" + this.id + ")"
    }
	
};



/**
 *  A group for the forcepool dialog
 */

WP.ForcepoolGrouping = class {
    /**
     * Create a forcepool group
     */
    constructor () {
        /**
         * @property {number} id - the id of the forcepoolGrouping
         * @property {string} name - the name of the forcepoolGrouping
         */
        this.id = -1;
        this.name = "unknown";       
    }
}
