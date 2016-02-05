
WP.Unit = function () {
	this.id = -1;
	this.fpg = 0;
	this.type = null;
	this.name = null;
	this.size = 41;
	this.factorable = false;

	this.strength = 0;
	this.movement = 0;

	this.location = 0;

	this.hex = null;
	this.image = null;
	this.owner = null;
	this.hex = null;

	this.taskforceOwner = null;
	this.yard = null;
	this.holderX = null;
	this.holderY = null;

	this.damaged = false;
	this.highlight = null;
	this.slow = false;
	this.sunk = false;
	this.inverted = false;
	this.exploiting = false;
	this.isolated = false;
}

WP.Unit.prototype.breakdownAndCreate = function (size) {
	if (size >= this.strength) return;
	var oldUnit = this;
	oldUnit.strength -= size;
	var unit = WP.Unit.Util.unitBuilder(this.id, this.fpg, this.type, this.name, size | 0, this.movement, this.location, this.slow, this.sunk, this.damaged, this.inverted);
	oldUnit.owner.addUnit(unit);
	return unit;
}

WP.Unit.prototype.canBeCountedInAttrition = function () {
	if (this.factorable) return false;
	if (this.strength < 1) return false;
	switch (this.type.toLowerCase()) {
		case "airborne":
		case "armor": case "arm":
		case "chindit":
		case "commando":
		case "infantry": case "i":
		case "marine":
		case "mechanized": case "mech":
			return true;
		default: return false;
	}
	return false;
}

WP.Unit.prototype.canBeDamaged = function () {
	switch (this.type.toLowerCase()) {
		case "battleship": case "bb": case "b": case "bc":
		case "carrier": case "cv": case "cve":
		case "transport": case "tr":
		case "cruiser":
		case "cve":
		case "destroyer": case "dd":
		case "oilplant":
		case "fortress":
		case "ic":
			return true;
		default: return false;
	}
}

WP.Unit.prototype.canBeInverted = function () {
	switch (this.type.toLowerCase()) {
		case "battleship": case "bb": case "b": case "bc":
		case "carrier": case "cv": case "cve":
		case "transport": case "tr":
		case "cruiser":
		case "cve":
		case "destroyer": case "dd":
		case "aaf":
		case "nas":
		case "enas":
		case "kamikaze":
		case "sub":
		case "advsub":
		case "aas-cover":
		case "aas-attack":
		case "aas-search":
		case "avg":
		case "bomber":
		case "interceptor":
		case "oil":
		case "jet":
		case "jetsquadron":
		case "taskforce":
			return true;
		default: return false;
	}
}

WP.Unit.prototype.canBeIsolated = function () {
	switch (this.type.toLowerCase()) {
		case "infantry": case "i":
		case "mechanized": case "mech":
		case "armor": case "arm":
		case "airborne":
		case "marine":
		case "chindit":
		case "commando":
		case "replacement":case "rep":
			return true;
		default: return false;
	}
}

WP.Unit.prototype.canCombineWith = function (unit) {
	if (unit == this) return false;
	if (!unit.factorable) return false;
	if (unit.type != this.type) return false;
	if (unit.owner != this.owner) return false;
	return true;
}

WP.Unit.prototype.canExploit = function () {
	if (this.type == "armor" || "arm") return true;

	return false;
}

WP.Unit.prototype.canSink = function () {
	switch (this.type.toLowerCase()) {
		case "battleship": case "bb": case "b": case "bc": case "pb":
		case "carrier": case "cv": case "cve":
		case "transport":
		case "cruiser":
		case "cve":
		case "destroyer": case "dd":
			return true;
		default: return false;
	}
	return false;
}

WP.Unit.prototype.findStackThatMatches = function (stacks) {
	for (var i = 0; i < stacks.length; i++) {
		if (this.unitTypeExistsInStack(stacks[i])) {
			return i;
		}
	}
	return -1;
}

WP.Unit.prototype.findStackWithSameAddress = function (stacks) {
	for (var i = 0; i < stacks.length; i++) {
		if (this.unitHasSameAddress(stacks[i])) {
			return i;
		}
	}
	return -1;
}

WP.Unit.prototype.inForcepool = function () {
	if (this.location == 1) return true;
	return false;
}

WP.Unit.prototype.onMap = function () {
	if (this.location == 2) return true;
	return false;
}

WP.Unit.prototype.returnToForcepool = function () {
	this.location = 1;
	this.fpg = 0;

	if (this.factorable) {
		for (var i = 0; i < this.owner.units.length; i++) {
			var unit = this.owner.units[i];
			if (unit == this) continue;
			if (unit.location != 1 || unit.fpg != 0) continue;
			if (unit.canCombineWith(this)) {
				unit.strength += this.strength;
				this.owner.removeUnit(this);
				break;
			}
		}
	}
}

WP.Unit.prototype.setShipyardAddress = function (yard, x, y) {
	this.yard = yard;
	this.holderX = x;
	this.holderY = y;
}


WP.Unit.prototype.setTaskforceAddress = function (taskforceOwner, x, y) {
	this.taskforceOwner = taskforceOwner;
	this.holderX = x;
	this.holderY = y;
}

WP.Unit.prototype.unitHasSameAddress = function (stack) {
	for (i = 0; i < stack.units.length; i++) {
		if ((stack.units[i].holderX == this.holderX) && (stack.units[i].holderY == this.holderY)) {
				return true;
		}
	}
	return false;
}

WP.Unit.prototype.unitTypeExistsInStack = function (stack) {
	for (i = 0; i < stack.units.length; i++) {
		if (stack.units[i].type == this.type) {
			if (stack.units[i].strength == this.strength) {
				return true;
			}
		}
	}
	return false;
}

WP.Unit.Util = {

	unitBuilder: function (id, fpg, type, name, strength, moves, location, slow, sunk, damaged, inverted, exploiting, isolated) {
		var unit = new WP.Unit();
		unit.id = id;
		unit.fpg = fpg;
		unit.type = type;
		unit.name = name;
		unit.strength = strength;
		unit.movement = moves;
		unit.location = location;
		unit.slow = slow;
		unit.sunk = sunk;
		unit.damaged = damaged;
		unit.inverted = inverted;
		unit.exploiting = exploiting;
		unit.isolated = isolated;

		switch (type.toLowerCase()) {
			case "aaf":
			case "aas-attack":
			case "aas-cover":
			case "aas-search":
			case "advsub":
			case "airtransport": case "at":
			case "asw":
			case "avg":
			case "bomber":
			case "pacificbomber":
			case "partialsupply":
			case "cruiser":
			case "cve":
			case "damage":
			case "destroyer": case "dd":
			case "enas": case "elitenas":
			case "flak":
			case "grant":
			case "ic":
			case "interceptor":
			case "isolation":
			case "jet":
			case "kamikaze":
			case "nas":
			case "oil":
			case "oilplant":
			case "sub":
			case "transport": case "tr":
				unit.factorable = true;
				break;
			default:
				unit.factorable = false;
				break;
		}
		return unit;
	}
}
