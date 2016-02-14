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
        this.showUnitTexture = true;
        this.currentYear = 2011;
        this.currentSeason = "Season";
        this.currentPhaseId = null;
        this.currentCoalition = null;
        this.currentPhase = null;
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
        for (var si = 0; si < this.taskforces.length; si++) {
            if (this.taskforces[si].id == id)
            return this.taskforces[si];
        }
        alert("Game.getTaskforces: Unknown taskforce: " + id);
        return null;        
    }
    
    getTaskforceFromOwner (owner) {
        for (var si = 0; si < this.taskforces.length; si++) {
            if (this.taskforces[si].owner == owner)
            return this.taskforces[si];
        }
        alert("Game.getTaskforce: Unknown taskforce: " + owner);
        return null;
    }
    
    getUnitForTaskforce (id, x, y) {
        for (var ci = 0; ci < this.countries.length; ci++) {
            var cty = this.countries[ci];
            for (var ui = 0; ui < cty.units.length; ui++) {
                if (cty.units[ui].id == id) {
                    cty.units[ui].holderX = x;
                    cty.units[ui].holderY = y;
                    return cty.units[ui];
                }
            }
        }
        return null;       
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
    
}




// WP.Game = function (){
//     this.name = 'not set'
//     this.mapIndex = 0
//     this.zoomLevel = 1
//     this.type = null
//     this.countries = null
//     this.maps = null
//     this.currentMap = null
//     this.selectedUnit = null
//     this.gameType = null
//     this.shipyards = null
//     this.taskforces = null
//     this.selectedTaskforce = null
//     this.state = 0;
//     this.newspaper = "";
//     this.codebreakingResults = null;
//     this.hexControlDialogIsOpen = false;
//     this.showUnitTexture = true;
//     this.currentYear = 2011;
//     this.currentSeason = "Season";
//     this.currentPhaseId = null;
//     this.currentCoalition = null;
//     this.currentPhase = null;
// }

// WP.Game.prototype.addCountry = function (country) {
//     if (!this.countries) this.countries = [];
//     this.countries.push(country);
// };


// WP.Game.prototype.addCodebreakingResult = function (result) {
//     if (!this.codebreakingResults) this.codebreakingResults = [];
//     this.codebreakingResults.push(result);
// };

// WP.Game.prototype.addCountry = function (country) {
//     if (!this.countries) this.countries = [];
//     this.countries.push(country);
// };

// WP.Game.prototype.addShipyard = function (shipyard) {
//     if (!this.shipyards) this.shipyards = [];
//     this.shipyards.push(shipyard);
// };

// WP.Game.prototype.addTaskforce = function (taskforce) {
//     if (!this.taskforces) this.taskforces = [];
//     this.taskforces.push(taskforce);
// };

// WP.Game.prototype.addUnitToHex = function (unit, hex, stack) {
//     var hexDetails = hex.split('/');
//     var map = this.maps[hexDetails[0]];
//     var addHex = map.getHex(hexDetails[1]);
//     addHex.addUnit(unit, stack);
// };

// WP.Game.prototype.getAllHighlightedUnits = function () {
//     var units = new Array();
//     var i = -1;
//     for (var ci = 0; ci < this.countries.length; ci++) {
//         var ctry = this.countries[ci];
//         for (var ui = 0; ui < ctry.units.length; ui++) {
//             var unit = ctry.units.length[ui];
//             if (!unit) continue;
//             if (unit.highlighted)
//             units[++i] = unit;
//         }
//     }
//     // this.countries.forEach(cty => cty.units.filter(unit => unit.highlighted)
//     //                                        .forEach(unit => units.push(unit)))
    
//     return units;
// };

// WP.Game.prototype.getCountry = function (id) {
//     for (var ci = 0; ci < this.countries.length; ci++) {
//         if (this.countries[ci].id == id)
//         return this.countries[ci];
//     }
//     alert("Game.getCountry: Unknown country: " + id);
//     return null;
// };

// WP.Game.prototype.getCurrentMapId = function () {
//     var mapId = 0;
//     if (game.currentMap == game.maps[1]) mapId = 1;
//     return mapId;
// };

