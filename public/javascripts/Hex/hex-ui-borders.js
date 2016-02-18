
WP.Hex.UI.Borders = {

	drawBorders: function (hex) {
		mapCtx.beginPath();
		var point = WP.Hex.Borders.UI.getBorder(hex);
		mapCtx.moveTo(point[0][0], point[0][1]);
		for (var i = 1; i < 6; i++) {
			mapCtx.lineTo(point[i][0], point[i][1]);
		}
		mapCtx.lineTo(point[0][0], point[0][1]);
		mapCtx.lineWidth = 2;
		mapCtx.strokeStyle = "#ACACB8"; //"#" + Math.floor(Math.random()*16777216).toString(16); //"#ACACB8";
		mapCtx.stroke();
	},

	getBorder: function (hex) {
		var result = [];
		var delta_theta = 2.0 * Math.PI / 6;
		var theta = 0;
		var radius = adjust(hex.size);
		// var radius = adjust(hexSize);

		var modX = hex.pixelPoint.x + hex.size;
		var modY = hex.pixelPoint.y + hex.size;
		for (var i = 0; i < 6; i++) {
			var x = (radius * Math.sin(theta)) + modX;
			var y = (radius * Math.cos(theta)) + modY;
			result.push([x, y]);
			theta += delta_theta
		}
		return result;
	}
}
