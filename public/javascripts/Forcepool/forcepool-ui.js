/* global forcepool */
WP.Forcepool.UI = {
	addCountryToDropdown: function(cty) {
		$('#fpCountry').append($("<option />").attr("value", cty.id).text(cty.name));
	},

	fillCountryList: function() {
		$('#fpCountry').empty();
		var majors = game.getMajorPowers();
        majors.forEach(m => WP.Forcepool.UI.addCountryToDropdown(m))
        
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

