WP.Taskforce.Mouse = {}

WP.Taskforce.prototype.handleTaskforceSelected = function (owner) {

	var taskforce = game.getTaskforceFromOwner(owner);
	var cty = game.getCountryFromName(owner);
	game.setSelectedTaskforce(taskforce);
	$("#tfCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
	taskforce.draw();
}

WP.Taskforce.prototype.onMouseDown = function (e) {
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

WP.Taskforce.prototype.onDoubleClick = function () {
	var unit = game.selectedUnit;
	var stack = taskforce.unitHolder.findStackContaining(unit);
	if (!stack) { return; }
	game.setSelectedUnit(null);
	if (stack.units.length > 1) {
		stack.rotateUnits();
		taskforce.unitHolder.drawStack(stack);
	}
}


WP.Taskforce.prototype.onMouseMove = function (e) {
	taskforce.setCurrentSquare(e);
	if (game.selectedUnit && taskforce.dragging == true) {
		var unit = game.selectedUnit;
		if ((taskforce.currentSquareX != unit.holderX) || (taskforce.currentSquareY != unit.holderY)) {
			taskforce.moveUnit(unit);
		}
	}
};

WP.Taskforce.prototype.onMouseUp = function () {
	taskforce.dragging = false;
}

WP.Taskforce.prototype.setCurrentSquare = function (e) {
	var point = getPoint('taskforceCanvas', e);
	this.currentSquareX = Math.floor((point.x - 4) / 58);
	this.currentSquareY = Math.floor((point.y - 7) / 58);
	if (this.currentSquareY < 0) this.currentSquareY = 0;
	if (this.currentSquareX < 0) this.currentSquareX = 0;

}

WP.Taskforce.prototype.moveUnit = function (unit) {
	var stack = taskforce.unitHolder.findStackContaining(unit);
	stack.removeUnit(unit);
	unit.holderX = taskforce.currentSquareX;
	unit.holderY = taskforce.currentSquareY;
	taskforce.updateTaskforceUnitAddress(unit);
	taskforce.unitHolder.drawTaskforce();

}
