WP.HexControl.Mouse = {}

WP.HexControl.prototype.handleCountrySelected = function (id) {
	var cty = game.getCountry(id);
	$("#hcCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
	hexControl.selectedCountry = cty;
}

WP.HexControl.prototype.handleHexClick = function (hex) {
	if (hex && hex.owner) {
		hex.owner = hexControl.selectedCountry;
		hex.draw();
	}
}