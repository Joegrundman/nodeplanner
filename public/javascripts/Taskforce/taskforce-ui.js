WP.Taskforce.UI = {

	handleMenuButton: function () {
		$("#taskforce").dialog('open');
		$("#taskforce").dialog("option", "width", 498);
		$("#taskforce").dialog("option", "resizable", false);
		taskforce.handleTaskforceSelected("Britain");
		taskforce.draw();
	}
}

WP.Taskforce.prototype.draw = function () {
	var tf = game.selectedTaskforce;
	var units = new Array();

	for (var i = 0; i < tf.taskforceUnits.length; i++) {
		var taskforceUnit = tf.taskforceUnits[i];
		var unit = game.getUnitForTaskforce(taskforceUnit.id, taskforceUnit.x, taskforceUnit.y);
		units.push(unit);
	}
	var holder = WP.UnitHolder.unitHolderBuilder(taskforceCtx, $("#tfDetails"));
	// var holder = WP.UnitHolder.Util.unitHolderBuilder(taskforceCtx, $("#tfDetails"));
	holder.units = units;
	holder.drawTaskforce();
	taskforce.unitHolder = holder;
}
