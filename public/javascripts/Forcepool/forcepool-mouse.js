WP.Forcepool.Mouse = {}



// WP.Forcepool.prototype.onMouseDown = function (e) {
// 	var point = getPoint('forcepoolCanvas', e);
// 	var stack = forcepool.unitHolder.findStackFor(point.x, point.y);
// 	if (stack) {
// 		game.setSelectedUnit(stack.getTopUnit());
// 		forcepool.unitHolder.drawStack(stack);
// 	}
// 	else {
// 		game.setSelectedUnit(null);
// 	}
// }


// WP.Forcepool.Mouse = {}

// WP.Forcepool.prototype.handleCountrySelected = function (id) {
// 	var cty = game.getCountry(id);
// 	$("#fpCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
// 	$('#fpGroupings').empty();
// 	$('#fpGroupings')
// 			.append($("<option />")
// 			.attr("value", "0")
// 			.text("Unbuilt"));
// 	// for (var i = 0; i < cty.forcepoolGroupings.length; i++) {
// 	// 	var group = cty.forcepoolGroupings[i];
// 	// 	$('#fpGroupings')
// 	// 		.append($("<option />")
// 	// 		.attr("value", group.id)
// 	// 		.text(group.name));
// 	// }
    
//     cty.forcepoolGroupings.forEach(group => {
//         $('#fpGroupings')
// 			.append($("<option />")
// 			.attr("value", group.id)
// 			.text(group.name));
//     })
// }

// WP.Forcepool.prototype.onMouseDown = function (e) {
// 	var point = getPoint('forcepoolCanvas', e);
// 	var stack = forcepool.unitHolder.findStackFor(point.x, point.y);
// 	if (stack) {
// 		game.setSelectedUnit(stack.getTopUnit());
// 		forcepool.unitHolder.drawStack(stack);
// 	}
// 	else {
// 		game.setSelectedUnit(null);
// 	}
// }
