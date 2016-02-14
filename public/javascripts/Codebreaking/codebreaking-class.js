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
        return result
    }
    
    draw () {
        var year = parseInt($('#cbYear').val());
        var season = parseInt($('#cbSeason').val());
        WP.Codebreaking.UI.showResultsFor(year, season, codebreaking.selected);       
    }
    
}
