WP.Codebreaking = function () {
	this.selected = 6;
	this.cards = [];
}

WP.Codebreaking.prototype.addCard = function (card) {
	this.cards.push(card);
}

WP.Codebreaking.prototype.getResultFor = function (year, season, side) {
	// for (var i = 0; i < game.codebreakingResults.length; i++) {
	// 	var result = game.codebreakingResults[i];
	// 	if (result.year == year) {
	// 		if (result.season == season) {
	// 			if (result.side == side) {
	// 				return result;
	// 			}
	// 		}
	// 	}
	// }
    
    game.codeBreakingResults.forEach(res => {
        if (res.year === year && res.seaason === season && res.side === side) {
            return res
        }
    })
	return null;
}
