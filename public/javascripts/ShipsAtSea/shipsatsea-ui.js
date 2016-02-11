/* global shipsAtSea */
WP.ShipsAtSea.UI = {
	addCountryToDropdown: function (cty) {
		$('#sasCountry').append($("<option />").attr("value", cty.id).text(cty.name));
	},

	fillCountryList: function () {
		$('#sasCountry').empty();
		var majors = game.getMajorPowers();
		for (var i = 0; i < majors.length; i++) {
			WP.ShipsAtSea.UI.addCountryToDropdown(majors[i]);
		}
		shipsAtSea.handleCountrySelected($('#sasCountry').val());
	},

	handleMenuButton: function () {
		$("#shipsAtSea").dialog('open');
		$("#shipsAtSea").dialog("option", "width", 530);
		$("#shipsAtSea").dialog("option", "resizable", false);
		WP.ShipsAtSea.UI.fillCountryList();
		shipsAtSea.draw();
	}
}

WP.ShipsAtSea.prototype.draw = function () {
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
	// var holder = WP.UnitHolder.Util.unitHolderBuilder(shipsAtSeaCtx, $("#sasDetails"));
	holder.units = units;
	holder.stackSimilar = $('#sasStackCheckbox').is(':checked');
	holder.draw();
	shipsAtSea.unitHolder = holder;
}