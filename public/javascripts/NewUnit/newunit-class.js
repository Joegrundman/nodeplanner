'use strict';

WP.NewUnit = class {
    constructor () {
        this.unitHolder = null
        this.readyUnit = null
    }
    
    handleCountrySelected (id) {
        var cty = game.getCountry(id);
        $("#nuCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
        $('#nuGroupings').empty();
        $('#nuGroupings')
            .append($("<option />")
                    .attr("value", "0")
                    .text("Unbuilt"));
        for (var i = 0; i < cty.forcepoolGroupings.length; i++) {
            var group = cty.forcepoolGroupings[i];
            $('#nuGroupings')
                .append($("<option />")
                        .attr("value", group.id)
                        .text(group.name));
        }
    }
    
    addNewUnit () {
        newUnit.readyUnit.owner.addUnit(newUnit.readyUnit)
        newUnit.readyUnit = null
    }
    
    addNewForcepoolGroup (id) {
        var cty = game.getCountry(id);
        var name = $('#nuFpg').val();
        var groupings = cty.forcepoolGroupings;
        id = groupings.length;
        for (var i = 0; i < groupings.length; i++) {
            if (groupings[i].id == id) id += 1;
        }
        var fpg = WP.Country.Util.forcepoolGroupingBuilder(id, name);
        cty.addForcepoolGrouping(fpg);
    }
    
    draw () {
        var cty = game.getCountry($('#nuCountry').val());
        var fpg = $('#nuGroupings').val();
        var units = new Array();
        var slow = $('#nuSlow').is(':checked');
        var type = $('#nuType').val();
        var name = $('#nuName').val();
        var strength = parseInt($('#nuStrength').val());
        var movement = parseInt($('#nuMove').val());
        var unit = newUnit.getNewUnit(cty, fpg, type, name, strength, movement, slow);
        units.push(unit)
        newUnit.readyUnit = unit;
        var holder = WP.UnitHolder.unitHolderBuilder(newUnitCtx, $("#nuDetails"));
        holder.units = units;
        holder.draw();
        newUnit.unitHolder = holder;
   }
    
    getNewUnit (cty, fpg, type, name, strength, movement, slow) {
        var id = newUnit.getNewId();
        var location = 1;
        if ((slow) && (type == "battleship")) { slow = true; }
        else { slow = false; }
        if ((type == "cruiser") && (strength % 2 > 0)) { strength += 1 }
        var unit = WP.Unit.unitBuilder(id, fpg, type, name, strength, movement, location, slow);
        unit.owner = cty;
        return unit;
    }
    
    getNewId () {
        var countries = game.countries
        var newID = 0
        for (var i = 0; i < countries.length; i++) {
            for (var j = 0; j < countries[i].units.length; j++) {
                if (countries[i].units[j].id > newID) { newID = countries[i].units[j].id; }
            }
        }
        newID += 1;
        return newID;
    }
}


// WP.NewUnit = function () {
// 	this.unitHolder = null;
// 	this.readyUnit = null;
// }