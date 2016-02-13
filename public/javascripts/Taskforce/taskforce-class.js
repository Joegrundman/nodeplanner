'use strict';

WP.Taskforce = class {
    constructor () {
        this.id = null;
        this.owner = null;
        this.size = null;
        this.taskforceUnits = new Array();
        this.unitHolder = null;
        this.currentSquareX = null;
        this.currentSquareY = null;
        this.dragging = false;       
    }
    
    static taskforceBuilder (id, owner, size) {
        var taskforce = new WP.Taskforce()
        taskforce.id = id
        taskforce.owner = owner;
		taskforce.size = size;
		return taskforce;
    }
    
    addTaskforceUnit (taskforceUnit) {
        this.taskforceUnits.push(taskforceUnit)
    }
    
    removeUnitFrom (taskforce, unit) {
        var taskforce = game.selectedTaskforce;
        var j = 0;
        while (j < taskforce.taskforceUnits.length) {
            if (taskforce.taskforceUnits[j].id == unit.id) {
                taskforce.taskforceUnits.splice(j, 1);
            }
            else {
                j++;
            }
        }
    }
    
    updateTaskforceUnitAddress (unit) {
        var taskforce = game.selectedTaskforce;
        for (var i = 0; i < taskforce.taskforceUnits.length; i++) {
            if (taskforce.taskforceUnits[i].id == unit.id) {
                taskforce.taskforceUnits[i].x = unit.holderX;
                taskforce.taskforceUnits[i].y = unit.holderY;
            }
        }        
    }
    
    draw () {
        var tf = game.selectedTaskforce;
        var units = new Array();
        for (var i = 0; i < tf.taskforceUnits.length; i++) {
            var taskforceUnit = tf.taskforceUnits[i];
            var unit = game.getUnitForTaskforce(taskforceUnit.id, taskforceUnit.x, taskforceUnit.y);
            units.push(unit);
        }
        var holder = WP.UnitHolder.unitHolderBuilder(taskforceCtx, $("#tfDetails"));
        holder.units = units;
        holder.drawTaskforce();
        taskforce.unitHolder = holder;        
    }
    
    handleTaskforceSelected (owner) {
        var taskforce = game.getTaskforceFromOwner(owner);
        var cty = game.getCountryFromName(owner);
        game.setSelectedTaskforce(taskforce);
        $("#tfCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
        taskforce.draw();
    }
    
    onMouseDown (e) {
        var point = getPoint('taskforceCanvas', e);
        var stack = taskforce.unitHolder.findStackFor(point.x, point.y);
        if (stack) {
            game.setSelectedUnit(stack.getTopUnit());
            taskforce.unitHolder.drawStack(stack);
            taskforce.dragging = true;
        }
        else {
            game.setSelectedUnit(null);
        }       
    }
    
    onDoubleClick () {
        var unit = game.selectedUnit;
        var stack = taskforce.unitHolder.findStackContaining(unit);
        if (!stack) { return; }
        game.setSelectedUnit(null);
        if (stack.units.length > 1) {
            stack.rotateUnits();
            taskforce.unitHolder.drawStack(stack);
        }        
    }
    
    onMouseMove (e) {
        taskforce.setCurrentSquare(e);
        if (game.selectedUnit && taskforce.dragging == true) {
            var unit = game.selectedUnit;
            if ((taskforce.currentSquareX != unit.holderX) || (taskforce.currentSquareY != unit.holderY)) {
                taskforce.moveUnit(unit);
            }
        }        
    }
    
    onMouseUp () {
        taskforce.dragging = false
    }
    
    setCurrentSquare (e) {
        var point = getPoint('taskforceCanvas', e);
        this.currentSquareX = Math.floor((point.x - 4) / 58);
        this.currentSquareY = Math.floor((point.y - 7) / 58);
        if (this.currentSquareY < 0) this.currentSquareY = 0;
        if (this.currentSquareX < 0) this.currentSquareX = 0;       
    }
    
    moveUnit (unit) {
        var stack = taskforce.unitHolder.findStackContaining(unit);
        stack.removeUnit(unit);
        unit.holderX = taskforce.currentSquareX;
        unit.holderY = taskforce.currentSquareY;
        taskforce.updateTaskforceUnitAddress(unit);
        taskforce.unitHolder.drawTaskforce();        
    }
}



// WP.Taskforce = function () {
// 	this.id = null;
// 	this.owner = null;
// 	this.size = null;
// 	this.taskforceUnits = new Array();
// 	this.unitHolder = null;
// 	this.currentSquareX = null;
// 	this.currentSquareY = null;
// 	this.dragging = false;
// }

// WP.Taskforce.Util = {

// 	taskforceBuilder: function (id, owner, size) {
// 		var taskforce = new WP.Taskforce();
// 		taskforce.id = id;
// 		taskforce.owner = owner;
// 		taskforce.size = size;
// 		return taskforce;
// 	}
// }

// WP.Taskforce.prototype.addTaskforceUnit = function (taskforceUnit) {
// 	this.taskforceUnits.push(taskforceUnit);
// 	//taskforceUnit.owner = this;
// }

// // WP.Taskforce.prototype.removeUnitFromTaskforce = function (taskforce, unit) {
// // 	var taskforce = game.selectedTaskforce;
// // 	var j = 0;
// // 	while (j < taskforce.taskforceUnits.length) {
// // 		if (taskforce.taskforceUnits[j].id == unit.id) {
// // 			taskforce.taskforceUnits.splice(j, 1);
// // 		}
// // 		else {
// // 			j++;
// // 		}
// // 	}
// // }

// WP.Taskforce.prototype.removeUnitFrom = function (taskforce, unit) {
// 	var taskforce = game.selectedTaskforce;
// 	var j = 0;
// 	while (j < taskforce.taskforceUnits.length) {
// 		if (taskforce.taskforceUnits[j].id == unit.id) {
// 			taskforce.taskforceUnits.splice(j, 1);
// 		}
// 		else {
// 			j++;
// 		}
// 	}
// }

// WP.Taskforce.prototype.updateTaskforceUnitAddress = function (unit) {
// 	var taskforce = game.selectedTaskforce;
// 	for (var i = 0; i < taskforce.taskforceUnits.length; i++) {
// 		if (taskforce.taskforceUnits[i].id == unit.id) {
// 			taskforce.taskforceUnits[i].x = unit.holderX;
// 			taskforce.taskforceUnits[i].y = unit.holderY;
// 		}
// 	}
// }


// WP.TaskforceUnit = function () {
// 	this.id = null;
// 	this.x = null;
// 	this.y = null;
// }

// WP.TaskforceUnit.Util = {

// 	taskforceUnitBuilder: function (id, x, y) {
// 		var taskforceUnit = new WP.TaskforceUnit();
// 		taskforceUnit.id = id;
// 		taskforceUnit.x = x;
// 		taskforceUnit.y = y;
// 		return taskforceUnit;
// 	}

// }
