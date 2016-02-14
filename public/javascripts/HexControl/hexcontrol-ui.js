WP.HexControl.UI = {
	addCountryToDropdown: function (cty) {
		$('#hcCountry').append($("<option />").attr("value", cty.id).text(cty.name));
	},

	fillCountryList: function () {
		$('#hcCountry').empty();
		var majors = game.getMajorPowers();
        
        majors.forEach(m => WP.HexControl.UI.addCountryToDropdown(m))
        
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

