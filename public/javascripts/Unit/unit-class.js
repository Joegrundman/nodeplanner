'use strict';

/**
 * Represents a WP.Unit any of Air, naval, ground, misc. E.g. battleship, beach defense, infantry, aaf
 * @class
 */
WP.Unit = class {
    /**
     * Create a unit
     */
    constructor () {
       /**
        * @property {number} id - id of the unit 
        * @property {number} fpg - current forcepool grouping containing unit (if any) 
        * @property {string} type - type of unit (e.g. destroyer, armor, bomber)
        * @property {string} name - name of unit e.g. Tirpitz
        * @property {number} size - pixel width and height of unit
        * @property {boolean} factorable - unit can have variable strength, can be combined and broken down
        * @property {number} strength - strength of unit (in factors)
        * @property {number} movement - number of open hexes that a unit can move, or range for air units
        * @property {number} location - location of unit. 1 = map, 2 = forcepool
        * @property {object} hex - current hex object holding unit
        * @property {string} image - path to image src, if needed
        * @property {object} owner - country object to which unit belongs
        * @property {object} taskforceOwner - taskforce object to which unit belongs
        * @property {object} yard - shipyard object to which unit belongs
        * @property {number} holderX - x-axis address of unit in taskforce or shipyard
        * @property {number} holderY - y-axis address of unit in taskforce or shipyard
        * @property {boolean} damaged - if unit is damaged
        * @property {boolean} highlight - whether the unit is highlighted currently
        * @property {boolean} eliminated - whether the unit is marked as eliminated
        * @property {boolean} slow - whether unit is a slow ship
        * @property {boolean} sunk - whether unit is a sunk ship
        * @property {boolean} inverted - whether unit is an inverted air or naval unit
        * @property {boolean} exploiting - whether unit is an exploiting armor unit
        * @property {boolean} isolated - whether unit is currently isolated and marked for elimination
        */
        this.id = -1;
        this.fpg = 0;
        this.type = null;
        this.name = null;
        this.size = 41;
        this.factorable = false;

        this.strength = 0;
        this.movement = 0;

        this.location = 0;

        this.hex = null;
        this.image = null;
        this.owner = null;

        this.taskforceOwner = null;
        this.yard = null;
        this.holderX = null;
        this.holderY = null;

        this.damaged = false;
        this.eliminated = false;
        this.highlight = null;
        this.slow = false;
        this.sunk = false;
        this.inverted = false;
        this.exploiting = false;
        this.isolated = false;
    }
    
    /**
     * Build an instance of unit 
     * @static
     * unitBuilder
     * @param {number} id - The unit id number
     * @param {number} fpg - the forcepool grouping that currently contains the unit
     * @param {string} type - the unit type
     * @param {string} name - name of unit, printed on side
     * @param {number} strength - the factor strength of the unit
     * @param {number} movement - the movement value if land unit, range if an air unit
     * @param {number} location - indicates current location of unit. 1 = forcepool, 2 = map, 3 = taskforce
     * @param {boolean} slow - indicates whether unit is slow for marking with orange band (old BB3 battleships only, CVE's which are also slow have separate coloring)
     * @param {boolean} sunk - shows whether a ship(only) is to be marked as sunk
     * @param {boolean} damaged - shows whether a unit is to be marked as damaged
     * @param {boolean} inverted - shows whether unit (air or naval) is to be marked as inverted 
     * @param {boolean} exploiting - shows whether armor(only) unit is currently exploiting
     * @param {boolean} isolated - shows whether unit is marked as isolated, and subject to end of turn elimination if supply not reestablished
     * @param {boolean} factorable - indicates whether unit can be combined or broken down into different strength factors
     * @returns {object} an instance of the Unit class
     */

    
    static unitBuilder (id, fpg, type, name, strength, moves, location, slow, sunk, damaged, inverted, exploiting, isolated) {
        var unit = new WP.Unit();
		unit.id = id;
		unit.fpg = fpg;
		unit.type = type;
		unit.name = name;
		unit.strength = strength;
		unit.movement = moves;
		unit.location = location;
		unit.slow = slow;
		unit.sunk = sunk;
		unit.damaged = damaged;
		unit.inverted = inverted;
		unit.exploiting = exploiting;
		unit.isolated = isolated;

		switch (type.toLowerCase()) {
			case "aaf":
			case "aas-attack":
			case "aas-cover":
			case "aas-search":
			case "advsub":
			case "airtransport": case "at":
			case "asw":
			case "avg":
			case "bomber":
			case "pacificbomber":
			case "partialsupply":
			case "cruiser":
			case "cve":
			case "damage":
			case "destroyer": case "dd":
			case "enas": case "elitenas":
			case "flak":
			case "grant":
			case "ic":
			case "interceptor":
			case "isolation":
			case "jet":
			case "kamikaze":
			case "nas":
			case "oil":
			case "oilplant":
			case "sub":
			case "transport": case "tr":
				unit.factorable = true;
				break;
			default:
				unit.factorable = false;
				break;
		}
		return unit;
	}
    /**
     * Checks to see if unit can be counted toward attrition totals
     * @returns {boolean}
     */
    
    canBeCountedInAttrition () {
        if (this.factorable) return false;
        if (this.strength < 1) return false;
        switch (this.type.toLowerCase()) {
            case "airborne":
            case "armor": case "arm":
            case "chindit":
            case "commando":
            case "infantry": case "i":
            case "marine":
            case "mechanized": case "mech":
                return true;
            default: return false;
        }
	return false;
    }
    
     /**
     * Checks to see if unit can be damaged
     * @returns {boolean}
     */
    
    canBeDamaged () {
        switch (this.type.toLowerCase()) {
            case "battleship": case "bb": case "b": case "bc":
            case "carrier": case "cv": case "cve":
            case "transport": case "tr":
            case "cruiser":
            case "cve":
            case "destroyer": case "dd":
            case "oilplant":
            case "fortress":
            case "ic":
            return true;
		default: return false;
	   }
    }
    
    /**
     * Checks to see if unit can be inverted
     * @returns {boolean}
     */
    
    canBeInverted () {
        switch (this.type.toLowerCase()) {
            case "battleship": case "bb": case "b": case "bc":
            case "carrier": case "cv": case "cve":
            case "transport": case "tr":
            case "cruiser":
            case "cve":
            case "destroyer": case "dd":
            case "aaf":
            case "nas":
            case "enas":
            case "kamikaze":
            case "sub":
            case "advsub":
            case "aas-cover":
            case "aas-attack":
            case "aas-search":
            case "avg":
            case "bomber":
            case "interceptor":
            case "oil":
            case "jet":
            case "jetsquadron":
            case "taskforce":
			return true;
		default: return false;
	   }
    }
     /**
     * Checks to see if unit can be marked as isolated
     * @returns {boolean}
     */
    canBeIsolated () {
        switch (this.type.toLowerCase()) {
            case "infantry": case "i":
            case "mechanized": case "mech":
            case "armor": case "arm":
            case "airborne":
            case "marine":
            case "chindit":
            case "commando":
            case "replacement":case "rep":
                return true;
            default: return false;
        }
    }
    
    /**
     * Checks to see if unit can be sunk
     * @returns {boolean}
     */
    
    canSink () {
      	switch (this.type.toLowerCase()) {
            case "battleship": case "bb": case "b": case "bc": case "pb":
            case "carrier": case "cv": case "cve":
            case "transport":
            case "cruiser":
            case "cve":
            case "destroyer": case "dd":
                return true;
            default: return false;
        }
        return false;         
    }
    
    /**
     * changes a unit by breaking down an old unit and creating a new unit
     * @param {number} size - strength of the new unit to be created
     * @returns {object}
     */
           
    breakdownAndCreate (size) {
        if (size >= this.strength) return;
        var oldUnit = this;
        oldUnit.strength -= size;
        var unit = WP.Unit.unitBuilder(this.id, this.fpg, this.type, this.name, size | 0, this.movement, this.location, this.slow, this.sunk, this.damaged, this.inverted);
        oldUnit.owner.addUnit(unit);
        return unit;
    }

    /**
     * checks to see if two units can be combined
     * @param {object} unit - additional unit that this unit is compared with
     * @returns {boolean}
     */    
    canCombineWith (unit) {
        if (unit == this) { return false }
        if (!unit.factorable) { return false }
        if (unit.type != this.type) {
            var trans = /^tr$|transport/ 
            if (!(trans.test(unit.type) || !(trans.test(this.type))))
            return false }
        if (unit.type == "ASW" || unit.type == "transport" || unit.type == "tr") {
            var alliesPattern = /US|Britain/
            if (alliesPattern.test(unit.owner.name) && alliesPattern.test(this.owner.name)) {
                return true
            }
        }
        if (unit.owner != this.owner) { return false;}
        return true;
    }
    
    /**
     * checks to see if unit can exploit
     * @returns {boolean}
     */
    
    canExploit (){
       if (this.type == "armor" || "arm") return true;
	   return false;       
    }

    /**
     * checks to see if this.unit is in one of a group of passed stacks
     * @param {Array} stacks - array of stacks to be searched to match this unit 
     * @returns {number} identifying number for stack
     */
    findStackThatMatches (stacks) {
        var res = -1
        var _this = this
        stacks.forEach((stack, i) => {
            if (_this.unitTypeExistsInStack(stack)) { res = i }
         })
        return res
    }


    /**
     * searches stacks to find if a unit with the same address is in
     * @param {object} stacks - array of stacks to be searched for unit address
     * @returns {number} identifying number for stack
     */    
    findStackWithSameAddress (stacks) {
        var res = -1
        var _this = this
        stacks.forEach((stack, i) => {
            if (_this.unitHasSameAddress(stack)) { res = i }
        })
        return res
    }
    /**
     * checks to see if unit is in forcepool
     * @returns {boolean}
     */
    
    inForcepool () {
        if (this.location == 1) { return true }
        return false
    }

    /**
     * checks to see if unit is on map
     * @returns {boolean}
     */
    onMap () {
        if (this.location == 2) { return true }
        return false
    }
    /**
     * returns unit to forcepool
     */    
    returnToForcepool () {
        this.location = 1
        this.fpg = 0

        if (this.factorable) {
            for (var i = 0; i < this.owner.units.length; i++) {
                var unit = this.owner.units[i]
                if (unit == this) continue
                if (unit.location != 1 || unit.fpg != 0) continue
                if (unit.canCombineWith(this)) {
                    unit.strength += this.strength
                    this.owner.removeUnit(this)
                    break
                }
            }
        }
    }

    /**
     * sets shipyardaddress on unit 
     * @param {object} yard - the shipyard that the unit is currently in
     * @param {number} x - the column of the shipyard 
     * @param {number} y - the row of the shipyard 
     */
    setShipyardAddress (yard, x, y){
       this.yard = yard
	   this.holderX = x
	   this.holderY = y
    }

    /**
     * sets taskforceaddress on unit 
     * @param {object} tfOwner - the owning power of the taskforce display
     * @param {number} x - the column of the taskforce 
     * @param {number} y - the row of the taskforce 
     */    
    setTaskforceAddress (tfOwner, x, y) {
        this.taskforceOwner = tfOwner
        this.holderX = x
        this.holderY = y
    }
    /**
     * searches stack to find if a unit with the same address as this.unit is in
     * @param {object} stack  stack to be searched for unit matching address
     * @returns {boolean}
     */      
    unitHasSameAddress (stack) {
        var _this = this
        return stack.units.some(unit => (unit.holderX == _this.holderX) && (unit.holderY == _this.holderY))
    }
    /**
     * searches stack to find if a unit with the same type as this.unit is in
     * @param {object} stack  stack to be searched for unit matching type
     * @returns {boolean}
     */     
    unitTypeExistsInStack (stack) {
        var _this = this
        return stack.units.some(unit => (unit.type == _this.type) && (unit.strength = _this.strength))
    }
    
}
