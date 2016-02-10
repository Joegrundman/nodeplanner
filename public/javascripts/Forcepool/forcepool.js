WP.Forcepool = function () {
	this.unitHolder = null;
}

// ___Don't delete.____
// Map/map.js calls this function or shipyrd or taskforce. 
// For fp nothing should happen when called
WP.Forcepool.prototype.removeUnitFrom = function () {
	// this empty function is required
}