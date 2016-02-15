// /* global onWindowResize */
// /* global phase */

'use strict';

WP.Game = class {
    constructor () {
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
    
    addCountry (country) {
        if (!this.countries) this.countries = [];
        this.countries.push(country);       
    }
   
    addCodebreakingResult (result) {
        if (!this.codebreakingResults) this.codebreakingResults = [];
        this.codebreakingResults.push(result);
    }
    
    addShipyard (shipyard) {
        if (!this.shipyards) this.shipyards = [];
        this.shipyards.push(shipyard);       
    }
    
    addTaskforce (taskforce) {
        if (!this.taskforces) this.taskforces = [];
        this.taskforces.push(taskforce);        
    }
    
    addUnitToHex (unit, hex, stack) {
        var hexDetails = hex.split('/');
        var map = this.maps[hexDetails[0]];
        var addHex = map.getHex(hexDetails[1]);
        addHex.addUnit(unit, stack)
    }
    
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
    
    getCountry (id) {
        var res = null
        this.countries.forEach(cty => {
            if(cty.id == id) { res = cty }
        })
        
        alert("Game.getCountry: Unknown country: " + id);
        return res;
    }
    
    getCurrentMapId () {
        var mapId = 0;
        if (game.currentMap == game.maps[1]) mapId = 1;
        return mapId;       
    }
    
    getCountryFromName (name) {
        var res = null
        this.countries.forEach(cty => {
            if (cty.name == name) { res = cty }
        })
        alert("Game.getCountry: Unknown country: " + name);
        return res;
    }
    
    setCurrentDate (currentPhaseId, year, season) {
        if (!phase) phase = new WP.Phase();
        phase.initPhases();
        phase.processLoadedPhase(currentPhaseId, year, season);
        phase.refreshPhase();  
    }
    
    getShipyards (id) {
        var res = null
        this.shipyards.forEach(sy => {
            if (sy.id == id) { res = sy }
        })
        alert("Game.getShipyards: Unknown shipyard: " + id);
        return res;      
    }
    
    getShipyardFromName (name) {
        var res = null
        this.shipyards.forEach(sy => {
            if (sy.name == name) { res = sy }
        })
        alert("Game.getShipyardFromName: Unknown shipyard: " + name);
        return res        
    }
    
    getShipyardFromUnit (unitId) {
        var res = null
        this.shipyards.forEach(sy => {
            sy.shipyardUnits.forEach(syu => {
                if (syu.id == unitId) { res = sy }
            })
        })
        alert("Game.getShipyard from unit: Unknown shipyard with: " + unitId);
        return res;      
    }
    
    getTaskforceFromUnit (unitId) {
        var res = null
        this.taskforces.forEach(tf => {
            tf.taskforceUnits.forEach(tfu => {
                if (tfu.id == unitId) { res = tf }
            })
        })
        alert("Game.getTaskforce from unit: Unknown taskforce with: " + unitId);
        return res;   
    }
    
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
    
    getTaskforces (id) {
        var res = null
        this.taskforces.forEach(tf => {
            if (tf.id == id) { res = tf }
        })
        alert("Game.getTaskforces: Unknown taskforce: " + id);
        return res;        
    }
    
    getTaskforceFromOwner (owner) {
        var res = null
        this.taskforces.forEach(tf => {
            if (tf.owner == owner) { res = tf }
        })
        alert("Game.getTaskforce: Unknown taskforce: " + owner);
        return res;
    }
    
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
        return res        
    }
    
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
    
    getMajorPowers () {
        var majors = []
        this.countries.forEach(cty => {
            if (cty.isMajorPower) { majors.push(cty) }
        })
        return majors;      
    }
    
    handleSelectUnselectOnBoard (unit) {
        if (unit && unit.hex) {
            unit.hex.draw();
        }        
    }
    
    handleSelectUnselectInDialog (unit, dialog) {
        if (!dialog) return;
        if (!dialog.unitHolder) return;
        var stack = dialog.unitHolder.findStackContaining(unit);
        if (stack) {
            dialog.unitHolder.drawStack(stack);
        }    
    }
    
    setInfoBarButtons () {
        $("#infoBarTopLeftWebsiteDiv").hide();
        $("#infoBarTopLeftGameDiv").show();        
    }
    
    setSelectedTaskforce (taskforce) {
        if (taskforce == this.selectedTaskforce) return;
        this.selectedTaskforce = taskforce;     
    }
    
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
    
    switchTheaters () {
        WP.Misc.Ui.closeAllDialogs();
        game.selectedUnit = null;
        game.state = 0;
        if (game.currentMap == game.maps[0]) game.currentMap = game.maps[1];
        else game.currentMap = game.maps[0];
        onWindowResize();        
    }
    
    refreshCurrentTheater () {
        WP.Misc.Ui.closeAllDialogs();
        game.selectedUnit = null;
        game.state = 0;
        onWindowResize();
    }
    
    toggleShowUnitTexture (showTexture) {
        if (showTexture) { game.showUnitTexture = true; }
        else { game.showUnitTexture = false; }
        game.refreshCurrentTheater();       
    }
    
    toggleNoSwastikas(noSwastikas) {
        if (noSwastikas) { game.noSwastikas = true }
        else { game.noSwastikas = false }
        game.refreshCurrentTheater();
    }
    
}

