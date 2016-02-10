WP.HexControl.UI = {
	addCountryToDropdown: function (cty) {
		$('#hcCountry').append($("<option />").attr("value", cty.id).text(cty.name));
	},

	fillCountryList: function () {
		$('#hcCountry').empty();
		var majors = game.getMajorPowers();
		// for (var i = 0; i < majors.length; i++) {
		// 	WP.HexControl.UI.addCountryToDropdown(majors[i]);
		// }
        majors.forEach(m => WP.HexControl.UI.addCountryToDropdown(m))

		// for (i = 0; i < game.countries.length; i++) {
		// 	var cty = game.countries[i];
		// 	if (!cty.isMajorPower) {
		// 		WP.HexControl.UI.addCountryToDropdown(cty);
		// 	}
		// }
        game.countries.forEach(cty => {if (!cty.isMajorPower) { WP.HexControl.UI.addCountryToDropdown(cty) }})
        
		hexControl.handleCountrySelected($('#hcCountry').val());
	},

	handleMenuButton: function () {
		$("#hexControl").dialog('open');
		$("#hexControl").dialog("option", "width", 530);
		$("#hexControl").dialog("option", "resizable", false);
		WP.HexControl.UI.fillCountryList();
		hexControl.addFlags();
	}
}

WP.HexControl.prototype.addFlags = function () {
	game.hexControlDialogIsOpen = true;
	onWindowResize();
}

WP.HexControl.prototype.showUnits = function () {
	game.hexControlDialogIsOpen = false;
	hexControl.selectedUnit = null;
	onWindowResize();
}