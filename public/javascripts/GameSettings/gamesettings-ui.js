/* global gameSettings */
WP.GameSettings.UI = {

	handleMenuButton: function () {
        console.log('gamesettings-handlemenubutton')
		$("#gameSettings").dialog('open');
		$("#gameSettings").dialog("option", "width", 530);
		$("#gameSettings").dialog("option", "resizable", false);
		gameSettings.update();
	}
}



