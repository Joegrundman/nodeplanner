/* global gameSettings */
WP.GameSettings.UI = {

	handleMenuButton: function () {
		$("#gameSettings").dialog('open');
		$("#gameSettings").dialog("option", "width", 530);
		$("#gameSettings").dialog("option", "resizable", false);
		gameSettings.update();
	}
}

WP.GameSettings.prototype.update = function () {

	var showUnitTexture = $('#gsUnitTexture').is(':checked');
	game.toggleShowUnitTexture(showUnitTexture);

}