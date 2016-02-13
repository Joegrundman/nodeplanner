WP.NewUnit.UI = {
	addCountryToDropdown: function (cty) {
		$('#nuCountry').append($("<option />").attr("value", cty.id).text(cty.name));
	},

	addTypeGroupToDropdown: function (type) {
		$('#nuTypeGroup').append($("<option />").attr("value", type[1]).text(type[0]));
	},

	addTypeToDropdown: function (nuUnit, id) {
		$('#nuType').append($("<option />").attr("value", nuUnit[0]).text(nuUnit[0]));
	},

	fillCountryList: function () {
		$('#nuCountry').empty();
		var majors = game.getMajorPowers();
		for (var i = 0; i < majors.length; i++) {
			WP.NewUnit.UI.addCountryToDropdown(majors[i]);
		}
		for (var j = 0; j < game.countries.length; j++) {
			var cty = game.countries[j];
			if (!cty.isMajorPower) {
				WP.NewUnit.UI.addCountryToDropdown(cty);
			}
		}
		newUnit.handleCountrySelected($('#nuCountry').val());
	},

	fillTypeGroupList: function () {
		$('#nuTypeGroup').empty();
		var types = [["air", 0], ["naval", 1], ["ground", 2], ["additional", 3]];
		for (var i = 0; i < types.length; i++) {
			WP.NewUnit.UI.addTypeGroupToDropdown(types[i]);
		}
		$("#nuTypeGroup").prop("selectedIndex", 0);
	},

	fillTypeList: function () {
		$('#nuType').empty();
		var unitList = [[["aaf"], ["nas"], ["enas"], ["air trans"], ["bomber"], ["pac bomber"], ["interceptor"], ["avg"], ["jet"], ["jetsquadron"], ["kamikaze"], ["airbase"]],
			[["battleship"], ["carrier"], ["cruiser"], ["destroyer"], ["asw"], ["sub"], ["transport"], ["cve"], ["adv sub"], ["taskforce"]],
			[["infantry"], ["mechanized"], ["armor"], ["airborne"], ["marine"], ["commando"], ["chindit"], ["rocket"], ["flak"], ["partisan"], ["axispartisan"], ["compartisan"], ["alliedpartisan"], ["replacement"]],
			[["IC"], ["oilplant"], ["airbase"], ["fortress"], ["beachdefense"], ["exploit"], ["breakthrough"], ["turn"], ["firestorm"], ["atomic attack"], ["partialsupply"], ["grant"], ["oil"], ["spyring"], ["railhead"], ["port"], ["bridgehead"]]];
		var unitGroup = $('#nuTypeGroup').val();
		var unitTypeList = unitList[unitGroup];
		for (var i = 0; i < unitTypeList.length; i++) {
			WP.NewUnit.UI.addTypeToDropdown(unitTypeList[i]);
		}
		$("#nuType").prop("selectedIndex", 0);
	},

	handleMenuButton: function () {
		$("#newUnit").dialog('open');
		$("#newUnit").dialog("option", "width", 500);
		$("#newUnit").dialog("option", "resizable", false);
		$("#newUnit").dialog('open');
		//$("#newUnitCanvas").height(60);
		WP.NewUnit.UI.fillCountryList();
		WP.NewUnit.UI.fillTypeGroupList();
		WP.NewUnit.UI.fillTypeList();
		newUnit.draw();
	}
};

