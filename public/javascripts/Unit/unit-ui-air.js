WP.Unit.UI.Air = {

	drawAaf: function (ctx, unit) {
		WP.Unit.UI.drawShield(ctx, unit);
		if (unit.lent) { WP.Unit.UI.Misc.drawLent(ctx, unit); }
		var lc = unit.owner.lineColor
		WP.Unit.UI.drawEllipse(ctx, 10.5, 9.5, 8, 6, lc, 1);
		WP.Unit.UI.drawEllipse(ctx, 18.5, 9.5, 8, 6, lc, 1);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
	},

	drawAasAttack: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 1, 0, 0, unit.owner.innerColor, [5], [8], [unit.size - 5, 8], [unit.size / 2, unit.size - 6]);
		WP.Unit.UI.Air.drawAas(ctx, unit);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, "ATTACK", "bold 8px verdana", 21, 10);
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
	},

	drawAasCover: function (ctx, unit) {
		ctx.fillStyle = unit.owner.innerColor.toRgb();
		ctx.fillRect(5, 8, 33, 29);
		WP.Unit.UI.Air.drawAas(ctx, unit);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, "COVER", "bold 8px verdana", 21, 10);
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
	},

	drawAasSearch: function (ctx, unit) {
		ctx.fillStyle = unit.owner.innerColor.toRgb();
		WP.Unit.UI.drawEllipse(ctx, 6.5, 8, 28, 28, unit.owner.innerColor, 1);
		ctx.fill();
		WP.Unit.UI.Air.drawAas(ctx, unit);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, "SEARCH", "bold 8px verdana", 21, 10);
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
	},

	drawAirTransport: function (ctx, unit) {
		var white = new WP.Color(255, 255, 255);
		WP.Unit.UI.drawEllipse(ctx, 9.5, 3, 20, 20, white, 1.3);
		if (unit.owner.name.toLowerCase() == "japan") { WP.Unit.UI.Air.drawTrans(ctx, unit.owner.foreColor); }
		else { WP.Unit.UI.Air.drawTrans(ctx, white); }
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		unit.name = "Air Trans";
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
	},

	drawAvg: function (ctx, unit) {
		var bc = unit.owner.backColor;
		var fc = unit.owner.foreColor;
		var ic = unit.owner.innerColor;
		var lc = unit.owner.lineColor;
		unit.owner.lineColor = new WP.Color(255, 255, 255);
		unit.owner.backColor = new WP.Color(255, 154, 49);
		unit.owner.foreColor = new WP.Color(40, 40, 40);
		unit.owner.innerColor = new WP.Color(0, 154, 206);

		WP.Unit.UI.drawBase(ctx, unit);
		WP.Unit.UI.drawShield(ctx, unit);
		if (unit.lent) { WP.Unit.UI.Misc.drawLent(ctx, unit); }
		WP.Unit.UI.drawEllipse(ctx, 10.5, 9.5, 8, 6, unit.owner.lineColor, 1);
		WP.Unit.UI.drawEllipse(ctx, 18.5, 9.5, 8, 6, unit.owner.lineColor, 1);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);

		unit.owner.backColor = bc;
		unit.owner.foreColor = fc;
		unit.owner.innerColor = ic;
		unit.owner.lineColor = lc;
	},

	drawPacificBomber: function (ctx, unit) {
		WP.Unit.UI.drawColorRect(ctx, 2, 2, 37, 22, "yellow");
		var color = new WP.Color(245, 245, 235);
		WP.Unit.UI.Text.writeDoubleGenericText(ctx, unit, "B", 'bold 8px verdana', 7, 20)
		WP.Unit.UI.Text.writeDoubleGenericText(ctx, unit, "Pac", 'bold 8px tahoma', 31, 20)
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
		WP.Unit.UI.Air.drawUsB29(ctx, unit, color);
	},

	drawBomber: function (ctx, unit) {
		WP.Unit.UI.drawColorRect(ctx, 2, 2, 37, 22, "blue");
		var color = new WP.Color(245, 245, 235);
		WP.Unit.UI.Text.writeDoubleGenericText(ctx, unit, "B", 'bold 8px verdana', 7, 20, color)
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
		switch (unit.owner.name.toLowerCase()) {
			case "britain": WP.Unit.UI.Air.drawGbBom(ctx, unit, color); break;
			case "america": case "unitedstates": case "united states": case "us": WP.Unit.UI.Air.drawUsB17(ctx, unit, color); break;
			case "russia": WP.Unit.UI.Air.drawRuBom(ctx, unit, color); break;
			default: WP.Unit.UI.Air.drawGeBom(ctx, unit, color); break;
		}
	},

	drawInterceptor: function (ctx, unit) {
		WP.Unit.UI.drawColorRect(ctx, 2, 2, 37, 22, "blue");
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
		var color = new WP.Color(255, 255, 255);
		WP.Unit.UI.Text.writeDoubleGenericText(ctx, unit, "Int", 'bold 8px tahoma', 9, 20, color)
		switch (unit.owner.name.toLowerCase()) {
			case "britain": WP.Unit.UI.Air.drawGbInt(ctx, unit, color); break;
			case "america": case "unitedstates": case "united states": case "us": WP.Unit.UI.Air.drawUsInt(ctx, unit, color); break;
			case "russia": WP.Unit.UI.Air.drawRuInt(ctx, unit, color); break;
			default: WP.Unit.UI.Air.drawGeInt(ctx, unit, color); break;
		}
	},

	drawJet: function (ctx, unit) {
		WP.Unit.UI.Text.writeBottomLeftStrength(ctx, unit);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Jet", 'bold 12px arial', 25, 38);
		switch (unit.owner.name.toLowerCase()) {
			case "britain": WP.Unit.UI.Air.drawGbJet(ctx, unit); break;
			case "america": case "unitedstates": case "united states": case "us": WP.Unit.UI.Air.drawUsJet(ctx, unit); break;
			case "germany": case "japan": WP.Unit.UI.Air.drawGeJet(ctx, unit); break;
			default: WP.Unit.UI.Air.drawRuJet(ctx, unit); break;
		}
	},

	drawKamikaze: function (ctx, unit) {
		var fc = unit.owner.foreColor;
		unit.owner.foreColor = new WP.Color(255, 130, 110);
		WP.Unit.UI.drawBase(ctx, unit);
		WP.Unit.UI.Air.drawJaNas(ctx, unit);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		unit.owner.foreColor = fc;
	},

	drawEnas: function (ctx, unit) {
		var bc = unit.owner.backColor;
		var fc = unit.owner.foreColor;
		var ic = unit.owner.innerColor;
		unit.owner.backColor = new WP.Color(246, 246, 0);
		unit.owner.foreColor = new WP.Color(40, 40, 40);
		WP.Unit.UI.drawBase(ctx, unit);
		WP.Unit.UI.Air.drawJaNas(ctx, unit);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		unit.owner.backColor = bc;
		unit.owner.foreColor = fc;
		unit.owner.innerColor = ic;
	},

	drawNas: function (ctx, unit) {
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		switch (unit.owner.name.toLowerCase()) {
			case "britain": WP.Unit.UI.Air.drawGbNas(ctx, unit); break;
			case "america": case "unitedstates": case "united states": case "us": WP.Unit.UI.Air.drawUsNas(ctx, unit); break;
			case "germany": WP.Unit.UI.Air.drawGeNas(ctx, unit); break;
			case "japan": WP.Unit.UI.Air.drawJaNas(ctx, unit); break;
			default: WP.Unit.UI.Air.drawItNas(ctx, unit); break;
		}
	},

	drawJetSquadron: function (ctx, unit) {
		switch (unit.owner.name.toLowerCase()) {
			case "britain": WP.Unit.UI.Air.drawGbJsq(ctx, unit); break;
			case "america": case "unitedstates": case "united states": case "us": WP.Unit.UI.Air.drawUsJsq(ctx, unit); break;
			case "germany": case "japan": WP.Unit.UI.Air.drawGeJsq(ctx, unit); break;
			default: WP.Unit.UI.Air.drawRuJsq(ctx, unit); break;
		}
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit, 0, 1);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
	},

	drawGbBom: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [21, 7.5], [15, 8], [6, 9], [4.5, 9.5, 6, 10], [15, 11], [21, 11], [21, 21], [16, 21], [21, 22]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 1, color, [21], [3], [21, 2], [21], [22], [21, 23.5], [17.5], [9], [17.5, 4.5], [13.5], [9], [13.5, 5]);
	},

	drawGbInt: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [20.5, 7.5], [13.5, 7.5], [9, 8, 9.5, 8.5], [13, 11.5, 20.5, 11], [21, 19.5], [18, 20.5], [18, 22, 21, 20.5]);
	},

	drawGbNas: function (ctx, unit) {
		var color = unit.owner.foreColor;
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [5], [20, 5], [20, 7], [11, 7], [9.5, 9, 11, 10.5], [17, 10.5], [20, 9], [21, 17.5], [17.5, 18.5], [17, 22, 21, 19]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 1.3, color, [21], [4.5], [18.5, 4.5], [21], [4.5], [21, 3]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, unit.owner.backColor, [21], [9], [21, 11.5]);
	},

	drawGbJet: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.5, unit.owner.foreColor, [21], [2], [20.2, 5.5], [20, 9.5], [16, 9.5], [11.5, 11], [11.5, 12.5], [20, 15.5], [21, 23.5], [17, 25], [17, 25.5], [21, 26], [16.2], [7.2], [16, 17], [15.8, 7]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.4, unit.owner.backColor, [21], [5.5], [21, 8.5]);
	},

	drawGbJsq: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.3, unit.owner.foreColor, [21], [3.5], [20.8, 5.5], [20, 10], [16.5, 10], [12.5, 11], [12.5, 12.5], [20, 14.5], [21, 20.5], [17.5, 22], [17.5, 22.5], [21, 23], [16.5], [7.5], [16.5, 16]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, unit.owner.backColor, [21], [5.5], [21, 8.5]);
	},

	drawGeBom: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [21, 8], [15, 8], [8, 9], [6.5, 9.5, 8, 10], [15, 11], [21, 11], [21, 19], [16, 20.5], [16, 21], [21, 21.5]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 1.8, color, [17], [10], [17, 4]);
	},

	drawGeInt: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [20.3, 8], [10.5, 9], [11, 10], [20.5, 11.5], [21, 19.5], [18, 20], [18, 20.5], [21, 20.5]);
	},

	drawGeNas: function (ctx, unit) {
		var color = unit.owner.foreColor
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [20.3, 8], [9.5, 8.5], [9.5, 9], [20.5, 12], [21, 19.5], [21], [19.5], [17, 19.5]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 1, color, [17.5], [8], [17.5, 6.5]);
	},

	drawGeJet: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, unit.owner.foreColor, [21], [3.5], [20.5, 5], [20, 9], [9.5, 12.2], [9.5, 12.5], [20, 12.5], [21, 20.5], [17, 22], [17, 23, 21, 21.5], [15.5], [7], [15.5, 15]);
	},

	drawGeJsq: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.5, unit.owner.foreColor, [21], [5], [20.5, 7], [20, 10], [11.5, 12.2], [11.5, 12.5], [20.5, 12.5], [21, 18.5], [18, 20], [18, 21, 21, 19.5], [16.5], [8], [16.5, 15]);
	},

	drawUsB17: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [21, 7.5], [7, 9], [5.5, 9.5, 7, 10], [21, 11.5], [21, 19.5], [15, 20.5], [15, 21], [21, 22]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 1, color, [21], [3], [21, 2], [21], [22], [21, 23.5], [17.5], [9], [17.5, 4.5], [14.5], [9], [14.5, 5]);
	},

	drawUsB29: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [21, 8.5], [5, 10.5], [5, 11], [21, 11.5], [21, 20.5], [16, 21.5], [16, 22], [21, 22]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 1, color, [21], [3], [21, 2], [21], [22], [21, 23.5], [17.5], [11], [17.5, 6], [13.5], [11], [13.5, 6.5]);
	},

	drawUsInt: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.3, color, [21], [4], [20, 8.5], [10.5, 9.2], [10.5, 12, 20, 11.9, ], [21, 19.5], [16.5, 21], [18.5, 23, 21, 21]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 0.4, color, [21], [3.5], [18, 3.5]);
	},

	drawUsNas: function (ctx, unit) {
		var color = unit.owner.foreColor
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [4], [20.5, 4], [20, 8.2], [10, 9], [10, 10], [20, 12], [21, 19], [17, 20.5], [18, 21.5, 21, 20.5]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 0.5, color, [21], [3.5], [18, 3.5], [21], [4], [21, 2.5]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.8, unit.owner.backColor, [21], [8.5], [21, 11.5]);
	},

	drawUsJet: function (ctx, unit) {
		var color = unit.owner.foreColor
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [21, 5], [19.5, 10], [10, 12.3], [10, 12.5], [20, 14], [21, 20], [17, 22], [17, 22.2], [21, 22.2], [21], [22], [21, 23.5]);
		WP.Unit.UI.makeShape(ctx, 1, 21, 0.7, color, [10], [9.5], [10, 15.5], [10], [15.5], [11, 12.5, 10, 9.5]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.5, unit.owner.backColor, [21], [7.5], [21, 11.5]);
	},

	drawUsJsq: function (ctx, unit) {
		var color = unit.owner.foreColor
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.5, color, [21], [5], [21, 7], [19.5, 11], [12, 12.3], [12, 12.5], [20, 14], [21, 19], [16, 21], [16, 21.2], [21, 21.2], [21], [21], [21, 22.5]);
		WP.Unit.UI.makeShape(ctx, 1, 21, 0.7, color, [11], [10.5], [11, 14.5], [11], [14.5], [12, 12.5, 11, 10.5]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.5, unit.owner.backColor, [21], [8.5], [21, 11.5]);
	},

	drawRuBom: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [3], [21, 8], [5, 10], [6, 10], [21, 12], [21, 20.5], [17, 20.5], [16.5, 21], [21, 21]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 1.8, color, [16.5], [10], [16.5, 5.5]);
	},

	drawRuInt: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.5, color, [21], [4], [20, 9], [10, 11], [11, 11], [20, 13], [21, 19], [17.5, 20.5], [18, 21.5, 21, 21.2]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.5, new WP.Color(11, 128, 244), [21], [9.5], [21, 13.5]);
	},

	drawRuJet: function (ctx, unit, color) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, unit.owner.foreColor, [21], [4], [20.5, 4], [19.5, 9], [11, 16], [11.5, 17.5], [19.5, 13], [21, 22], [17, 25], [17, 25.2], [21, 23.5]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.5, unit.owner.backColor, [21], [7.5], [21, 12]);
	},

	drawRuJsq: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.5, unit.owner.foreColor, [21], [6], [20.5, 6], [20, 10], [13, 16], [13.2, 17], [20, 13], [21, 20], [17.5, 23], [17.5, 23.2], [21, 21.5]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.5, unit.owner.backColor, [21], [9], [21, 12]);
	},

	drawJaNas: function (ctx, unit) {
		var color = unit.owner.foreColor
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [20.5], [4], [20, 6.7], [10, 7.8], [8.5, 8.8, 10, 9.2], [20, 11], [21, 17.5], [16.5, 19.5], [16.5, 19.7], [21, 20]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 0.5, color, [21], [3.5], [21, 2.5], [21], [3.5], [16.5, 3.5]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, unit.owner.backColor, [21], [6.5], [21, 11.5]);
	},

	drawItNas: function (ctx, unit) {
		var color = unit.owner.foreColor
		WP.Unit.UI.makeShape(ctx, 1, 21, 1.8, color, [21], [4.5], [20.5, 4.5], [20, 9], [20, 7], [19, 7], [19, 8], [11, 8], [8.2, 9, 11, 10.5], [20, 10.5], [21, 18.5], [17.5, 20.5], [17.5, 22, 21, 21]);
		WP.Unit.UI.makeShape(ctx, 0, 21, 0.5, color, [21], [4.5], [21, 3.5], [21], [4.5], [17, 4.5]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, unit.owner.backColor, [21], [10.5], [21, 13]);
	},

	drawTrans: function (ctx, color) {
		WP.Unit.UI.makeShape(ctx, 1, 19.5, 1, color, [19.5], [8.5], [19.5, 11.2], [11.5, 13], [19.5, 14.3], [19.5, 18.5]);
		WP.Unit.UI.makeShape(ctx, 0, 19.5, 1, color, [16.5], [11.5], [16.5, 10.5], [19.5], [18.5], [16, 18.5]);
	},

	drawAas: function (ctx, unit) {
		var color = unit.owner.foreColor
		WP.Unit.UI.makeShape(ctx, 0, 20.5, 1, color, [20.5], [21], [20.5, 13], [20.5], [17.5], [14, 17.5], [20.5], [21.5], [2.5, 20.5], [20.5], [20.5], [10.5, 20.5], [17.5], [22.5], [16.5, 22.5]);
		WP.Unit.UI.makeShape(ctx, 0, 20.5, 0.5, color, [14.5], [22], [11.5, 22]);
		WP.Unit.UI.fillEllipse(ctx, 18, 16.5, 5, 5, color, 1);
	}
}
