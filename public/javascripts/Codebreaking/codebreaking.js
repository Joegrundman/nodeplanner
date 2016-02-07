WP.Codebreaking = function () {
	this.selected = 6;
	this.cards = new Array();
}

WP.Codebreaking.prototype.addCard = function (card) {
	this.cards[this.cards.length] = card;
}

WP.Codebreaking.prototype.getResultFor = function (year, season, side) {
	for (var i = 0; i < game.codebreakingResults.length; i++) {
		var result = game.codebreakingResults[i];
		if (result.year == year) {
			if (result.season == season) {
				if (result.side == side) {
					return result;
				}
			}
		}
	}
	return null;
}
