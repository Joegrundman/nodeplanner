/* global forcepool */
WP.Forcepool.UI = {
	addCountryToDropdown: function(cty) {
		//$('#fpCountry').append($("<option />").attr("value", cty.id).text(cty.name));
		$('#fpCountry').append($("<option />").attr("value", cty.id).text(cty.name));
	},

	fillCountryList: function() {
		$('#fpCountry').empty();
		var majors = game.getMajorPowers();
		// for (var i = 0; i < majors.length; i++) {
		// 	WP.Forcepool.UI.addCountryToDropdown(majors[i]);
		// }
        majors.forEach(m => WP.Forcepool.UI.addCountryToDropdown(m))
        
		// for (var i = 0; i < game.countries.length; i++) {
		// 	var cty = game.countries[i];
		// 	if (!cty.isMajorPower && cty.units.length > 0) {
		// 		WP.Forcepool.UI.addCountryToDropdown(cty);
		// 	}
		// }
        
        game.countries.forEach(cty => {
           if (!cty.isMajorPower && cty.units.length > 0) {
		        WP.Forcepool.UI.addCountryToDropdown(cty)
           }
        })
        
		forcepool.handleCountrySelected($('#fpCountry').val());
	},

	handleMenuButton: function() {
		$("#forcepoolDialog").dialog('open');
		$("#forcepoolDialog").dialog("option", "width", 540);
		$("#forcepoolDialog").dialog("option", "height", 340);
		$("#forcepoolDialog").dialog("option", "resizable", false);

		WP.Forcepool.UI.fillCountryList();
		forcepool.draw();
	}
};

WP.Forcepool.prototype.draw = function () {
	var id = $('#fpGroupings').val();
	var cty = game.getCountry($('#fpCountry').val());
	var units = new Array();
	// for (var i = 0; i < cty.units.length; i++) {
	// 	var unit = cty.units[i];
	// 	if (unit.location == 1 && unit.fpg == id) {
	// 		units[units.length] = unit;
	// 	}
	// }
    cty.units.forEach(u => {
        if (u.location == 1 && u.fpg == id) {
            units.push(u)
        }
    })

	// var holder = WP.UnitHolder.Util.unitHolderBuilder(forcepoolCtx, $("#fpDetails"));
    // es6
	var holder = WP.UnitHolder.unitHolderBuilder(forcepoolCtx, $("#fpDetails"));
	holder.units = units;
	holder.stackSimilar = $('#fpStackCheckbox').is(':checked');
	holder.draw();
	forcepool.unitHolder = holder;
}