// WP.Game.prototype.setCurrentDate = function (currentPhaseId, year, season) {
//     if (!phase) phase = new WP.Phase();
//     phase.initPhases();
//     phase.processLoadedPhase(currentPhaseId, year, season);
//     phase.refreshPhase();
// };

// WP.Game.prototype.getCountryFromName = function (name) {
//     for (var ci = 0; ci < this.countries.length; ci++) {
//         if (this.countries[ci].name == name)
//         return this.countries[ci];
//     }
//     // var res = this.countries.filter(cty => cty.name == name)
//     // if (res[0]) { return res }
//     alert("Game.getCountry: Unknown country: " + name);
//     return null;
// };

// WP.Game.prototype.getShipyards = function (id) {
//     for (var si = 0; si < this.shipyards.length; si++) {
//         if (this.shipyards[si].id == id)
//         return this.shipyards[si];
//     }
//     // var res = this.shipyards.filter(sy => sy.id == id)
//     // if (res) { return res }
//     alert("Game.getShipyard: Unknown shipyard: " + id);
//     return null;
// };

// WP.Game.prototype.getShipyardFromName = function (name) {
//     for (var si = 0; si < this.shipyards.length; si++) {
//         if (this.shipyards[si].name == name)
//         return this.shipyards[si];
//     }
// //    var res = this.shipyards.filter(sy => sy.name == name)
// //     if (res) { return res }
//     alert("Game.getShipyard: Unknown shipyard: " + name);
//     return null;
// };

// WP.Game.prototype.getShipyardFromUnit = function (unitId) {
//     for (var si = 0; si < this.shipyards.length; si++) {
//         for (var sj = 0; sj < this.shipyards[si].shipyardUnits.length; sj++) {
//             if (this.shipyards[si].shipyardUnits[sj].id == unitId)
//             return this.shipyards[si];
//         }
//     }
//     // var res = this.shipyards.filter(sy => sy.shipyardUnits.some(unit => unit.id == unitId))
//     // if (res) { return res }
//     alert("Game.getShipyard from unit: Unknown shipyard with: " + unitId);
//     return null;
// }

// WP.Game.prototype.getTaskforceFromUnit = function (unitId) {
//     for (var ti = 0; ti < this.taskforces.length; ti++) {
//         for (var tj = 0; tj < this.taskforces[ti].taskforceUnits.length; tj++) {
//             if (this.taskforces[ti].taskforces[tj].id == unitId)
//             return this.taskforces[ti];
//         }
//     }
//     // var res = this.taskforces.filter(tf => tf.taskforceUnits.some(unit => unit.id == unitId))
//     // if (res) { return res }
//     alert("Game.getTaskforce from unit: Unknown taskforce with: " + unitId);
//     return null;
// }

// WP.Game.prototype.getUnitForShipyard = function (id, x, y) {
//     for (var ci = 0; ci < this.countries.length; ci++) {
//         var cty = this.countries[ci];
//         for (var ui = 0; ui < cty.units.length; ui++) {
//             if (cty.units[ui].id == id) {
//                 cty.units[ui].holderX = x;
//                 cty.units[ui].holderY = y;
//                 return cty.units[ui];
//             }
//         }
//     }
//     // this.countries.forEach(cty => cty.units.forEach(unit => {
//     //     if (unit.id == id) {
//     //         unit.holderX = x
//     //         unit.holderY = y
//     //         return unit
//     //     }
//     // }))
//     return null;
// };

// WP.Game.prototype.getTaskforces = function (id) {
//     for (var si = 0; si < this.taskforces.length; si++) {
//         if (this.taskforces[si].id == id)
//         return this.taskforces[si];
//     }
//     alert("Game.getTaskforces: Unknown taskforce: " + id);
//     return null;
// };

// WP.Game.prototype.getTaskforceFromOwner = function (owner) {
//     for (var si = 0; si < this.taskforces.length; si++) {
//         if (this.taskforces[si].owner == owner)
//         return this.taskforces[si];
//     }
//     alert("Game.getTaskforce: Unknown taskforce: " + owner);
//     return null;
// };

