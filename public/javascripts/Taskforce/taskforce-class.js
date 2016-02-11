WP.Taskforce = function () {
	this.id = null;
	this.owner = null;
	this.size = null;
	this.taskforceUnits = new Array();
	this.unitHolder = null;
	this.currentSquareX = null;
	this.currentSquareY = null;
	this.dragging = false;
}

WP.Taskforce.Util = {

	taskforceBuilder: function (id, owner, size) {
		var taskforce = new WP.Taskforce();
		taskforce.id = id;
		taskforce.owner = owner;
		taskforce.size = size;
		return taskforce;
	}
}

WP.Taskforce.prototype.addTaskforceUnit = function (taskforceUnit) {
	this.taskforceUnits.push(taskforceUnit);
	//taskforceUnit.owner = this;
}

// WP.Taskforce.prototype.removeUnitFromTaskforce = function (taskforce, unit) {
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

WP.Taskforce.prototype.removeUnitFrom = function (taskforce, unit) {
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

WP.Taskforce.prototype.updateTaskforceUnitAddress = function (unit) {
	var taskforce = game.selectedTaskforce;
	for (var i = 0; i < taskforce.taskforceUnits.length; i++) {
		if (taskforce.taskforceUnits[i].id == unit.id) {
			taskforce.taskforceUnits[i].x = unit.holderX;
			taskforce.taskforceUnits[i].y = unit.holderY;
		}
	}
}


WP.TaskforceUnit = function () {
	this.id = null;
	this.x = null;
	this.y = null;
}

WP.TaskforceUnit.Util = {

	taskforceUnitBuilder: function (id, x, y) {
		var taskforceUnit = new WP.TaskforceUnit();
		taskforceUnit.id = id;
		taskforceUnit.x = x;
		taskforceUnit.y = y;
		return taskforceUnit;
	}

}
