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

