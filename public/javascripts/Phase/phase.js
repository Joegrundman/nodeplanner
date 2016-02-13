
'use strict';

WP.Phase = class {
    constructor () {
        this.phaseList = [[1, "Air Staging"],
            [10, "Counter Air" ],
            [20, "Naval Basing" ],
            [30, "Patrol Resolution" ],
            [35, "Basing Interception" ],
            [40, "Sea Supply" ],
            [50, "Supply Combat" ],
            [60, "Air Supply" ],
            [70, "Air & Sea Transport" ],
            [90, "Ground Movement" ],
            [100, "Air & Naval Missions" ],
            [110, "Magic Interceptions" ],
            [120, "Combat-Phase Counter Air"],
            [130, "Port Strikes"],
            [140, "Air & Naval Interceptions"],
            [160, "DAS Interceptions"],
            [165, "Raiders & Strat Warfare"],
            [170, "Airdrops"],
            [180, "Ground Combat"],
            [190, "Exploitation Movement" ],
            [200, "Exploitation Air Support" ],
            [210, "Exploitation DAS"],
            [220, "Exploitation Airdrops" ],
            [230, "Exploitation Combat"],
            [240, "Attrition Combat" ],
            [250, "Post Combat Adjustments" ],
            [260, "Unit Construction" ],
            [270, "Tactical Redeployments" ],
            [280, "SRs for NR" ],
            [290, "Naval Redeployments" ],
            [300, "NR Resolution" ],
            [310, "Strategic Redeployments" ],
            [320, "TR After NR and SR" ],
            [330, "End"]
        ]
        
        this.seasons = ["Spring", "Summer", "Fall", "Winter"];
        this.coalitions = ["Axis", "Allies"];
        this.phases = [];
    }
    
    refreshPhase () {
        $("#phCurrentYear").html(game.currentYear);
        var season = phase.seasons[game.currentSeason];
        $("#phCurrentSeason").html(season);
        var coaName = phase.coalitions[game.currentCoalition];
        $("#phCurrentCoalition").html(coaName);
        var phaseName = phase.getPhaseName();
        $("#phCurrentPhase").html(phaseName);
        $("#phCurrentPhaseId").html(game.currentPhaseId);        
    }
    
    processLoadedPhase (currentPhaseId, year, season) {
        if (currentPhaseId == null) { currentPhaseId = phase.getPhaseId(year, season); }
        phase.setPhaseData(currentPhaseId);        
    }
    
    setPhaseData (currentPhaseId) {
        phase.phases.forEach(phaseData => {
            if (phaseData[0] == currentPhaseId) {
                game.currentPhaseId = phaseData[0];
                game.currentYear = phaseData[1];
                game.currentPhase = phaseData[2];
                game.currentSeason = phaseData[3];
                game.currentCoalition = phaseData[4];               
            }
        })
    }
    
    getPhaseId (year, season) {
        var seasonNum = phase.getSeasonNum(season);
        for (var i = 0; i < phase.phases.length; i++) {
            var phaseData = phase.phases[i];
            if (phaseData[1] == year) {
                if (phaseData[3] == seasonNum) {
                    return phaseData[0];
                    break;
                }
            }
        }       
    }
    
    getSeasonNum (name) {
       for (var i = 0; i < phase.seasons.length; i++) {
		  if (phase.seasons[i] == name) { return i; }
	   }
    }
    
    getPhaseName () {
        for (var i = 0; i < phase.phaseList.length; i++){
            if (phase.phaseList[i][0] == game.currentPhase){return phase.phaseList[i][1]}
        }       
    }
    
    handleClick (idChange) {
        game.currentPhaseId += idChange;
        phase.setPhaseData(game.currentPhaseId);
        phase.refreshPhase();       
    }
    
    initPhases () {
        var i = 1;
        for (var year = 1939; year < 1947; year++) {
            for (var season = 0; season < 4; season++) {
                if (year == 1939 && (season == 0 || season == 1)) continue;
                for (var coa = 0; coa < 2; coa++) {
                    for (var p = 0; p < phase.phaseList.length; p++) {
                        var phaseValue = phase.phaseList[p][0];
                        var newPhase = new Array(i, year, phaseValue, season, coa);
                        phase.phases.push(newPhase);
                        i++;
                    }
                }
            }
        }        
    }
    
}



// WP.Phase = function () {

