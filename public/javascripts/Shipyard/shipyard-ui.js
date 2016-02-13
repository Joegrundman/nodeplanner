WP.Shipyard.UI = {
	addYardToDropdown: function (yrd) {
		if (!(yrd.name == "Captured Shipyard")){$('#syYard').append($("<option />").attr("value", yrd.id).text(yrd.name)); }
	},

	fillShipyardList: function () {
		$('#syYard').empty();
		var shipyards = game.shipyards;
		for (var i = 0; i < shipyards.length; i++) {
			WP.Shipyard.UI.addYardToDropdown(shipyards[i]);
		}
		$("#syYard").prop("selectedIndex", 11);
		shipyard.handleShipyardSelected($('#syYard').val());
	},

	handleMenuButton: function () {

		$("#shipyard").dialog('open');
		$("#shipyard").dialog("option", "width", 367);
		$("#shipyard").dialog("option", "resizable", false);
		WP.Shipyard.UI.fillShipyardList();
	}
}

WP.Shipyard.Mouse = {}

// WP.Shipyard.prototype.draw = function () {
// 	var syd = game.getShipyards($('#syYard').val());
// 	var cty = game.getCountryFromName(syd.owner);
// 	var units = new Array();

// 	var holder = WP.UnitHolder.unitHolderBuilder(shipyardCtx, $("#syDetails"));
// 	// var holder = WP.UnitHolder.Util.unitHolderBuilder(shipyardCtx, $("#syDetails"));

// 	for (var i = 0; i < syd.shipyardUnits.length; i++) {
// 		var syUnit = syd.shipyardUnits[i];
// 		var unit = game.getUnitForShipyard(syUnit.id, syUnit.x, syUnit.y);
// 		units[units.length] = unit;
// 	}

// 	holder.units = units;
// 	holder.drawShipyard();
// 	shipyard.unitHolder = holder;
// }
