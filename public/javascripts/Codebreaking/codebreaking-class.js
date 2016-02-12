'use strict';

WP.Codebreaking = class {
    constructor () {
        this.selected = 6
        this.cards = []
    }
    
    addCard (card) {
        this.cards.push(card)
    }
    
    getResultFor (year, season, side) {
        var result = null
        game.codebreakingResults.forEach(res => {
            if ((res.year == year) &&
                (res.season == season) &&
                (res.side == side)) {
                result = res
            }
        })
        console.log(result)
        return result
    }
}

// WP.Codebreaking = function () {
// 	this.selected = 6;
// 	this.cards = [];
// }

// WP.Codebreaking.prototype.addCard = function (card) {
// 	this.cards.push(card);
// }

// WP.Codebreaking.prototype.getResultFor = function (year, season, side) {
// 	for (var i = 0; i < game.codebreakingResults.length; i++) {
// 		var result = game.codebreakingResults[i];
// 		if (result.year == year) {
// 			if (result.season == season) {
// 				if (result.side == side) {
// 					return result;
// 				}
// 			}
// 		}
// 	}
// 	return null;
// }

