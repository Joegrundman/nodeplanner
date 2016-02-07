/* global unitCounter */
WP.UnitCounter.Mouse = {}

WP.UnitCounter.prototype.handleCountrySelected = function (id) {
	var cty = game.getCountry(id);
	$("#ucCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
}

WP.UnitCounter.prototype.onMouseDown = function (e) {
	var point = getPoint('unitCounterCanvas', e);
	var stack = unitCounter.unitHolder.findStackFor(point.x, point.y);
	if (stack) {
		game.setSelectedUnit(stack.getTopUnit());
		unitCounter.unitHolder.drawStack(stack);
	}
	else {
		game.setSelectedUnit(null);
	}
}