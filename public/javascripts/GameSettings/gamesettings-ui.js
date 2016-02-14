/* global gameSettings */
WP.GameSettings.UI = {

	handleMenuButton: function () {
        console.log('gamesettings-handlemenubutton')
		$("#gSettings").dialog('open');
		$("#gSettings").dialog("option", "width", 530);
		$("gSettings").dialog("option", "resizable", false);
		gameSettings.update();
	}
}



