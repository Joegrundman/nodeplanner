/* global gameSettings */
WP.GameSettings.UI = {

	handleMenuButton: function () {
		$("#gameSettings").dialog('open');
		$("#gameSettings").dialog("option", "width", 530);
		$("#gameSettings").dialog("option", "resizable", false);
		gameSettings.update();
	}
}



