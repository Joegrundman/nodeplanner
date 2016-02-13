'use strict';

WP.HexControl = class {
    constructor () {
        this.selectedCountry = null
    }
    
    handleCountrySelected (id) {
        var cty = game.getCountry(id);
        $("#hcCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
        hexControl.selectedCountry = cty;
    }
    
    handleHexClick (hex) {
        if (hex && hex.owner) {
            hex.owner = hexControl.slectedCountry
            hex.draw()
        }
    }
    
    addFlags () {
        game.hexControlDialogIsOpen = true;
        onWindowResize();       
    }
    
    showUnits () {
        game.hexControlDialogIsOpen = false;
        hexControl.selectedUnit = null;
        onWindowResize();      
    }
}




// WP.HexControl = function () {
// 	this.selectedCountry = null;
// }