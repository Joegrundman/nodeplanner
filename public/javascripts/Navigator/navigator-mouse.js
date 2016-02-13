
// WP.Navigator.prototype.onMouseDown = function (e) {
// 	if (typeof e == 'undefined') e = navigatorCanvas.event;

// 	var point = getPoint('navigatorCanvas', e);

// 	var navWidth = $("#navigatorCanvas").width();
// 	var navHeight = $("#navigatorCanvas").height();

// 	var map = game.currentMap;
// 	var xMod = map.width / navWidth;
// 	var yMod = map.height / navHeight;

// 	var right = point.x * xMod;
// 	var down = point.y * yMod;

// 	var centerXMod = $("#mapDiv").width() / 2;
// 	var centerYMod = $("#mapDiv").height() / 2;

// 	right -= centerXMod;
// 	down -= centerYMod;

// 	scrollDivRight(right);
// 	scrollDivDown(down);
// 	this.dragging = true;
// }

// WP.Navigator.prototype.onMouseMove = function (e) {
// 	if (this.dragging)
// 		mapNav.onMouseDown(e);
// }

// WP.Navigator.prototype.onMouseUp = function (e) {
// 	if (typeof e == 'undefined') e = navigatorCanvas.event;
// 	this.dragging = false;
// }