// 	this.phaseList = [[1,  "Air Staging" ],
// 		[10, "Counter Air" ],
// 		[20, "Naval Basing" ],
// 		[30, "Patrol Resolution" ],
// 		[35, "Basing Interception" ],
// 		[40, "Sea Supply" ],
// 		[50, "Supply Combat" ],
// 		[60, "Air Supply" ],
// 		[70, "Air & Sea Transport" ],
// 		[90, "Ground Movement" ],
// 		[100, "Air & Naval Missions" ],
// 		[110, "Magic Interceptions" ],
// 		[120, "Combat-Phase Counter Air"],
// 		[130, "Port Strikes"],
// 		[140, "Air & Naval Interceptions"],
// 		[160, "DAS Interceptions"],
// 		[165, "Raiders & Strat Warfare"],
// 		[170, "Airdrops"],
// 		[180, "Ground Combat"],
// 		[190, "Exploitation Movement" ],
// 		[200, "Exploitation Air Support" ],
// 		[210, "Exploitation DAS"],
// 		[220, "Exploitation Airdrops" ],
// 		[230, "Exploitation Combat"],
// 		[240, "Attrition Combat" ],
// 		[250, "Post Combat Adjustments" ],
// 		[260, "Unit Construction" ],
// 		[270, "Tactical Redeployments" ],
// 		[280, "SRs for NR" ],
// 		[290, "Naval Redeployments" ],
// 		[300, "NR Resolution" ],
// 		[310, "Strategic Redeployments" ],
// 		[320, "TR After NR and SR" ],
// 		[330, "End"]];

// 	this.seasons = ["Spring", "Summer", "Fall", "Winter"];
// 	this.coalitions = ["Axis", "Allies"];
// 	this.phases = new Array();
// };

// WP.Phase.prototype.refreshPhase = function () {
// 	$("#phCurrentYear").html(game.currentYear);
// 	var season = phase.seasons[game.currentSeason];
// 	$("#phCurrentSeason").html(season);
// 	var coaName = phase.coalitions[game.currentCoalition];
// 	$("#phCurrentCoalition").html(coaName);
// 	var phaseName = phase.getPhaseName();
// 	$("#phCurrentPhase").html(phaseName);
// 	$("#phCurrentPhaseId").html(game.currentPhaseId);
// }

// WP.Phase.prototype.processLoadedPhase = function (currentPhaseId, year, season) {
// 	if (currentPhaseId == null) { currentPhaseId = phase.getPhaseId(year, season); }
// 	phase.setPhaseData(currentPhaseId);
// }

// WP.Phase.prototype.setPhaseData = function (currentPhaseId) {
// 	for (var i = 0; i < phase.phases.length; i++) {
// 		var phaseData = phase.phases[i];
// 		if (phaseData[0] == currentPhaseId) {
// 			game.currentPhaseId = phaseData[0];
// 			game.currentYear = phaseData[1];
// 			game.currentPhase = phaseData[2];
// 			game.currentSeason = phaseData[3];
// 			game.currentCoalition = phaseData[4];
// 		}
// 	}
// }

// WP.Phase.prototype.getPhaseId = function (year, season) {
// 	var seasonNum = phase.getSeasonNum(season);
// 	for (var i = 0; i < phase.phases.length; i++) {
// 		var phaseData = phase.phases[i];
// 		if (phaseData[1] == year) {
// 			if (phaseData[3] == seasonNum) {
// 				return phaseData[0];
// 				break;
// 			}
// 		}
// 	}
// }

// WP.Phase.prototype.getSeasonNum = function (name) {
// 	for (var i = 0; i < phase.seasons.length; i++) {
// 		if (phase.seasons[i] == name) { return i; }
// 	}
// }

// WP.Phase.prototype.getPhaseName = function () {
// 	for (var i = 0; i < phase.phaseList.length; i++){
// 		if (phase.phaseList[i][0] == game.currentPhase){return phase.phaseList[i][1]}
// 	}
// }

// WP.Phase.prototype.handleClick = function (idChange) {
// 	game.currentPhaseId += idChange;
// 	phase.setPhaseData(game.currentPhaseId);
// 	phase.refreshPhase();
// }

// WP.Phase.prototype.initPhases = function () {
// 	var i = 1;
// 	for (var year = 1939; year < 1947; year++) {
// 		for (var season = 0; season < 4; season++) {
// 			if (year == 1939 && (season == 0 || season == 1)) continue;
// 			for (var coa = 0; coa < 2; coa++) {
// 				for (var p = 0; p < phase.phaseList.length; p++) {
// 					var phaseValue = phase.phaseList[p][0];
// 					var newPhase = new Array(i, year, phaseValue, season, coa);
// 					//alert(i + " " + year + " " + phaseValue + " " + season + " " + coa);
// 					phase.phases[phase.phases.length] = newPhase;
// 					i++;
// 				}
// 			}
// 		}
// 	}
// }
