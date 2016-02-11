WP.Hex.UI = {
	setHexZoom: function() {
		this.width = this.size * 1.768; // higher = wider
		var yModifier = this.size / 1.975; // lower = lower

		var dY = (this.coordinate.y * adjust(this.size + yModifier) + adjust(5));
		var dX = (this.coordinate.x * adjust(this.width) + adjust(1));

		if (this.coordinate.y % 2 != 0) {
			dX += (adjust(this.width / 2));
			//this.number++;
		}

		dX = Math.floor(dX);
		dY = Math.floor(dY);
		this.pixelPoint = new Point(dX, dY);
		WP.Hex.UI.setUnitStartPoint(this);
	},

	setUnitStartPoint: function(hex) {
		var dX = Math.floor(hex.pixelPoint.x + adjust(15));
		var dY = Math.floor(hex.pixelPoint.y + adjust(15));
		hex.unitStartPoint = new Point(dX, dY);
	}
};


WP.Hex.prototype.clear = function() {
	mapCtx.clearRect(this.unitStartPoint.x - 10, this.unitStartPoint.y - 9, this.width, (this.size * 1.6) - 1);
};

WP.Hex.prototype.draw = function () {

	if (game.hexControlDialogIsOpen) { this.drawFlagsOnHexes(); return;  }

	if (this.units.length > 0) {
		mapCtx.drawUnits(this.units, this.unitStartPoint.x, this.unitStartPoint.y);
	}

};

WP.Hex.prototype.drawFlagsOnHexes = function () {
	if (this.owner)
	mapCtx.drawImage(this.owner.flagImage, this.unitStartPoint.x + 7, this.unitStartPoint.y + 7);
};

WP.Hex.prototype.getBackground = function() {
	return null;
	if (!this.background)
		this.background = backgroundCtx.getImageDataSafely(this.unitStartPoint.x - 10, this.unitStartPoint.y - 9, this.width, (this.size * 1.6));

	return this.background;
};

WP.Hex.prototype.getLargeBackground = function () {
	//return null;
	if (!this.largeBackground) {
		try {
			var x = this.unitStartPoint.x - 17;
			var y = this.unitStartPoint.y - 18;
			var w = this.width + 20;
			var h = (this.size * 1.6) + 30;

			this.largeBackground = backgroundCtx.getImageDataSafely(x, y, w, h);
		}
		catch (err) {
			return null;
		}
	}
	return this.largeBackground;
}
