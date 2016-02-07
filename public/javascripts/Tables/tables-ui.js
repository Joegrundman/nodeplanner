/* global tables */
WP.Tables.UI = {

	handleDialogClose: function () {
		game.state = 0;
	},

	handleMenuButton: function () {
		if (game.state == 2) {
			WP.Misc.Ui.closeAllDialogs();
			return;
		}
		WP.Misc.Ui.closeAllDialogs();
		$("#tables").dialog('open');
		$("#tables").dialog("option", "width", 720);
		tables = new WP.Tables;
	}
}