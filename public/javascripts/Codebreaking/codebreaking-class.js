'use strict';

/**
 * WP.Codebreaking class creates an instance of a codebreaking draw of cards
 */

WP.Codebreaking = class {
    /**
     * Creates a codebreaking object
     */
    constructor () {
        /**
         * @property {number} selected - number of cards in the pool from which 4 are drawn
         * @property {array} cards -  the four cards held in this hand
         */ 
        this.selected = 6
        this.cards = []
    }
    /**
     * Adds a card to the cards array
     * @param {object} card - the card to be added
     */
    addCard (card) {
        this.cards.push(card)
    }
    /**
     * Gets results for the current turn and faction (Western Allies, Russia, Germany or Japan)
     * @param {number}  year - the game year
     * @param {number} season  - the season of the year (4 seasons per year)
     * @param {number side - the side to which this hand belongs
     * @returns {object} the hand of cards is returned
     */
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
    
    
    /**
     * This parses year and season from the dialog html and calls showResultsFor
     */
    draw () {
        var year = parseInt($('#cbYear').val());
        var season = parseInt($('#cbSeason').val());
        WP.Codebreaking.UI.showResultsFor(year, season, codebreaking.selected);       
    }
    
}
