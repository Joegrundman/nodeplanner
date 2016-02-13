
WP.ShipsAtSea.Mouse = {}

// WP.ShipsAtSea.prototype.handleCountrySelected = function (id) {
// 	var cty = game.getCountry(id);
// 	$("#sasCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
// }

// WP.ShipsAtSea.prototype.onMouseDown = function (e) {
// 	var point = getPoint('shipsAtSeaCanvas', e);
// 	var stack = shipsAtSea.unitHolder.findStackFor(point.x, point.y);
// 	if (stack) {
// 		game.setSelectedUnit(stack.getTopUnit());
// 		shipsAtSea.unitHolder.drawStack(stack);
// 	}
// 	else {
// 		game.setSelectedUnit(null);
// 	}
// }