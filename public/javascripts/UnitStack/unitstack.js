/* global WP */
'use strict';

/**
 * A unit stack is an array of units that will be drawn one on top of the other
 */
WP.UnitStack = class {
    /**
     * Create a unit stack
     */
    constructor() {
        /**
         * @property {number} x - x coordinate
         * @property {number} y - y coordinate
         * @property {object} units - array of units
         */
        this.x = 0
        this.y = 0
        this.units = []
    }
    /**
     * gets the top unit from the unit stack
     * @returns {object} top unit
     */
    getTopUnit () {
        if (!this.units) { return null } 
        return this.units[this.units.length - 1]
    }
    /**
     * removes unit from the unit stack
     * @param {object} the unit to be removed
     */    
    removeUnit (unit) {
        this.units = this.units.filter(u => u != unit)
    }
    /**
     * adds unit to the unit stack
     * @param {object} the unit to be added
     */     
    addUnit (unit) {
        if (!unit) return;
        this.units.push(unit);
        unit.stack = this;
    }
    /**
     * rotates units in the unit stack
     */ 
    rotateUnits () {
        var unit = this.units.shift();
        this.addUnit(unit);
    }
}
