
WP.Country = function() {
	this.id = -1;
	this.name = "unknown";
	this.ally = null;
	this.colonyOf = null;
	this.coalition = null;
	this.isOrganization = false;
	this.isMajorPower = false;
	this.partOf = null;
	this.pacific = false;

	this.backColor = null;
	this.foreColor = null;
	this.innerColor = null;
	this.lineColor = null;
	this.shadow = null;
	this.flagImage = null;

	this.forcepoolGroupings = new Array();
	this.colonies = new Array();
	this.units = new Array();
	this.codebreaking = null;
};

WP.Country.Util = {

	countryBuilder: function(id, name) {
		var country = new WP.Country();
		country.id = id;
		country.name = name;
		WP.Country.UI.Colors.setColors(country);
		return country;
	},

	forcepoolGroupingBuilder: function(id, name) {
		var grouping = new WP.ForcepoolGrouping();
		grouping.id = id;
		grouping.name = name;
		return grouping;
	},

	sort: function(a, b) {
		if (a.name > b.name) return 1;
		else if (a.name < b.name) return -1;
		return 0;
	}
};

WP.Country.prototype.addColony = function(colony) {
	colony.colonyOf = this;
	this.colonies[this.colonies.length] = colony;

	colony.colonyOf = this;
};

WP.Country.prototype.addForcepoolGrouping = function(grouping) {
	this.forcepoolGroupings[this.forcepoolGroupings.length] = grouping;
};

WP.Country.prototype.addUnit = function(unit) {
	this.units[this.units.length] = unit;
	//this.units.push(unit)
	unit.owner = this;
};

WP.Country.prototype.getUnit = function(id) {
	for (var ci = 0; ci < this.units.length; ci++) {
		if (this.units[ci].id == id)
			return this.units[ci];
	}
	//return this.units.filter(function(unit) {return unit.id === id})
	alert("Game.getUnit: Unknown unit: " + id);
	return null;
};

WP.Country.prototype.removeUnit = function(unit) {
	var j = 0;
	while (j < this.units.length) {
		if (this.units[j] == unit)
			this.units.splice(j, 1);
		else
			j++;
	}
	//this.units = this.units.filter(function(u){ return u !== unit})
};

WP.Country.prototype.toString = function() {
	return this.name + " (" + this.id + ")";
};

WP.ForcepoolGrouping = function() {
	this.id = -1;
	this.name = "unknown";
};
