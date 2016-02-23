// /* global onWindowResize */
// /* global phase */

'use strict';

/**
 * This is the God object that is the heart of the game
 * could probably do with refactoring
 */

WP.Game = class {
    /**
     * Create game object
     */
    constructor () {
        /**
         * @property {string} name - name of this game
         * @property {number} mapIndex - value indicates whether Europe or Pacific map
         * @property {number} zoomLevel - value shows current zoom level, default 1 gives max size (map10)
         * @property {null} type - i don't know what this is
         * @property {object} countries - the current country objects in the game
         * @property {object} maps - the map objects
         * @property {string} currentMap - the currently showing game map( europe or pacific )
         * @property {object} selectedUnit - the currently selected unit
         * @property {string} gameType - whether a full global game or one of the smaller scenarios
         * @property {object} shipyards - array of shipyard objects
         * @property {object} taskforces - array of taskforce objects
         * @property {object} selectedTaskforce - the currently selected (open) taskforce object (and by extension dialog)
         * @property {number} state - TBD
         * @property {string} newspaper - string to be posted as white press or notes
         * @property {object} codebreakingResults -  this turn's codebreaking results         * @property {}
         * @property {boolean} hexControlDialogIsOpen - whether or not the dialog is open andwhether the map has flags or units drawn on it
         * @property {number} currentYear - the current game year
         * @property {number} currentSeason - the current game season
         * @property {number} currentPhaseId - the current phase Id
         * @property {number} coalition - the current side (axis or allies)
         * @property {number} currentPhase - the current game phase (linked to phaseId)
         * @property {boolean} showUnitTexture - whether the enhanced unit texture is shown, or the flat color
         * @property {boolean} noSwastikas - whether swastikas should be shown (illegal to show in Germany)
         */
        this.name = 'not set'
        this.mapIndex = 0
        this.zoomLevel = 1
        this.type = null
        this.countries = null
        this.maps = null
        this.currentMap = null
        this.selectedUnit = null
        this.gameType = null
        this.shipyards = null
        this.taskforces = null
        this.selectedTaskforce = null
        this.state = 0;
        this.newspaper = "";
        this.codebreakingResults = null;
        this.hexControlDialogIsOpen = false;
        this.currentYear = 2011;
        this.currentSeason = "Season";
        this.currentPhaseId = null;
        this.currentCoalition = null;
        this.currentPhase = null;
        // Settings
        this.showUnitTexture = true;
        this.noSwastikas = true;
    }
    /**
     * Build a game instance
     * @static
     * gameBuilder
     */
    static gameBuilder () {
        game = new WP.Game()
        game.name = "new"
        game.countries = []
        game.shipyards = []
        game.maps = new Array(2)
        game.maps[0] = new WP.Map("euro", 0)
        game.maps[0].createHexes(0)
        game.maps[1] = new WP.Map("pac", 1)
        game.maps[1].createHexes(1)
        game.currentMap = game.maps[0]
        return game
    }
    /**
     * adds a country to the game countries array
     * @param {object}  country - country to be added
     */
    addCountry (country) {
        if (!this.countries) this.countries = [];
        this.countries.push(country);       
    }
    /**
     * adds a codebreaking result to the game codebreakingResults array
     * @param {object} result - result to be added
     */   
    addCodebreakingResult (result) {
        if (!this.codebreakingResults) this.codebreakingResults = [];
        this.codebreakingResults.push(result);
    }
    /**
     * adds a shipyards to the game shipyards array
     * @param {object}  shipyard - shipyard to be added
     */
    addShipyard (shipyard) {
        if (!this.shipyards) this.shipyards = [];
        this.shipyards.push(shipyard);       
    }
    /**
     * adds a taskforce to the game taskforces array
     * @param {object}  taskforce - taskforce to be added
     */
    addTaskforce (taskforce) {
        if (!this.taskforces) this.taskforces = [];
        this.taskforces.push(taskforce);        
    }
    /**
     * adds a unit to a hex
     * @param {object}  unit - unit to be added
     * @param {object}  hex - hex to which unit is added
     * @param {object}  stack - stack to which unit is added
     */
    addUnitToHex (unit, hex, stack) {
        var hexDetails = hex.split('/');
        var map = this.maps[hexDetails[0]];
        var addHex = map.getHex(hexDetails[1]);
        addHex.addUnit(unit, stack)
    }
     /**
     * gets all currently highlighted units
     * @returns {object} array of units
     */
    getAllHighlightedUnits () {
        var units = []
        var i = -1;

        for (var ci = 0; ci < this.countries.length; ci++) {
            var ctry = this.countries[ci];
            for (var ui = 0; ui < ctry.units.length; ui++) {
                var unit = ctry.units.length[ui];
                if (!unit) continue;
                if (unit.highlighted)
                units[++i] = unit;
            }
        }  
        return units;
    }
     /**
     * gets country by id
     * @param {number} id - id of the country
     * @returns {object}  country
     */    
    getCountry (id) {
        var res = null
        this.countries.forEach(cty => {
            if(cty.id == id) { res = cty }
        })
        if (res == null) {
         console.log("Game.getCountry(id): Unknown country: " + id);           
        }

        return res;
    }
    /**
     * gets the current map Id
     * @returns {number}  the map id
     */
    getCurrentMapId () {
        var mapId = 0;
        if (game.currentMap == game.maps[1]) mapId = 1;
        return mapId;       
    }
     /**
     * gets country by name
     * @param {string} name - name of the country
     * @returns {object}  country
     */     
    getCountryFromName (name) {
        var res = null
        this.countries.forEach(cty => {
            if (cty.name == name) { res = cty }
        })
        if (res == null){
            console.log("Game.getCountryFromName: Unknown country: " + name);
        }
        return res;
    }
    /**
     *  sets the current date 
     * @param {number} currentPhaseId - the current Phase Id
     * @param {number} year - the current year
     * @param {number} season - the current season
     */
    setCurrentDate (currentPhaseId, year, season) {
        if (!phase) phase = new WP.Phase();
        phase.initPhases();
        phase.processLoadedPhase(currentPhaseId, year, season);
        phase.refreshPhase();  
    }
     /**
     * gets shipyard by id
     * @param {number} id - shipyard id number
     * @returns {object}  shipyard
     */    
    getShipyards (id) {
        var res = null
        this.shipyards.forEach(sy => {
            if (sy.id == id) { res = sy }
        })
        if (res == null) {
             alert("Game.getShipyards: Unknown shipyard: " + id);
        }
        return res;      
    }
     /**
     * gets shipyard by name
     * @param {string} name - name of the shipyard
     * @returns {object}  shipyard
     */    
    getShipyardFromName (name) {
        var res = null
        this.shipyards.forEach(sy => {
            if (sy.name == name) { res = sy }
        })
        if(res == null) {
            alert("Game.getShipyardFromName: Unknown shipyard: " + name);
        }
        return res        
    }
     /**
     * gets shipyard from the urrently selected unit
     * @param {number} unitId - currently selected unitId
     * @returns {object}  shipyard
     */   
    getShipyardFromUnit (unitId) {
        var res = null
        this.shipyards.forEach(sy => {
            sy.shipyardUnits.forEach(syu => {
                if (syu.id == unitId) { res = sy }
            })
        })
        if (res == null) {
         alert("Game.getShipyard from unit: Unknown shipyard with: " + unitId);           
        }
        return res;      
    }
     /**
     * gets taskforce from the currently selected unit id
     * @param {number} unitId - currently selected unit id
     * @returns {object}  taskforce
     */    
    getTaskforceFromUnit (unitId) {
        var res = null
        this.taskforces.forEach(tf => {
            tf.taskforceUnits.forEach(tfu => {
                if (tfu.id == unitId) { res = tf }
            })
        })
        if (res == null) {
         alert("Game.getTaskforce from unit: Unknown taskforce with: " + unitId);           
        }
        return res;   
    }
    
    /**
     * gets a unit from the shipyard
     * @param {number} id - the unit id
     * @param {number} x - x coordinate of unit (in the shipyard)
     * @param {number} y - y coordinate of unit (in the shipyard)
     * @results {object}  unit
     */
    getUnitForShipyard (id, x, y) {
        var res = null
        this.countries.forEach(cty => {
            cty.units.forEach(cu => {
                if (cu.id == id) {
                    cu.holderX = x
                    cu.holderY = y
                    res = cu
                }
            })
        })
        return res       
    }
     /**
     * gets taskforce by id
     * @param {number} id - taskforce id number
     * @returns {object}  taskforce
     */ 
    getTaskforces (id) {
        var res = null
        this.taskforces.forEach(tf => {
            if (tf.id == id) { res = tf }
        })
        if (res == null){
          alert("Game.getTaskforces: Unknown taskforce: " + id);          
        }
        return res;        
    }
     /**
     * gets taskforce by owner
     * @param {object} owner - the owning country
     * @returns {object} taskforce
     */     
    getTaskforceFromOwner (owner) {
        var res = null
        this.taskforces.forEach(tf => {
            if (tf.owner == owner) { res = tf }
        })
        if (res == null) {
         alert("Game.getTaskforce: Unknown taskforce: " + owner);           
        }
        return res;
    }
    /**
     * gets a unit from the taskforce
     * @param {number} id - the unit id
     * @param {number} x - x coordinate of unit (in the taskforce)
     * @param {number} y - y coordinate of unit (in the taskforce)
     * @results {object}  unit
     */    
    getUnitForTaskforce (id, x, y) {
        var res = null
        this.countries.forEach(cty => {
            cty.units.forEach(cu => {
                if (cu.id == id) {
                    cu.holderX = x
                    cu.holderY = y
                    res = cu
                }
            })
        })
        if (res == null) {
           alert("Game.getUnit forTaskforce: Unknown unit: " + id);           
        }
        return res        
    }
     /**
     * gets a unit from the country for a shipyard or taskforce
     * @param {number} id - the unit id
     * @param {number} x - x coordinate of unit (in the dialog)
     * @param {number} y - y coordinate of unit (in the dialog)
     * @results {object}  unit
     */   
    getUnitFromCountryForGridDialog (id, x, y) {
        var res = null
        this.countries.forEach(cty => {
            cty.units.forEach(cu => {
                if (cu.id == id) {
                    cu.holderX = x
                    cu.holderY = y
                    res = cu
                }
            })
        })
        return res    
    }
    /**
     * gets the list of major powers
     * @returns {object}  array of major powers
     */    
    getMajorPowers () {
        var majors = []
        this.countries.forEach(cty => {
            if (cty.isMajorPower) { majors.push(cty) }
        })
        return majors;      
    }
     /**
     * redraws hexes upon select and unselect unit
     */   
    handleSelectUnselectOnBoard (unit) {
        if (unit && unit.hex) {
            unit.hex.draw();
        }        
    }
      /**
     * redraws dialog upon select and unselect unit
     */     
    handleSelectUnselectInDialog (unit, dialog) {
        if (!dialog) return;
        if (!dialog.unitHolder) return;
        var stack = dialog.unitHolder.findStackContaining(unit);
        if (stack) {
            dialog.unitHolder.drawStack(stack);
        }    
    }
     /**
     * handles infobar buttons - not used anymore in this ui
     */      
    setInfoBarButtons () {
        $("#infoBarTopLeftWebsiteDiv").hide();
        $("#infoBarTopLeftGameDiv").show();        
    }
     /**
     * sets currently selected taskforce
     * @param{object} taskforce - the taskforce to mark as currently selected
     */      
    setSelectedTaskforce (taskforce) {
        if (taskforce == this.selectedTaskforce) return;
        this.selectedTaskforce = taskforce;     
    }
      /**
     * sets currently selected unit - triggers redrawing upon change
     * @param{object} unit - the unit to mark as currently selected
     */      
    setSelectedUnit (unit) {
        if (unit == this.selectedUnit) return;

        var oldUnit = this.selectedUnit;
        this.selectedUnit = unit;

        this.handleSelectUnselectOnBoard(oldUnit);
        this.handleSelectUnselectInDialog(oldUnit, forcepool);
        this.handleSelectUnselectInDialog(oldUnit, shipsAtSea);
        this.handleSelectUnselectInDialog(oldUnit, shipyard);
        this.handleSelectUnselectInDialog(oldUnit, taskforce);
        this.handleSelectUnselectInDialog(oldUnit, unitCounter);

        this.handleSelectUnselectOnBoard(unit);
        this.handleSelectUnselectInDialog(unit, forcepool);
        this.handleSelectUnselectInDialog(unit, shipsAtSea);
        this.handleSelectUnselectInDialog(unit, shipyard);
        this.handleSelectUnselectInDialog(unit, taskforce);
        this.handleSelectUnselectInDialog(unit, unitCounter);       
    }
     /**
     * switched between europe and pacific theaters
     */   
    switchTheaters () {
        WP.Misc.Ui.closeAllDialogs();
        game.selectedUnit = null;
        game.state = 0;
        if (game.currentMap == game.maps[0]) game.currentMap = game.maps[1];
        else game.currentMap = game.maps[0];
        onWindowResize();        
    }
    /**
     * refreshes current theater
     */    
    refreshCurrentTheater () {
        WP.Misc.Ui.closeAllDialogs();
        game.selectedUnit = null;
        game.state = 0;
        onWindowResize();
    }
    /**
     * toggles unit texture on and off
     * @param {boolean}  showTexture 
     */    
    toggleShowUnitTexture (showTexture) {
        if (showTexture) { game.showUnitTexture = true; }
        else { game.showUnitTexture = false; }
        game.refreshCurrentTheater();       
    }
    /**
     * toggles swastikas on and off
     * @param {boolean}  noSwastikas 
     */   
    toggleNoSwastikas(noSwastikas) {
        if (noSwastikas) { game.noSwastikas = true }
        else { game.noSwastikas = false }
        game.refreshCurrentTheater();
    }
    
}

