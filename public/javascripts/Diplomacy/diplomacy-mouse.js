
WP.Diplomacy.Mouse = {}

WP.Diplomacy.prototype.handleCountrySelected = function (id) {
	var cty = game.getCountry(id);
	$("#dipCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
}
