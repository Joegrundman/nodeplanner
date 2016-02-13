WP.UnitCounter.UI = {
	addCountryToDropdown: function (cty) {
		$('#ucCountry').append($("<option />").attr("value", cty.id).text(cty.name));
	},

	fillCountryList: function () {
		$('#ucCountry').empty();
		var majors = game.getMajorPowers();
		for (var i = 0; i < majors.length; i++) {
			WP.UnitCounter.UI.addCountryToDropdown(majors[i]);
		}
		for (var i = 0; i < game.countries.length; i++) {
			var cty = game.countries[i];
			if (!cty.isMajorPower && cty.units.length > 0) {
				WP.UnitCounter.UI.addCountryToDropdown(cty);
			}
		}
		unitCounter.handleCountrySelected($('#ucCountry').val());
	},

	handleMenuButton: function () {
		$("#unitCounter").dialog('open');
		$("#unitCounter").dialog("option", "width", 530);
		WP.UnitCounter.UI.fillCountryList();
		unitCounter.draw();
	}
}
