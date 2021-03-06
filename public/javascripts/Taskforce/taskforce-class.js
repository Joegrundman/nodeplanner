'use strict';

/**
 * creates a WP.Taskforce, a container to group naval and naval air units
 * @class
 */

WP.Taskforce = class {
    /**
     * Create a taskforce
     */
    constructor () {
       /**
        * @property {number} id - id of the taskforce
        * @property {object} owner - country object to which taskforce belongs
        * @property {number} size - number of taskforces that this country can have at one time
        * @property {object} taskforceUnits - individual ships and NAS in current taskforce object
        * @property {object} unitHolder - currently instantiated holder object for the stacks of units in the taskforce
        * @property {number} currentSquareX - x coordinate(of taskforce grid) of the currently selected unit
        * @property {number} currentSquareY - y coordinate(of taskforce grid) of the currently selected unit
        * @property {boolean} dragging - whether the currently selected unit can be dragged
        */
        this.id = null;
        this.owner = null;
        this.size = null;
        this.taskforceUnits = new Array();
        this.unitHolder = null;
        this.currentSquareX = null;
        this.currentSquareY = null;
        this.dragging = false;       
    }
    
    /**
     * Build an instance of taskforce
     * @static
     * taskforceBuilder
     * @param {number} id - the taskforce id number
     * @param {object} owner - the country to which the taskforce belongs
     * @param {number} size - the number of factors currently in the taskforce
     * @returns {object} instance of taskforce
     */
    
    static taskforceBuilder (id, owner, size) {
        var taskforce = new WP.Taskforce()
        taskforce.id = id
        taskforce.owner = owner;
		taskforce.size = size;
		return taskforce;
    }
    
    
    /**
     * Adds a unit to the taskforce
     * @param {object} taskforceUnit - the unit to be added to the taskforce
     */
    addTaskforceUnit (taskforceUnit) {
        this.taskforceUnits.push(taskforceUnit)
    }
    /**
     * Removes a unit from the taskforce
     * @param {object} taskforce - this taskforce instance from which the unit will be removed
     * @param {object} unit - the unit to be removed from the taskforce
     */    
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
    /**
     * Updates the current address of the unit in the taskforce to match the address of the unit
     * @param {object} unit - the unit to which the taskforce address must be matched
     */     
    updateTaskforceUnitAddress (unit) {
        var taskforce = game.selectedTaskforce;
        for (var i = 0; i < taskforce.taskforceUnits.length; i++) {
            if (taskforce.taskforceUnits[i].id == unit.id) {
                taskforce.taskforceUnits[i].x = unit.holderX;
                taskforce.taskforceUnits[i].y = unit.holderY;
            }
        }        
    }
    /**
     * Draws the units onto the taskforce display
     */
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
    /**
     * Upon selecting a taskforce owner, this function draws a new flag and updates details
     * @param {object} owner -  the current owner of the taskforce
     */
    handleTaskforceSelected (owner) {
        var taskforce = game.getTaskforceFromOwner(owner);
        var cty = game.getCountryFromName(owner);
        game.setSelectedTaskforce(taskforce);
        $("#tfCountryFlag").attr("src", WP.Country.UI.getFlagUrl(cty));
        taskforce.draw();
    }
    /**
     * Upon clicking the mouse button, this function finds the unit in the taskforce display under the mouse cursor
     * @param {object} e -  the mouse event object
     */    
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

    /**
     * Upon double clicking the mouse, this function rotates the units in the stack under the mouse cursor
     */ 
    
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
    /**
     * Upon moving the mouse, this function drags the currently selected unit
     * @param {object} e - the mouse event object
     */     
    onMouseMove (e) {
        taskforce.setCurrentSquare(e);
        if (game.selectedUnit && taskforce.dragging == true) {
            var unit = game.selectedUnit;
            if ((taskforce.currentSquareX != unit.holderX) || (taskforce.currentSquareY != unit.holderY)) {
                taskforce.moveUnit(unit);
            }
        }        
    }
    /**
     * Upon letting go of the mouse button, this function stops dragging the currently selected unit
     */     
    onMouseUp () {
        taskforce.dragging = false
    }
    /**
     * Upon moving the mouse, this function finds the taskforce square currently under the cursor
     * @param {object} e - the mouse event object
     */     
    setCurrentSquare (e) {
        var point = getPoint('taskforceCanvas', e);
        this.currentSquareX = Math.floor((point.x - 4) / 58);
        this.currentSquareY = Math.floor((point.y - 7) / 58);
        if (this.currentSquareY < 0) this.currentSquareY = 0;
        if (this.currentSquareX < 0) this.currentSquareX = 0;       
    }
    /**
     *  Updates the unit address to match its location after being dragged
     * @param {object} unit - the unit that has been moved
     */     
    moveUnit (unit) {
        var stack = taskforce.unitHolder.findStackContaining(unit);
        stack.removeUnit(unit);
        unit.holderX = taskforce.currentSquareX;
        unit.holderY = taskforce.currentSquareY;
        taskforce.updateTaskforceUnitAddress(unit);
        taskforce.unitHolder.drawTaskforce();        
    }
}

