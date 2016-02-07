WP.Attrition.UI = {
	handleDialogClose: function () {
		game.state = 0;
	},

	handleMenuButton: function () {
		if (game.state == 1) {
			WP.Misc.Ui.closeAllDialogs();
			return;
		}
		WP.Misc.Ui.closeAllDialogs();
		$("#attrition").dialog('open');
		$("#attrition").dialog("option", "width", 300);
		$("#attritionDetails").html('');
		$("#attritionTotal").html('0');
		game.state = 1;
		attrition = new WP.Attrition();
	}
}

WP.Attrition.prototype.refreshTotals = function () {
	var total = 0;
	var countries = {};
	for (var i = 0; i < this.units.length; i++) {
		var unit = this.units[i];
		if (countries[unit.owner]) countries[unit.owner] += unit.strength;
		else countries[unit.owner] = unit.strength;
		total += unit.strength;
	}

	var details = "<table>";
	for (var cty in countries) {
		details += "<tr><td class='boldKey'>" + countries[cty] + ":</td><td class='value'> " + cty + "</td></tr>";
	}
	details += "</table>";
	$("#attritionDetails").html(details);
	$("#attritionTotal").html(total);
}