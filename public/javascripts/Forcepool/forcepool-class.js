'use strict';

/**
 * WP.Forcepool class for creating forcepools. Forcepools are a popup dialog that contain units that have not been placed on the map or in a shipyard or taskforce
 * these units are also put into categories (e.g. unbuilt, dow+1, air, naval, ground)
 */

WP.Forcepool = class {
    /**
     * Create a forcepool
     */
    constructor () {
        /**
         * @property {object} unitHolder - a unitHolder object that will contain the units in the forcepool
         */
        this.unitHolder = null;
    }
    
    /**
     * This is an empty function that saves having to typecheck elsewhere. It's analogs in Taskforce and Shipyard do things
     */
    // ___Don't delete.____
    // Map/map.js calls this function for shipyrd or taskforce. 
    // For fp nothing should happen when called
    // by doing this i avoid instanceof checking
    removeUnitFrom () {}
    
    /**
     * After selecting this country on the forcepool dialog, this function updates map and forcepool groupings
     * @param {number} id - id of the country selected
     */
    handleCountrySelected (id) {
        var cty = game.getCountry(id)
        $("#fpCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
        $('#fpGroupings').empty();
        $('#fpGroupings').append($("<option />")
			             .attr("value", "0")
			             .text("Unbuilt"))
        
        cty.forcepoolGroupings.forEach(group => {
        $('#fpGroupings')
			.append($("<option />")
			.attr("value", group.id)
			.text(group.name));
        })
    }
    /**
     * Upon clicking the mouse button, this function finds the unit in the shipyard display under the mouse cursor
     * @param {object} e -  the mouse event object
     */ 
    onMouseDown (e) {
        var point = getPoint('forcepoolCanvas', e)
        var stack = forcepool.unitHolder.findStackFor(point.x, point.y);
        if (stack) {
            game.setSelectedUnit(stack.getTopUnit());
            forcepool.unitHolder.drawStack(stack);
        }
        else {
            game.setSelectedUnit(null);
        }
    }
    /**
     * Draws the units onto the forcepool display
     */
    draw () {
       var id = $('#fpGroupings').val()
	   var cty = game.getCountry($('#fpCountry').val())
	   var units = []
       cty.units.forEach(u => {
            if (u.location == 1 && u.fpg == id) {
                units.push(u)
            }
        })
        var holder = WP.UnitHolder.unitHolderBuilder(forcepoolCtx, $("#fpDetails"));
        holder.units = units;
        holder.stackSimilar = $('#fpStackCheckbox').is(':checked');
        holder.draw();
        forcepool.unitHolder = holder;
    }
    
    
}
