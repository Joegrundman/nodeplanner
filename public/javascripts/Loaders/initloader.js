'use strict';

WP.InitLoader = class {
    constructor () {
        
    }
    
    init (fileLoader) {
        var loader = this
        
        $.ajax({
            type: "GET",
            url: "Content/Initialize/initialize.xml",
            dataType: "xml",
            success: function(xml) {
                // ____THIS IS A CODE SMELL!!____
                if (game.countries.length > 0) { return }

                loader.processCountries(xml)
                loader.processMaps(xml)
                loader.processShipyards(xml)
                loader.processTaskforces(xml)
                fileLoader.load()
            }
        })
    }
    
    postCountryLoadProcessing () {
        game.countries.forEach(country => {
            if (country.colonyOf != null && country.colonyOf > -1) {
                var owner = game.getCountry(country.colonyOf);
                owner.addColony(country);
            }
            if (country.partOf != null && country.partOf > -1) {
                var owner = game.getCountry(country.partOf);
                country.partOf = owner;
            }
            if (country.ally != null && country.ally > -1) {
                var ally = game.getCountry(country.ally);
                country.ally = ally;
            }
            WP.Country.UI.loadFlag(country);
        })
    }
    
    processCountries (xml) {
        var loader = this;
        var countryIndex = 0;
        $(xml).find('country').each(function () {
            loader.readCountry($(this), countryIndex);
            countryIndex++;
        });
        loader.postCountryLoadProcessing();
    }
    
    processMaps (xml) {
        var loader = this
        $(xml).find('map').each(function () {
		    loader.readMap($(this));
	    });       
    }
    
    processShipyards (xml) {
        var loader = this
        var shipyardIndex = 0;
        $(xml).find('shipyard').each(function () {
            loader.readShipyard($(this), shipyardIndex);
            shipyardIndex++;
        });
    }
    
    processTaskforces (xml) {
        var loader = this;
        var taskforceIndex = 0;
        $(xml).find('taskforce').each(function () {
            loader.readTaskforce($(this), taskforceIndex);
            taskforceIndex++;
        });        
    }
    
    readCountry (countryNode, country) {
        var id = countryNode.attr('id');
        var name = countryNode.attr('name');
        var country = WP.Country.countryBuilder(id, name);
        game.addCountry(country);

        var colonyOf = countryNode.attr('colonyOf');
        if (colonyOf) country.colonyOf = parseInt(colonyOf);
        var partOf = countryNode.attr('partOf');
        if (partOf) country.partOf = parseInt(partOf);
        var alliedWith = countryNode.attr('alliedWith');
        if (alliedWith) country.ally = parseInt(alliedWith);
        if (countryNode.attr('isOrganization') == "1") country.isOrganization = true;
        if (countryNode.attr('pacific') == "1") country.pacific = true;
        if (countryNode.attr('majorpower')) country.isMajorPower = true;

        countryNode.find('codebreaking').each(function () {
            WP.CommonLoader.readCodebreaking($(this), country);
        });
    }
    
    readShipyard (shipyardNode, shipyardIndex) {  
        var owner = shipyardNode.attr('owner');    
        var name = shipyardNode.attr('name');
        var rate = shipyardNode.attr('rate');
        var id = shipyardIndex;
        var shipyard = WP.Shipyard.shipyardBuilder(id, name, owner, rate);
        game.addShipyard(shipyard);
    }
    
    readTaskforce (taskforceNode, taskforceIndex) {
        var owner = taskforceNode.attr('owner');
        var size = taskforceNode.attr('size');
        var id = taskforceIndex;
        var taskforce = WP.Taskforce.taskforceBuilder(id, owner, size);
        game.addTaskforce(taskforce);       
    }
    
    readHex (hexNode, map, hexId) {
        var hex = map.getHex(hexId);
        var cityName = hexNode.attr('city');
        var ports = hexNode.attr('ports');
        var capital = hexNode.attr('capital');
        var beach = hexNode.attr('beach');
        var terrain = parseInt(hexNode.attr('terrain'));
        var island = hexNode.attr('island');
        if (hex) {
            var ownerId = hexNode.attr('owner');
            if (ownerId) {
                var country = game.getCountry(ownerId);
                hex.owner = country;
                if (cityName) { hex.cityName = cityName; }
                if (ports) { hex.isPort = ports; }
                if (capital) { hex.isCapital = capital; }
                if (beach) { hex.isBeach = beach; }
                if (terrain) { hex.isTerrain = terrain; }
                if (island) { hex.isIsland = island; }
            }
        }
    }
    
    readMap (mapNode) {
        var loader = this;
        var id = parseInt(mapNode.attr('id'));
        var map = game.maps[id];
        var hexId = 1;
        mapNode.find('hex').each(function () {
            loader.readHex($(this), map, hexId);
            hexId++;
        });        
    }
    
}


