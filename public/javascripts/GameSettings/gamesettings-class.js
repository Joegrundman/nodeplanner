'use strict';

WP.GameSettings = class {
    constructor () {

    }
    
    update () {
        var showUnitTexture = $('#gsUnitTexture').is(':checked');
	    game.toggleShowUnitTexture(showUnitTexture); 
    }
    
    
}

// WP.GameSettings.prototype.update = function () {

// 	var showUnitTexture = $('#gsUnitTexture').is(':checked');
// 	game.toggleShowUnitTexture(showUnitTexture);

// }