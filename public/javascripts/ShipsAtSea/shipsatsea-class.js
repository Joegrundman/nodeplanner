'use strict';

WP.ShipsAtSea = class {
    constructor () {
        this.unitHolder = null
    }
    
    handleCountrySelected (id) {
       var cty = game.getCountry(id);
	   $("#sasCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
     }
     
     onMouseDown (e) {
        var point = getPoint('shipsAtSeaCanvas', e);
        var stack = shipsAtSea.unitHolder.findStackFor(point.x, point.y);
        if (stack) {
            game.setSelectedUnit(stack.getTopUnit());
            shipsAtSea.unitHolder.drawStack(stack);
        }
        else {
            game.setSelectedUnit(null);
        }
     }
     
     draw () {
        var cty = game.getCountry($('#sasCountry').val());
        var units = new Array();
        var showOnlyTFs = false;
        showOnlyTFs = $('#sasTFCheckbox').is(':checked');
        for (var i = 0; i < cty.units.length; i++) {
            var unit = cty.units[i];
            if (showOnlyTFs) {
                if (unit.location == 4 && unit.canSink()) {
                    units[units.length] = unit;
                }
            }
            else {
                if ((unit.location == 4 || unit.location == 2) && unit.canSink()) {
                    units[units.length] = unit;
                }
            }
        }
        var holder = WP.UnitHolder.unitHolderBuilder(shipsAtSeaCtx, $("#sasDetails"));
        holder.units = units;
        holder.stackSimilar = $('#sasStackCheckbox').is(':checked');
        holder.draw();
        shipsAtSea.unitHolder = holder;         
    }
}



// WP.ShipsAtSea = function () {
// 	this.unitHolder = null;
// }
