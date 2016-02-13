/* global newUnit */

WP.NewUnit.Mouse = { };

// WP.NewUnit.prototype.handleCountrySelected = function(id) {
// 	var cty = game.getCountry(id);
// 	$("#nuCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
// 	$('#nuGroupings').empty();
// 	$('#nuGroupings')
// 		.append($("<option />")
// 				.attr("value", "0")
// 				.text("Unbuilt"));
// 	for (var i = 0; i < cty.forcepoolGroupings.length; i++) {
// 		var group = cty.forcepoolGroupings[i];
// 		$('#nuGroupings')
// 			.append($("<option />")
// 					.attr("value", group.id)
// 					.text(group.name));
// 	}
// };

// WP.NewUnit.prototype.addNewUnit = function() {
// 	newUnit.readyUnit.owner.addUnit(newUnit.readyUnit);
// 	newUnit.readyUnit = null;
// };

// WP.NewUnit.prototype.addNewForcepoolGroup = function(id) {
// 	var cty = game.getCountry(id);
// 	var name = $('#nuFpg').val();
// 	var groupings = cty.forcepoolGroupings;
// 	id = groupings.length;
// 	for (i = 0; i < groupings.length; i++) {
// 		if (groupings[i].id == id) id += 1;
// 	}
// 	var fpg = WP.Country.Util.forcepoolGroupingBuilder(id, name);
// 	cty.addForcepoolGrouping(fpg);
// };