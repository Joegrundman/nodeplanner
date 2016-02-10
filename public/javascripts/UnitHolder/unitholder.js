WP.UnitHolder = function () {
	this.ctx = null;
	this.units = null;
	this.stacks = []
	this.stackSimilar = false;
}

WP.UnitHolder.Util = {

	needsDraw: function (holder) {
		holder.stacks = new Array();
		holder.ctx.clearRect(0, 0, holder.ctx.canvas.width, holder.ctx.canvas.height);
		if (holder.units && holder.units.length > 0)
		    return true;
		return false;
	},

	unitHolderBuilder: function (ctx, div) {
		var holder = new WP.UnitHolder();
		ctx.canvas.width = div.width() - 5;
		ctx.canvas.height = div.height() - 5;
		holder.ctx = ctx;
		return holder;
	}
}

WP.UnitHolder.prototype.drawSingle = function () {
	// for (var i = 0; i < this.units.length; i++) {
	// 	var newStack = new WP.UnitStack();
	// 	newStack.units[0] = this.units[i];
	// 	this.stacks[this.stacks.length] = newStack;
	// }
    var these = this
    these.units.forEach(function(u){
        var newStack = new WP.UnitStack()
        newStack.units[0] = u
        these.stacks.push(newStack)
    })
	these.drawAllStacks();
}

WP.UnitHolder.prototype.drawStacked = function () {
	for (var i = this.units.length - 1; i > -1; i--) {
		var matchingStack = this.units[i].findStackThatMatches(this.stacks);
		if (matchingStack < 0) {
			//this.stacks[this.stacks.length] = new WP.UnitStack();
            this.stacks.push(new WP.UnitStack())
			matchingStack = this.stacks.length - 1;
		}

		var stackToAdd = this.stacks[matchingStack];
	//	stackToAdd.units[stackToAdd.units.length] = this.units[i];
    stackToAdd.units.push(this.units[i])
	}
	this.drawAllStacks();
}

WP.UnitHolder.prototype.draw = function () {
	if (WP.UnitHolder.Util.needsDraw(this)) {
		if (this.stackSimilar)
			this.drawStacked();
		else
			this.drawSingle();
	}
}

WP.UnitHolder.prototype.drawShipyard = function () {
	if (WP.UnitHolder.Util.needsDraw(this)) {
		for (var i = this.units.length - 1; i > -1; i--) {
			var matchingStack = this.units[i].findStackWithSameAddress(this.stacks);
			if (matchingStack < 0) {
				this.stacks[this.stacks.length] = new WP.UnitStack();
				matchingStack = this.stacks.length - 1;
			}

			var stackToAdd = this.stacks[matchingStack];
			stackToAdd.units.push(this.units[i]);
		}
		this.drawShipyardStacks();
	}
}

WP.UnitHolder.prototype.drawShipyardStacks = function () {
	var x;
	var y;

	for (var s = 0; s < this.stacks.length; s++) {
		var unit_x = this.stacks[s].units[0].holderX;
		var unit_y = this.stacks[s].units[0].holderY;
		x = 10 + (unit_x * 66);
		y = 30 + (unit_y * 66);
		this.ctx.drawUnits(this.stacks[s].units, x, y);
		this.stacks[s].x = x;
		this.stacks[s].y = y;
	}
}

WP.UnitHolder.prototype.drawTaskforce = function () {
	if (WP.UnitHolder.Util.needsDraw(this)) {
		for (var i = this.units.length - 1; i > -1; i--) {
			var matchingStack = this.units[i].findStackWithSameAddress(this.stacks);
			if (matchingStack < 0) {
				this.stacks[this.stacks.length] = new WP.UnitStack();
				matchingStack = this.stacks.length - 1;
			}

			var stackToAdd = this.stacks[matchingStack];
			stackToAdd.units.push(this.units[i]);
		}
		this.drawTaskforceStacks();
	}
}

WP.UnitHolder.prototype.drawTaskforceStacks = function () {
	var x;
	var y;

	for (var s = 0; s < this.stacks.length; s++) {
		var unit_x = this.stacks[s].units[0].holderX;
		var unit_y = this.stacks[s].units[0].holderY;
		x = 4 + (unit_x * 58);
		y = 7 + (unit_y * 58);
		this.ctx.drawUnits(this.stacks[s].units, x, y);
		this.stacks[s].x = x;
		this.stacks[s].y = y;
	}
}

WP.UnitHolder.prototype.drawAllStacks = function () {
	var md = 12;
	var x = md - 3;
	var y = md - 3;
	var size = this.stacks[0].units[0].size;

	for (var s = 0; s < this.stacks.length; s++) {
		if (x > this.ctx.canvas.width - size) {
			x = md - 3;
			y += size + md;
		}

		this.ctx.drawUnits(this.stacks[s].units, x, y);
		this.stacks[s].x = x;
		this.stacks[s].y = y;
		x += size + md + 2;
	}
}

WP.UnitHolder.prototype.drawStack = function (stack) {
	if (stack) this.ctx.drawUnits(stack.units, stack.x, stack.y);
}

WP.UnitHolder.prototype.findStackContaining = function (unit) {
	for (var i = 0; i < this.stacks.length; i++) {
		var stack = this.stacks[i];
		if (stack.units) {
			for (var x = 0; x < stack.units.length; x++) {
				if (stack.units[x] == unit)
					return stack;
			}
		}
	}
	return null;
}

WP.UnitHolder.prototype.findStackFor = function (x, y) {
	for (var i = 0; i < this.stacks.length; i++) {
		var stack = this.stacks[i];
		if (stack.x < x && stack.x + 53 > x) {
			if (stack.y < y && stack.y + 53 > y) {
				return stack;
			}
		}
	}
	return null;
}


