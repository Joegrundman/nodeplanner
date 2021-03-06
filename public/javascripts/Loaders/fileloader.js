'use strict';

WP.FileLoader = class {
    constructor(file) {
        this.file = file
        this.unitIndex = 0
    }
    
    static startGame (type, file) {
        game = WP.Game.gameBuilder()
        var initLoader = new WP.InitLoader()
        var fileLoader = new WP.FileLoader(file)
        initLoader.init(fileLoader)
        
    }
    
    load () {
        var loader = this;
        $.ajax({
            type: "GET",
            url: loader.file,
            dataType: "xml",
            success: function (xml) {
                loader.processGameDetails(xml);
                loader.processCountries(xml);
                loader.processCodebreakingRecords(xml);
                loader.processMaps(xml);
                loader.processShipyards(xml);
                loader.processTaskforces(xml);
                loader.processPostLoad();
            }
        }); 
    }
    
    processCodebreakingRecords (xml) {
        var loader = this;
        $(xml).find('codebreaking_history').each(function() {
            loader.readCodebreakingHistory($(this));
        });
    }
    
    processCountries (xml) {
        var loader = this
        $(xml).find('country').each(function () {
            loader.readCountry($(this))
        })
    }
    
    processMaps (xml) {
       var loader = this;
	   $(xml).find('map').each(function () {
		  loader.readMap($(this));
	   });
    }
    
    processGameDetails (xml) {
        var loader = this;
        $(xml).find('game').each(function () {
            loader.readGameDetails($(this));
        });
    }
    
    processShipyards (xml) {
        var loader = this;
	    $(xml).find('shipyard').each(function() {
		  loader.readShipyard($(this));
	   });
    }
    
    processTaskforces (xml) {
        var loader = this;
        $(xml).find('taskforce').each(function() {
        loader.readTaskforce($(this));
        });
    }
    
    processPostLoad () {
        onWindowResize();
    }
    
    readGameDetails (gameNode) {
        var currentPhaseId = null;
        var year = parseInt(gameNode.attr('starting-year'));
        var season = gameNode.attr('starting-season');
        if (gameNode.attr('current-phase-id')){
            currentPhaseId = parseInt(gameNode.attr('current-phase-id'));
        }
        game.setCurrentDate(currentPhaseId, year, season);
    }
    
    readCodebreakingDraw (drawNode) {
        var cbr = new WP.CodebreakingResult();
        cbr.readFrom(drawNode.attr('value'));
        game.addCodebreakingResult(cbr);
    }
    
    readCodebreakingHistory (historyNode) {
        var loader = this;
        historyNode.find('codebreaking').each(function() {
            loader.readCodebreakingDraw($(this));
        });
    }
    
    readCountry (countryNode) {
        var loader = this;
        var id = parseInt(countryNode.attr('id'));
        var country = game.getCountry(id);

        var coalition = countryNode.attr('coalition');
        var ally = parseInt(countryNode.attr('ally'));

        country.coalition = coalition;
        country.ally = ally;

        countryNode.find('codebreaking').each(function() {
        	WP.CommonLoader.readCodebreaking($(this), country);
        });

        countryNode.find('unit').each(function() {
            loader.readUnit($(this), country);
        });

        countryNode.find('g').each(function() {
            loader.readForcepoolGrouping($(this), country);
        });
    }
    
    readForcepoolGrouping (groupingNode, country) {
        var id = parseInt(groupingNode.attr('i'));
        var name = groupingNode.attr('name');
        var grouping = WP.Country.forcepoolGroupingBuilder(id, name);
        country.addForcepoolGrouping(grouping);
    }
    
    readShipyard (shipyardNode) {
     	var name = shipyardNode.attr('name');
        var shipyard = game.getShipyardFromName(name);
        var rate = shipyardNode.attr('rate');
        shipyard.rate = rate;
        var loader = this;
        shipyardNode.find('unit').each(function() {
            loader.readShipyardUnit($(this), shipyard);
        });   
    }
    
    readShipyardUnit (unitNode, shipyard) {
        var id = parseInt(unitNode.attr('id'));
        var x = parseInt(unitNode.attr('x'));
        var y = parseInt(unitNode.attr('y'));
        var shipyardUnit = WP.ShipyardUnit.shipyardUnitBuilder(id, x, y);
        shipyard.addShipyardUnit(shipyardUnit);
    }
    
    readTaskforce (taskforceNode) {
        var owner = taskforceNode.attr('owner');
        var taskforce = game.getTaskforceFromOwner(owner);
        var loader = this;
        taskforceNode.find('unit').each(function() {
            loader.readTaskforceUnit($(this), taskforce);
        });
    }
    
    readTaskforceUnit (unitNode, taskforce) {
        var id = parseInt(unitNode.attr('id'));
        var x = parseInt(unitNode.attr('x'));
        var y = parseInt(unitNode.attr('y'));
        var taskforceUnit = WP.TaskforceUnit.taskforceUnitBuilder(id, x, y);
        taskforce.addTaskforceUnit(taskforceUnit);
    }
    
    readHexes (map, hexList) {
        var hexes = hexList.split('/');
        for (var i = 0; i < hexes.length; i++) {
            if (hexes[i]) {
                var hexDetails = hexes[i].split('^');
                var hexId = parseInt(hexDetails[0].replace("i", ""));
                var hex = map.getHex(hexId);
                var countryId = parseInt(hexDetails[1].replace("o", ""));
                var owner = game.getCountry(countryId);
                hex.owner = owner;
            }
        }
    }   
        
    readMap (mapNode) {
        var loader = this;
        var id = parseInt(mapNode.attr('id'));
        var current = parseInt(mapNode.attr('current'));
        if (current == 1) game.switchTheaters();
        var map = game.maps[id];
        mapNode.find('hexes').each(function () {
            var hexes = $(this).text();
            loader.readHexes(map, hexes);
        }); 
    }
    
    readUnit (unitNode, country) {
        var id = parseInt(unitNode.attr('id'));
        var fpg = parseInt(unitNode.attr('fpg'));
        var type = unitNode.attr('type');
        var name = unitNode.attr('name');
        var strength = parseInt(unitNode.attr('strength'));
        var moves = parseInt(unitNode.attr('moves'));
        var location = parseInt(unitNode.attr('loc'));
        var slow = parseInt(unitNode.attr('slow'));
        var sunk = parseInt(unitNode.attr('sunk'));
        var damaged = parseInt(unitNode.attr('damaged'));
        var inverted = parseInt(unitNode.attr('inverted'));
        var exploiting = parseInt(unitNode.attr('exploiting'));
        var isolated = parseInt(unitNode.attr('isolated'));
        var unit = WP.Unit.unitBuilder(id, fpg, type, name, strength, moves, location, slow, sunk, damaged, inverted, exploiting, isolated);
        country.addUnit(unit);
        if (location == 2) {
            var stack = parseInt(unitNode.attr('stack'));
            var hex = unitNode.attr('hex');
            game.addUnitToHex(unit, hex, stack);
            unit.setHexIdAtTurnStart();
        }
        
    }
    
}

