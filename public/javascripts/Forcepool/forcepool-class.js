'use strict';

WP.Forcepool = class {
    constructor () {
        this.unitHolder = null;
    }
    
    // ___Don't delete.____
    // Map/map.js calls this function for shipyrd or taskforce. 
    // For fp nothing should happen when called
    // by doing this i avoid instanceof checking
    removeUnitFrom () {}
    
    handleCountrySelected (id) {
        var cty = game.getCountry(id)
        $("#fpCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
        $('#fpGroupings').empty();
        $('#fpGroupings').append($("<option />")
			             .attr("value", "0")
			             .text("Unbuilt"))
        
        cty.forcepoolGroupings.forEach(group => {
        $('#fpGroupings')
			.append($("<option />")
			.attr("value", group.id)
			.text(group.name));
        })
    }
    
    onMouseDown (e) {
        var point = getPoint('forcepoolCanvas', e)
        var stack = forcepool.unitHolder.findStackFor(point.x, point.y);
        if (stack) {
            game.setSelectedUnit(stack.getTopUnit());
            forcepool.unitHolder.drawStack(stack);
        }
        else {
            game.setSelectedUnit(null);
        }
    }

    draw () {
       var id = $('#fpGroupings').val()
	   var cty = game.getCountry($('#fpCountry').val())
	   var units = []
       cty.units.forEach(u => {
            if (u.location == 1 && u.fpg == id) {
                units.push(u)
            }
        })
        var holder = WP.UnitHolder.unitHolderBuilder(forcepoolCtx, $("#fpDetails"));
        holder.units = units;
        holder.stackSimilar = $('#fpStackCheckbox').is(':checked');
        holder.draw();
        forcepool.unitHolder = holder;
    }
    
    
}

// WP.Forcepool.prototype.draw = function () {
// 	var id = $('#fpGroupings').val();
// 	var cty = game.getCountry($('#fpCountry').val());
// 	var units = new Array();
// 	// for (var i = 0; i < cty.units.length; i++) {
// 	// 	var unit = cty.units[i];
// 	// 	if (unit.location == 1 && unit.fpg == id) {
// 	// 		units[units.length] = unit;
// 	// 	}
// 	// }
//     cty.units.forEach(u => {
//         if (u.location == 1 && u.fpg == id) {
//             units.push(u)
//         }
//     })

// 	// var holder = WP.UnitHolder.Util.unitHolderBuilder(forcepoolCtx, $("#fpDetails"));
//     // es6
// 	var holder = WP.UnitHolder.unitHolderBuilder(forcepoolCtx, $("#fpDetails"));
// 	holder.units = units;
// 	holder.stackSimilar = $('#fpStackCheckbox').is(':checked');
// 	holder.draw();
// 	forcepool.unitHolder = holder;
// }


// WP.Forcepool.prototype.onMouseDown = function (e) {
// 	var point = getPoint('forcepoolCanvas', e);
// 	var stack = forcepool.unitHolder.findStackFor(point.x, point.y);
// 	if (stack) {
// 		game.setSelectedUnit(stack.getTopUnit());
// 		forcepool.unitHolder.drawStack(stack);
// 	}
// 	else {
// 		game.setSelectedUnit(null);
// 	}
// }

// WP.Forcepool.prototype.handleCountrySelected = function (id) {
// 	var cty = game.getCountry(id);
// 	$("#fpCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
// 	$('#fpGroupings').empty();
// 	$('#fpGroupings')
// 			.append($("<option />")
// 			.attr("value", "0")
// 			.text("Unbuilt"));
// 	// for (var i = 0; i < cty.forcepoolGroupings.length; i++) {
// 	// 	var group = cty.forcepoolGroupings[i];
// 	// 	$('#fpGroupings')
// 	// 		.append($("<option />")
// 	// 		.attr("value", group.id)
// 	// 		.text(group.name));
// 	// }
    
//     cty.forcepoolGroupings.forEach(group => {
//         $('#fpGroupings')
// 			.append($("<option />")
// 			.attr("value", group.id)
// 			.text(group.name));
//     })
// }

// // ___Don't delete.____
// // Map/map.js calls this function or shipyrd or taskforce. 
// // For fp nothing should happen when called
// WP.Forcepool.prototype.removeUnitFrom = function () {
// 	// this empty function is required
// }

// WP.Forcepool = function () {
// 	this.unitHolder = null;
// }

// // ___Don't delete.____
// // Map/map.js calls this function or shipyrd or taskforce. 
// // For fp nothing should happen when called
// WP.Forcepool.prototype.removeUnitFrom = function () {
// 	// this empty function is required
// }


