'use strict';

WP.GameSettings = class {
    constructor () {
        // this.showUnitTexture = true
        // this.noSwastikas = false
    }
    
    update () {
        var showUnitTexture = $('#gsUnitTexture').is(':checked');
	    game.toggleShowUnitTexture(showUnitTexture);
        var noSwastikas = $('#gsNoSwastikas').is(':checked')
        game.toggleNoSwastikas(noSwastikas) 
    }
    
    
}
