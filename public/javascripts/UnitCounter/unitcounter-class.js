'use strict';

WP.UnitCounter = class {
    constructor () {
	   this.unitHolder = null;      
    }
    
    handleCountrySelected (id) {
        var cty = game.getCountry(id)
    	$("#ucCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
    }
    
    onMouseDown (e) {
        var point = getPoint('unitCounterCanvas', e);
        var stack = unitCounter.unitHolder.findStackFor(point.x, point.y);
        if (stack) {
            game.setSelectedUnit(stack.getTopUnit());
            unitCounter.unitHolder.drawStack(stack);
        }
        else {
            game.setSelectedUnit(null);
        }        
    }
    
    draw () {
        var cty = game.getCountry($("#ucCountry").val())
        var units = []
        var drawUnbuilt = $("#ucShowUnbuiltCheckbox").is(':checked')
        
        for (var i = 0; i < cty.units.length; i++){
            var unit = cty.units[i]
            if (!drawUnbuilt){
                if (unit.location != 1) { units.push(unit) }
            } else {
                units.push(unit)
            }
        }
        var holder = WP.UnitHolder.unitHolderBuilder(unitCounterCtx, $("#ucDetails"));
        holder.units = units;
        holder.stackSimilar = $("#ucStackCheckbox").is(':checked')
        holder.draw();
        unitCounter.unitHolder = holder;        
    }
    
}