// WP.Game.prototype.getUnitForTaskforce = function (id, x, y) {
//     for (var ci = 0; ci < this.countries.length; ci++) {
//         var cty = this.countries[ci];
//         for (var ui = 0; ui < cty.units.length; ui++) {
//             if (cty.units[ui].id == id) {
//                 cty.units[ui].holderX = x;
//                 cty.units[ui].holderY = y;
//                 return cty.units[ui];
//             }
//         }
//     }
//     return null;
// };

// WP.Game.prototype.getMajorPowers = function () {
//     var majors = new Array();
//     for (var i = 0; i < this.countries.length; i++) {
//         var cty = this.countries[i];
//         if (cty.isMajorPower) {
//             majors[majors.length] = cty;
//         }
//     }
//     return majors;
// };
// WP.Game.prototype.handleSelectUnselectOnBoard = function (unit) {
//     if (unit && unit.hex) {
//         unit.hex.draw();
//     }
// };

// WP.Game.prototype.handleSelectUnselectInDialog = function (unit, dialog) {
//     if (!dialog) return;
//     if (!dialog.unitHolder) return;
//     var stack = dialog.unitHolder.findStackContaining(unit);
//     if (stack) {
//         dialog.unitHolder.drawStack(stack);
//     }
// };

// WP.Game.prototype.setInfoBarButtons = function () {
//     $("#infoBarTopLeftWebsiteDiv").hide();
//     $("#infoBarTopLeftGameDiv").show();
// };

// WP.Game.prototype.setSelectedTaskforce = function (taskforce) {
//     if (taskforce == this.selectedTaskforce) return;
//     this.selectedTaskforce = taskforce;
// };

// WP.Game.prototype.setSelectedUnit = function (unit) {
//     if (unit == this.selectedUnit) return;

//     var oldUnit = this.selectedUnit;
//     this.selectedUnit = unit;

//     this.handleSelectUnselectOnBoard(oldUnit);
//     this.handleSelectUnselectInDialog(oldUnit, forcepool);
//     this.handleSelectUnselectInDialog(oldUnit, shipsAtSea);
//     this.handleSelectUnselectInDialog(oldUnit, shipyard);
//     this.handleSelectUnselectInDialog(oldUnit, taskforce);
//     this.handleSelectUnselectInDialog(oldUnit, unitCounter);

//     this.handleSelectUnselectOnBoard(unit);
//     this.handleSelectUnselectInDialog(unit, forcepool);
//     this.handleSelectUnselectInDialog(unit, shipsAtSea);
//     this.handleSelectUnselectInDialog(unit, shipyard);
//     this.handleSelectUnselectInDialog(unit, taskforce);
//     this.handleSelectUnselectInDialog(unit, unitCounter);
// };

// WP.Game.prototype.switchTheaters = function () {
//     WP.Misc.Ui.closeAllDialogs();
//     game.selectedUnit = null;
//     game.state = 0;
//     if (game.currentMap == game.maps[0]) game.currentMap = game.maps[1];
//     else game.currentMap = game.maps[0];
//     onWindowResize();
// };

// WP.Game.prototype.refreshCurrentTheater = function () {
//     WP.Misc.Ui.closeAllDialogs();
//     game.selectedUnit = null;
//     game.state = 0;
//     onWindowResize();
// };

// WP.Game.prototype.toggleShowUnitTexture = function (showTexture) {
//     if (showTexture) { game.showUnitTexture = true; }
//     else { game.showUnitTexture = false; }
//     game.refreshCurrentTheater();
// };


// WP.Game.Util = {
//     gameBuilder: function () {
//         game = new WP.Game()
//         game.name = "new"
//         game.countries = []
//         game.shipyards = []
//         game.maps = new Array(2)
//         game.maps[0] = new WP.Map("euro", 0)
//         game.maps[0].createHexes(0)
//         game.maps[1] = new WP.Map("pac", 1)
//         game.maps[1].createHexes(1)
//         game.currentMap = game.maps[0]
//         return game
//     }
// };
