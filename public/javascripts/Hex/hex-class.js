'use strict';
/**
 * creates a WP.Hex. This object has the details of the hex, from terrain, cities, ports and map location and dimensions, to owning country, and units on it
 */


WP.Hex = class {
    
    /**
     * Create a hex object
     */
    
    constructor (id, map, x, y) {
        /**
        * @property {number} id -identification code of the hex
        * @property {object} map - the map object to which the hex belongs
        * @property {string} letter - alphabetical part of the hex address (eg the K in  hex: K23)
        * @property {number} number - numerical part of the hex address (ed the 23 in hex: K23)
        * @property {number} size - value for determining hex size and boundaries
        * @property {number} width - value for determining hex width and boundaries
        * @property {object} owner - country object currently controlling this hex
        * @property {string} cityName - name of city on this hex(e.g. Cologne)
        * @property {boolean} isPort - whether the hex is a port (e.g. Oran)
        * @property {boolean} isCapital - whether the hex is a capital city (e.g. Paris)
        * @property {boolean} isBeach - whether the hex has a beach (e.g. Bergen)
        * @property {boolean} isTerrain - whether the hex has terrain features (e.g. mountains)
        * @property {boolean} isIsland - whether the hex is a one-hex island (e.g Guadalcanal)
        * @property {array} units - the units currently on this hex
        * @property {object} coordinate - coordinates of hex 
        * @property {object} pixelPoint - coordinates within hex for positioning text
        * @property {object} unitStartPoint - coordinates within hex for placing first unit
        * @property {imagee} background - piece of the main map that shows hex background
        * @property {image} largeBackground - large piece of the main map to be used as hex background
        * @property {call} setZoom - calls WP.Hex.UI.setHexZoom
        * @property {function} toString - takes letter and number and returns a string for the hex address (eg K23)
        */       
        this.id = id;
        this.map = map;
        this.letter = "A";
        this.number = 0;
        this.size = 36.45; // 47.3;
        this.width = 0;
        this.owner = null;
        this.cityName = null;
        this.isPort = null;
        this.isCapital = null;
        this.isBeach = null;
        this.isTerrain = null;
        this.isIsland = null;
        this.units = new Array();
        this.coordinate = new Point(x, y);
        this.pixelPoint = new Point(x, y);
        this.unitStartPoint = new Point(x, y);
        this.background = null;
        this.largeBackground = null;
        this.setZoom = WP.Hex.UI.setHexZoom;

        this.toString = function () {
            return this.letter + this.number.toString();
        }

        WP.Hex.setAttributes(this);
    }
    /**
     * Assign the values of letter and number to make up the hex address (eg K23)
     * @static
     * setAttributes
     * @param {object} hex- the hex object
     */
    static setAttributes(hex) {
        hex.letter = Convert.toAscii(hex.coordinate.y)
        hex.number = hex.coordinate.x + 16
        hex.number -= Math.floor(hex.coordinate.y / 2)
    }
    /**
     * Adds a unit to the hex.units array
     * @param {object} unit - the unit to be added
     */
    addUnit (unit) {
        if (!unit) return;
        this.units.push(unit)
        unit.location = 2;
        unit.hex = this;
    }
    /**
     * Adds or combines units when unit placed onto map from (eg) forcepool, combining the unit if possible
     *@param {object} unit - the unit to be placed on the map
     */
    addOrCombineUnit (unit) {
        for (var i = 0; i < this.units.length; i++) {
            if (unit.canCombineWith(this.units[i])) {
                this.units[i].strength += unit.strength;
                unit.owner.removeUnit(unit);
                return;
            }
        }
        this.addUnit(unit)
    }
    /**
     * Combines units all units on the current hex, so far as possible
     *@param {object} unit - the unit to be combined in this operation
     */    
    combineAllUnits (unit) {
        var combined = this.combineUnit(unit)
        while (combined) {
            combined = this.combineUnit(unit)
        }
    }
    /**
     * Combine two units on the current hex, if possible
     * @param {object} unit - the unit to be combined in this operation
     * @returns {boolean}
     */      
    combineUnit (unit) {
        for (var i = 0; i < this.units.length; i++) {
            if (unit.canCombineWith(this.units[i])) {
                unit.strength += this.units[i].strength;
                unit.owner.removeUnit(this.units[i]);
                this.removeUnit(this.units[i]);
                return true;
            }
        }
	return false;
    }
    
    /**
     * Gets the top unit in the array (treated as stack)
     * @returns {object} unit - the top unit in the units array
     */      
    getTopUnit () {
        if (!this.units || this.units.length < 1) { return null }
        return this.units[this.units.length - 1]
    }
    /**
     * Removes a unit from the array 
     * @param {object} unit - the unit to be removed
     */      
    removeUnit (unit) {
        this.units = this.units.filter(un => un != unit)
        unit.hex = null
    }
    /**
     * Rotates the units in the array 
     */
    rotateUnits () {
        var unit = this.units.shift()
        this.addUnit(unit)
    }
    /**
     * gets the owning country of the current hex
     * @returns {object} owner 
     */    
    getOwner () {
        var owner = this.owner
        return owner
    }
    /**
     * writes text on the hex
     * @param {string} text - text to be written onto hex
     */
    write (text) {
    	mapCtx.fillText(text, this.pixelPoint.x + 16, this.pixelPoint.y + 30);     
    }
    /**
     * clears the hex of any drawn objects (eg units)
     */    
    clear () {
        mapCtx.clearRect(this.unitStartPoint.x - 10, this.unitStartPoint.y - 9, this.width, (this.size * 1.6) - 1);
    }
    /**
     * draws units onto the hex 
     */
    draw () {
        if (game.hexControlDialogIsOpen) { this.drawFlagsOnHexes(); return;  }

        if (this.units.length > 0) {
            mapCtx.drawUnits(this.units, this.unitStartPoint.x, this.unitStartPoint.y);
        }
    }
    /**
     * draws flags onto the hex when the hex control dialog is open
     */
    drawFlagsOnHexes () {
        if (this.owner)
	   mapCtx.drawImage(this.owner.flagImage, this.unitStartPoint.x + 7, this.unitStartPoint.y + 7);
    }
    /**
     * gets the background image for the hex
     * @returns {image} background image
     */
    getBackground () {
        return null;
        if (!this.background)
            this.background = backgroundCtx.getImageDataSafely(this.unitStartPoint.x - 10, this.unitStartPoint.y - 9, this.width, (this.size * 1.6));

        return this.background;
    }
    /**
     * gets a larger background image for the hex
     * @returns {image} large background image
     */    
    getLargeBackground () {
        if (!this.largeBackground) {
		try {
			var x = this.unitStartPoint.x - 17;
			var y = this.unitStartPoint.y - 18;
			var w = this.width + 20;
			var h = (this.size * 1.6) + 30;

			this.largeBackground = backgroundCtx.getImageDataSafely(x, y, w, h);
		}
		catch (err) {
			return null;
		}
	}
	return this.largeBackground;
    }
     
}
