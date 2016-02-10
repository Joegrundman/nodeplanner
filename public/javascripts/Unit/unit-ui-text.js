WP.Unit.prototype.toString = function () {
	return this.type + ", name: " + this.name + ", strength: " + this.strength + ", movement: " + this.movement + ", id: " + this.id;
}

WP.Unit.UI.Text = {
	writeDesignation: function (ctx, unit) {
		var owner = unit.owner.name.toLowerCase()
		if (!(unit.name == null)) {
			ctx.save();
			ctx.font = '8px verdana';
			ctx.textAlign = "right";
			ctx.fillStyle = unit.owner.foreColor.toRgb();
			ctx.rotate(4.71);
			ctx.fillText(unit.name, -3, 38, 25);
			//if ((owner == "germany") || (owner == "japan") || (owner == "thailand")) { ctx.fillText(unit.name, -3, 38, 25); }
			ctx.restore();
		}
	},

	writeStrengthAndMovement: function (ctx, unit) {
		var useMove;
		if (game.currentMap == game.maps[1] && unit.location == 2) {
			switch (unit.type) {
				case "airtransport": case "at": case "air trans":
				case "aaf":
				case "armor": case "arm": useMove = 3; break;
				case "mechanized": case "mech":
				case "chindit":
				case "airborne":
				case "marine":
				case "commando":
				case "partisan": case "px": case "pw": case "pc":
				case "alliedpartisan": case "axispartisan": case "communistpartisan": case "compartisan":
				case "infantry": case "i": useMove = 2; break;
				default: useMove = unit.movement;
			}
		}
		else useMove = unit.movement;
		ctx.font = "bold 16px arial";
		ctx.textAlign = "center";
		ctx.fillStyle = unit.owner.foreColor.toRgb();
		var sp = 11;
		var dp = 18;
		var mp = 26;

		if (unit.strength > 9) {
			sp += 1;
			dp += 5;
			mp += 5;
		}

		ctx.fillText(unit.strength, sp, 35);
		ctx.fillText("-", dp, 35);
		ctx.fillText(useMove, mp, 35);
	},

	writeBottomLeftStrength: function (ctx, unit) {
		ctx.font = 'bold 14px arial';
		ctx.textAlign = "center";
		ctx.fillStyle = unit.owner.foreColor.toRgb();
		ctx.fillText(unit.strength, 10, 39, 37);
	},

	writeBottomMiddleStrength: function (ctx, unit, x, y) {
		if (x == null) { x = 0 }
		if (y == null) { y = 0 }
		WP.Unit.UI.Text.writeMiddleStrength(ctx, unit, 38 + x, y);
	},

	writeTopMiddleStrength: function (ctx, unit, x, y) {
		if (x == null) { x = 0 }
		if (y == null) { y = 0 }
		WP.Unit.UI.Text.writeMiddleStrength(ctx, unit, 16);
	},

	writeMiddleStrength: function (ctx, unit, x, y) {
		if (x == null) { x = 0 }
		if (y == null) { y = 0 }
		ctx.font = "bold 16px arial";
		ctx.textAlign = "center";
		ctx.fillStyle = unit.owner.foreColor.toRgb();
		ctx.fillText(unit.strength, 20 + y, x);
	},

	writeTopText: function (ctx, unit, text) {
		ctx.font = '10px arial';
		ctx.textAlign = "center";
		ctx.fillStyle = unit.owner.foreColor.toRgb();
		ctx.fillText(text, 20, 10, 37);
	},

	writeGenericText: function (ctx, unit, text, font, xMod, yMod, color) {
		if (xMod == null) { xMod = 21 }
		if (yMod == null) { yMod = 22 }
		if (color == null) { color = unit.owner.foreColor }
		ctx.font = font;
		ctx.textAlign = "center";
		ctx.fillStyle = color.toRgb();
		ctx.fillText(text, xMod, yMod, 40);
	},

	writeDoubleGenericText: function (ctx, unit, text, font, xMod, yMod, color) {
		WP.Unit.UI.Text.writeGenericText(ctx, unit, text, font, xMod, yMod, color);
        // advances in chrome rendering make doubling text obsolete
		// WP.Unit.UI.Text.writeGenericText(ctx, unit, text, font, xMod, yMod, color);
	},

	writeAutoGenericText: function (ctx, unit, text, font, xMod, yMod, color) {
	//	if ((unit.owner.name == "germany") || (unit.owner.name == "japan")) { WP.Unit.UI.Text.writeGenericText(ctx, unit, text, font, xMod, yMod, color); }
		WP.Unit.UI.Text.writeGenericText(ctx, unit, text, font, xMod, yMod, color);
	},

	writeShipType: function (ctx, unit, text) {
		var owner = unit.owner.name.toLowerCase();
		if (unit.name.length <= 8) { ctx.font = 'italic bold 8px tahoma'; }
		else { ctx.font = 'italic bold 7px tahoma'; }
		ctx.textAlign = "center";
		ctx.fillStyle = unit.owner.foreColor.toRgb();
		//makes sure ship name for dds and cas appears on top right for minor country units
		if (!(unit.type == "dd") && !(unit.type == "destroyer") && !(unit.type == "cruiser") && !(unit.type == "Cruiser")) {
			ctx.fillText(unit.name, 20, 10, 37);
			// if ((owner == "germany") || (owner == "japan")) {
			// 	ctx.fillText(unit.name, 20, 10, 37);
			// }
		}

		var color = unit.owner.foreColor;

		ctx.font = 'bold 14px helvetica';
		ctx.textAlign = "left";
		ctx.fillStyle = color.toRgb();
		ctx.fillText(unit.strength, 24, 38, 37);

		WP.Unit.UI.Text.writeShipCode(ctx, text, color);
	},

	writeShipCode: function (ctx, text, color) {
		switch (text) {
			case "DD":
				WP.Unit.UI.Text.drawD(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawD(ctx, color, 17, 34);
				break;
			case "CA":
				WP.Unit.UI.Text.drawC(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawA(ctx, color, 17, 34);
				break;
			case "BB":
				WP.Unit.UI.Text.drawB(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawB(ctx, color, 17, 34);
				break;
			case "BC":
				WP.Unit.UI.Text.drawB(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawC(ctx, color, 17, 34);
				break;
			case "PB":
				WP.Unit.UI.Text.drawP(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawB(ctx, color, 17, 34);
				break;
			case "CV":
				WP.Unit.UI.Text.drawC(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawV(ctx, color, 17, 34);
				break;
			case "CVB":
				WP.Unit.UI.Text.drawC(ctx, color, 4, 34);
				WP.Unit.UI.Text.drawV(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawB(ctx, color, 18, 34);
				break;
			case "CVE":
				WP.Unit.UI.Text.drawC(ctx, color, 4, 34);
				WP.Unit.UI.Text.drawV(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawE(ctx, color, 18, 34);
				break;
			case "CVL":
				WP.Unit.UI.Text.drawC(ctx, color, 4, 34);
				WP.Unit.UI.Text.drawV(ctx, color, 10, 34);
				WP.Unit.UI.Text.drawL(ctx, color, 18, 34);
				break;
			default:
				ctx.font = 'bold 9px verdana';
				ctx.textAlign = "right";
				ctx.fillStyle = color.toRgb();
				ctx.fillText(text, 23, 38, 37);
				break;
		}

	},

	drawA: function (ctx, color, x, y) { WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [x + 0], [y + 3.5], [x + 2.5, y - 3.2], [x + 3.5, y - 3.2], [x + 6, y + 3.5], [x + 1], [y + 1.8], [x + 5, y + 1.8]); },
	drawB: function (ctx, color, x, y) { WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [x + 0], [y - 0.5], [x + 0, y - 3.2], [x + 2.8, y - 3.2], [x + 5, y - 2.5, x + 2.8, y - 0.5], [x + 0, y - 0.5], [x + 0], [y - 0.5], [x + 0, y + 3.2], [x + 2.8, y + 3.2], [x + 5.5, y + 1.5, x + 2.8, y - 0.5]); },
	drawC: function (ctx, color, x, y) { WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [x + 0], [y - 0], [x + 0, y - 1.5], [x + 1.5, y - 5.2, x + 4.8, y - 1.5], [x + 0], [y + 0], [x + 0, y + 1.5], [x + 1.5, y + 5.2, x + 4.8, y + 1.5]); },
	drawD: function (ctx, color, x, y) { WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [x + 0], [y + 0], [x + 0, y - 3.2], [x + 2.5, y - 3.2], [x + 4, y - 3, x + 4.5, y + 0], [x + 0], [y + 0], [x + 0, y + 3.2], [x + 2.5, y + 3.2], [x + 4, y + 3, x + 4.5, y + 0]); },
	drawE: function (ctx, color, x, y) { WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [x + 0], [y - 0.5], [x + 0, y - 3.2], [x + 4.8, y - 3.2], [x + 0], [y - 0.5], [x + 3.8, y - 0.5], [x + 0], [y - 0.5], [x + 0, y + 3.2], [x + 4.8, y + 3.2]); },
	drawL: function (ctx, color, x, y) { WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [x + 0], [y - 0.5], [x + 0, y - 3.7], [x + 0], [y - 0.5], [x + 0, y + 3.2], [x + 4.8, y + 3.2]); },
	drawP: function (ctx, color, x, y) { WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [x + 0], [y - 0.5], [x + 0, y - 3.2], [x + 2.8, y - 3.2], [x + 5, y - 2.5, x + 2.8, y - 0.5], [x + 0, y - 0.5], [x + 0], [y - 0.5], [x + 0, y + 3.2]); },
	drawV: function (ctx, color, x, y) { WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [x + 2.5], [y + 3.5], [x + 0.5, y - 3.5], [x + 3.5], [y + 3.5], [x + 5.5, y - 3.5]); }

}
