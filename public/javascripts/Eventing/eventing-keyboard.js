WP.Eventing.Keyboard = {
	handleKeyDown: function (keyCode) {
		keyPress = keyCode;
		var map = game.currentMap;
		var unit = game.selectedUnit;
		var hex = game.currentMap.currentHex;
		//if (keyPress != 116) alert(keyPress);
		switch (keyPress) {
			case 27: // esc
				WP.Eventing.Keyboard.handleEsc(unit, map);
				break;
			case 46: // delete
				WP.Eventing.Keyboard.handleDeleteKey(unit);
				break;
			case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57:
				WP.Eventing.Keyboard.handleNumberKey(keyPress, unit, map);
				break;
			case 67: // c => combine
				WP.Eventing.Keyboard.handleC(unit, map, hex);
				break;
			case 68: // d => mark damaged
				WP.Eventing.Keyboard.handleD(unit, map, hex);
				break;
			case 69: // e => mark eliminated
				WP.Eventing.Keyboard.handleE(unit, map, hex);
				break;
			case 73: // i  => mark inverted or isolated
				WP.Eventing.Keyboard.handleI(unit, map, hex);
				break;
			case 76: // l => mark lent
				WP.Eventing.Keyboard.handleL(unit, map, hex);
				break;
			case 83: // s => mark sunk
				WP.Eventing.Keyboard.handleS(unit, map, hex);
				break;
            case 85: // u => undo
                WP.Eventing.Keyboard.handleU(unit, map, hex);
                break;
			case 88: // x => mark exploiting
				WP.Eventing.Keyboard.handleX(unit, map, hex);
				break;
			default:
				break;
		}
	},

	handleC: function (unit, map, hex) {
		if (!unit) return;
		if (!unit.onMap()) return;
		if (!hex) return;
		hex.combineAllUnits(unit);
		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
	},

	handleD: function (unit, map, hex) {
		if (!unit) return;
		if (unit.canBeDamaged())
			unit.damaged = !unit.damaged;
		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
	},

	handleE: function (unit, map, hex) {
		if (!unit) return;
		unit.eliminated = !unit.eliminated;
		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
	},

	handleI: function (unit, map, hex) {
		if (!unit) return;
		if (unit.canBeInverted())
			unit.inverted = !unit.inverted;
		if (unit.canBeIsolated())
			unit.isolated = !unit.isolated;
		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
	},

	handleL: function (unit, map, hex) {
//		if (!unit) return;
//		if (unit.canBeLent())
//			unit.lent = !unit.lent;
//		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
	},



	handleDeleteKey: function (unit) {
		if (unit && unit.onMap()) {
			if (unit.hex) {
				var hex = unit.hex;
				hex.removeUnit(unit);
			}
			unit.returnToForcepool();
			WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
		}
	},

	handleEsc: function (unit, map) {
		WP.Misc.Ui.closeAllDialogs();
		var hex;
		if (unit) hex = unit.hex;

		game.state = 0;
		game.selectedUnit = null;
		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
		map.redrawHexesContainingUnits(game.getAllHighlightedUnits());
	},

	handleNumberKey: function (keyPress, unit, map) {
		if (!unit) return;
		var hex = unit.hex;
		unit = unit.breakdownAndCreate(-(48 - keyPress));
		if (hex)
			hex.addUnit(unit);
		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
	},

	handleKeyUp: function () {
		keyPress = null;
	},

	handlePostKeyboardAction: function (unit, map, hex) {
		game.selectedUnit = null;
		if (hex) {
			hex.clear();
			hex.draw();
			map.displayMapUnitsInHexInfo(true);
			return;
		}
		if (unit) {
			if (forcepool && unit.inForcepool()) {
				forcepool.draw();
				return;
			}
		}
	},

	handleS: function (unit, map, hex) {
		if (!unit) return;
		if (unit.canSink())
			unit.sunk = !unit.sunk;
		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
	},
    
    /**
     * ignores key command to send unit back to turn start hex
     * if not a unit selected, or if unit has no current hex id
     * or if unit has hexIdAtTurnStart property
     */
    
    handleU: function (unit, map, hex) {
        if (!unit || !unit.hex.id || !unit.hexIdAtTurnStart) return;
        if (unit.hex && unit.hex.id != unit.hexIdAtTurnStart) {
            hex = map.getHexFromId(unit.hexIdAtTurnStart)
            map.moveUnitTo(unit, hex)
        }
        WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex)
    },

	handleX: function (unit, map, hex) {
		if (!unit) return;
		if (unit.canExploit()) { unit.exploiting = !unit.exploiting; }
		WP.Eventing.Keyboard.handlePostKeyboardAction(unit, map, hex);
	}
}

function ctrlPressed() {
	if (keyPress == 17) return true;
	return false;
}

function shiftPressed() {
	if (keyPress == 16) return true;
	return false;
}
