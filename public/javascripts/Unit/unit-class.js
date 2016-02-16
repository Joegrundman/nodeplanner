'use strict';

/**
 * This class defines each game unit, air, naval, ground, miscellaneous
 */

WP.Unit = class {
    
    constructor () {
        this.id = -1;
        this.fpg = 0;
        this.type = null;
        this.name = null;
        this.size = 41;
        this.factorable = false;

        this.strength = 0;
        this.movement = 0;

        this.location = 0;

        this.hex = null;
        this.image = null;
        this.owner = null;
        this.hex = null;

        this.taskforceOwner = null;
        this.yard = null;
        this.holderX = null;
        this.holderY = null;

        this.damaged = false;
        this.highlight = null;
        this.slow = false;
        this.sunk = false;
        this.inverted = false;
        this.exploiting = false;
        this.isolated = false;
    }
    
    static unitBuilder (id, fpg, type, name, strength, moves, location, slow, sunk, damaged, inverted, exploiting, isolated) {
        var unit = new WP.Unit();
		unit.id = id;
		unit.fpg = fpg;
		unit.type = type;
		unit.name = name;
		unit.strength = strength;
		unit.movement = moves;
		unit.location = location;
		unit.slow = slow;
		unit.sunk = sunk;
		unit.damaged = damaged;
		unit.inverted = inverted;
		unit.exploiting = exploiting;
		unit.isolated = isolated;

		switch (type.toLowerCase()) {
			case "aaf":
			case "aas-attack":
			case "aas-cover":
			case "aas-search":
			case "advsub":
			case "airtransport": case "at":
			case "asw":
			case "avg":
			case "bomber":
			case "pacificbomber":
			case "partialsupply":
			case "cruiser":
			case "cve":
			case "damage":
			case "destroyer": case "dd":
			case "enas": case "elitenas":
			case "flak":
			case "grant":
			case "ic":
			case "interceptor":
			case "isolation":
			case "jet":
			case "kamikaze":
			case "nas":
			case "oil":
			case "oilplant":
			case "sub":
			case "transport": case "tr":
				unit.factorable = true;
				break;
			default:
				unit.factorable = false;
				break;
		}
		return unit;
	}

    canBeCountedInAttrition () {
        if (this.factorable) return false;
        if (this.strength < 1) return false;
        switch (this.type.toLowerCase()) {
            case "airborne":
            case "armor": case "arm":
            case "chindit":
            case "commando":
            case "infantry": case "i":
            case "marine":
            case "mechanized": case "mech":
                return true;
            default: return false;
        }
	return false;
    }
    
    canBeDamaged () {
        switch (this.type.toLowerCase()) {
            case "battleship": case "bb": case "b": case "bc":
            case "carrier": case "cv": case "cve":
            case "transport": case "tr":
            case "cruiser":
            case "cve":
            case "destroyer": case "dd":
            case "oilplant":
            case "fortress":
            case "ic":
            return true;
		default: return false;
	   }
    }
    
    canBeInverted () {
        switch (this.type.toLowerCase()) {
            case "battleship": case "bb": case "b": case "bc":
            case "carrier": case "cv": case "cve":
            case "transport": case "tr":
            case "cruiser":
            case "cve":
            case "destroyer": case "dd":
            case "aaf":
            case "nas":
            case "enas":
            case "kamikaze":
            case "sub":
            case "advsub":
            case "aas-cover":
            case "aas-attack":
            case "aas-search":
            case "avg":
            case "bomber":
            case "interceptor":
            case "oil":
            case "jet":
            case "jetsquadron":
            case "taskforce":
			return true;
		default: return false;
	   }
    }
    
    canBeIsolated () {
        switch (this.type.toLowerCase()) {
            case "infantry": case "i":
            case "mechanized": case "mech":
            case "armor": case "arm":
            case "airborne":
            case "marine":
            case "chindit":
            case "commando":
            case "replacement":case "rep":
                return true;
            default: return false;
        }
    }
    
    canSink () {
      	switch (this.type.toLowerCase()) {
            case "battleship": case "bb": case "b": case "bc": case "pb":
            case "carrier": case "cv": case "cve":
            case "transport":
            case "cruiser":
            case "cve":
            case "destroyer": case "dd":
                return true;
            default: return false;
        }
        return false;         
    }
           
    breakdownAndCreate (size) {
        if (size >= this.strength) return;
        var oldUnit = this;
        oldUnit.strength -= size;
        var unit = WP.Unit.unitBuilder(this.id, this.fpg, this.type, this.name, size | 0, this.movement, this.location, this.slow, this.sunk, this.damaged, this.inverted);
        oldUnit.owner.addUnit(unit);
        return unit;
    }
    
    canCombineWith (unit) {
        if (unit == this) { return false }
        if (!unit.factorable) { return false }
        if (unit.type != this.type) {
            var trans = /^tr$|transport/ 
            if (!(trans.test(unit.type) || !(trans.test(this.type))))
            return false }
        if (unit.type == "ASW" || unit.type == "transport" || unit.type == "tr") {
            var alliesPattern = /US|Britain/
            if (alliesPattern.test(unit.owner.name) && alliesPattern.test(this.owner.name)) {
                return true
            }
        }
        if (unit.owner != this.owner) { return false;}
        return true;
    }
    
    canExploit (){
       if (this.type == "armor" || "arm") return true;
	   return false;       
    }
    
    findStackThatMatches (stacks) {
        var res = -1
        var _this = this
        stacks.forEach((stack, i) => {
            if (_this.unitTypeExistsInStack(stack)) { res = i }
         })
        return res
    }
    
    findStackWithSameAddress (stacks) {
        var res = -1
        var _this = this
        stacks.forEach((stack, i) => {
            if (_this.unitHasSameAddress(stack)) { res = i }
        })
        return res
    }
    
    inForcepool () {
        if (this.location == 1) { return true }
        return false
    }
    
    onMap () {
        if (this.location == 2) { return true }
        return false
    }
    
    returnToForcepool () {
        this.location = 1
        this.fpg = 0

        if (this.factorable) {
            for (var i = 0; i < this.owner.units.length; i++) {
                var unit = this.owner.units[i]
                if (unit == this) continue
                if (unit.location != 1 || unit.fpg != 0) continue
                if (unit.canCombineWith(this)) {
                    unit.strength += this.strength
                    this.owner.removeUnit(this)
                    break
                }
            }
        }
    }
    
    setShipyardAddress (yard, x, y){
       this.yard = yard
	   this.holderX = x
	   this.holderY = y
    }
    
    setTaskforceAddress (tfOwner, x, y) {
        this.taskforceOwner = tfOwner
        this.holderX = x
        this.holderY = y
    }
    
    unitHasSameAddress (stack) {
        var _this = this
        return stack.units.some(unit => (unit.holderX == _this.holderX) && (unit.holderY == _this.holderY))
    }
    
    unitTypeExistsInStack (stack) {
        var _this = this
        return stack.units.some(unit => (unit.type == _this.type) && (unit.strength = _this.strength))
    }
    
}
