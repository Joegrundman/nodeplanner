WP.CodebreakingResult = function () {
	this.year = 1939;
	this.season = 0;
	this.side = 0;
	this.cards = new Array();
}

WP.CodebreakingResult.prototype.readFrom = function (rec) {
	var split = rec.split('~');
	this.year = parseInt(split[0]);
	this.season = parseInt(split[1]);
	this.side = parseInt(split[2]);
	this.cards = Convert.toIntArray(split[3]);
}