'use strict'

WP.TaskforceUnit = class {
    constructor (){
        this.id = null;
        this.x = null;
        this.y = null;
    }
    
    static taskforceUnitBuilder (id, x, y) {
		var taskforceUnit = new WP.TaskforceUnit();
		taskforceUnit.id = id;
		taskforceUnit.x = x;
		taskforceUnit.y = y;
		return taskforceUnit;        
    }
}

// WP.Taskforce.prototype.handleTaskforceSelected = function (owner) {

// 	var taskforce = game.getTaskforceFromOwner(owner);
// 	var cty = game.getCountryFromName(owner);
// 	game.setSelectedTaskforce(taskforce);
// 	$("#tfCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
// 	taskforce.draw();
// }










