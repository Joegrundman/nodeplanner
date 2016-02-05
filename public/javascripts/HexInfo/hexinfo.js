WP.HexInfo = function () {
	this.hex = null;
}

WP.HexInfo.prototype.drawUnits = function() {
	if (this.hex && this.hex.units) {
		var holder = WP.UnitHolder.Util.unitHolderBuilder(hexInfoCtx, $("#hexInfoDiv"));
		holder.units = this.hex.units;
		holder.draw();
	}
}

WP.HexInfo.prototype.refreshHeader = function () {
	var flag = "/content/flags/ocean.bmp";
	var owner = "Ocean";
	var cty = null;
	var hexId = null;
	var cityName = null; var port = null; var beachIsland = null; var capital = null; var terrain = null;

	if (this.hex) {
		cty = this.hex.owner;
		hexId = this.hex.letter + this.hex.number;
		if (this.hex.cityName) { cityName = this.hex.cityName; }
		if (this.hex.isCapital) { capital = "Capital  "; }
		if (this.hex.isPort) { port = "Port"; }
		if (this.hex.isBeach) { beachIsland = "Beach"; }
		if (this.hex.isIsland) { beachIsland = "Island"; }
		switch (this.hex.isTerrain) {
			case 1: terrain = "Forest"; break;
			case 2: terrain = "Marsh"; break;
			case 6: terrain = "Jungle"; break;
			case 7: terrain = "Mountain"; break;
			case 8: terrain = "Jungle/Mountn"; break;
			default: break;
		}

		var background = this.hex.getLargeBackground();
		if (background) hexInfoBackgroundCtx.putImageData(background, 0, 0);
	}

	if (cty) {
		var flag = WP.Country.UI.getFlagUrl(cty);
		var owner = cty.name;
	}

	$("#hexInfoFlag").attr("src", flag);
	$("#hexInfoOwner").html(owner);
	$("#hexInfoHexId").html(hexId);
	$("#hexInfoCityName").html(cityName);
	$("#hexInfoCapital").html(capital);
	$("#hexInfoPort").html(port);
	$("#hexInfoBeachIsland").html(beachIsland);
	$("#hexInfoTerrain").html(terrain);
}

WP.HexInfo.prototype.updateFor = function (hex, force) {
	if (this.hex != hex || force) {
		this.hex = hex;
		this.drawUnits();
		this.refreshHeader();
	}
}
