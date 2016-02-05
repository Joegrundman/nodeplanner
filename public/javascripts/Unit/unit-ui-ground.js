WP.Unit.UI.Ground = {

	drawAirborne: function (ctx, unit) {
		WP.Unit.UI.Ground.drawInfantry(ctx, unit);
		WP.Unit.UI.makeShape(ctx, 0, 18.5, 0.8, unit.owner.foreColor, [18.5], [17.5], [16, 10, 9, 14]);
	},

	drawArmor: function (ctx, unit) {
		WP.Unit.UI.drawShield(ctx, unit);
		if (unit.lent) { WP.Unit.UI.Misc.drawLent(ctx, unit); }
		WP.Unit.UI.makeShape(ctx, 0, 0, 1, unit.owner.foreColor, [12.5], [8.5], [24.5, 8.5], [29, 12.5, 24.5, 16.5], [12.5, 16.5], [8, 12.5, 12.5, 8.5]);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
	},

	drawChindit: function (ctx, unit) {
		WP.Unit.UI.drawShield(ctx, unit);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
		WP.Unit.UI.makeShape(ctx, 1, 0, 0.8, unit.owner.foreColor, [9.5], [12], [11.5, 12.8], [17.5, 14], [21.5, 14.5], [27, 12.5], [21.5, 14], [19.5, 14], [15.2, 10.2, 9.5, 12]);
	},

	drawCommando: function (ctx, unit) {
		WP.Unit.UI.drawShield(ctx, unit);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1, unit.owner.foreColor, [10], [9], [29, 18], [27], [9], [8, 18], [14], [8.5], [10.5, 8.5], [10.5, 12], [23], [8.5], [26.5, 8.5], [26.5, 12]);
	},

	drawInfantry: function (ctx, unit) {
		var owner = unit.owner.name.toLowerCase()
		WP.Unit.UI.drawShield(ctx, unit);
		if (unit.lent) { WP.Unit.UI.Misc.drawLent(ctx, unit); }
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
		WP.Unit.UI.makeShape(ctx, 0, 0, 0.8, unit.owner.lineColor, [8], [7], [29, 18], [29], [7], [8, 18]);
	},

	drawMarine: function (ctx, unit) {
		WP.Unit.UI.drawShield(ctx, unit);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1, unit.owner.foreColor, [18.5], [16], [18.5, 10]);
		WP.Unit.UI.makeShape(ctx, 0, 18.5, 1, unit.owner.foreColor, [18.5], [11.5], [16, 11.5], [13], [13], [15, 17, 18.5, 16.5], [13], [13], [15, 17, 18.5, 15]);
		WP.Unit.UI.drawEllipse(ctx, 17.5, 8.5, 2, 2, unit.owner.foreColor, 0.8);
	},

	drawMechanized: function (ctx, unit) {
		WP.Unit.UI.Ground.drawInfantry(ctx, unit);
		WP.Unit.UI.fillEllipse(ctx, 11, 19, 3, 3, unit.owner.foreColor, 1);
		WP.Unit.UI.fillEllipse(ctx, 23, 19, 3, 3, unit.owner.foreColor, 1);
	},

	drawPartisan: function (ctx, unit) {
		WP.Unit.UI.drawShield(ctx, unit);
		WP.Unit.UI.Text.writeStrengthAndMovement(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "P", "bold 10px arial", 19, 16)
	},

	drawCommunistPartisan: function (ctx, unit) {
		var ic = unit.owner.innerColor;
		unit.owner.innerColor = new WP.Color(244, 81, 43); //red shield
		WP.Unit.UI.Ground.drawPartisan(ctx, unit);
		unit.owner.innerColor = ic;
	},

	drawAlliedPartisan: function (ctx, unit) {
		var ic = unit.owner.innerColor;
		if (unit.owner.name.toLowerCase() == "britain") { unit.owner.innerColor = new WP.Color(146, 183, 98) } //green shield
		else { unit.owner.innerColor = new WP.Color(216, 203, 159) }; //tan shield
		WP.Unit.UI.Ground.drawPartisan(ctx, unit);
		unit.owner.innerColor = ic;
	},
	drawAxisPartisan: function (ctx, unit) {
		ic = unit.owner.innerColor
		unit.owner.innerColor = new WP.Color(235, 235, 145)//white
		blackboxColor = new WP.Color(40, 40, 40)
		WP.Unit.UI.Ground.drawPartisan(ctx, unit);
		ctx.fillStyle = blackboxColor.toRgb();
		ctx.fillRect(9, 8, 19, 9);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "P", "bold 10px arial", 19, 16, unit.owner.innerColor)
		unit.owner.innerColor = ic
	},

	drawReplacement: function (ctx, unit) {
		WP.Unit.UI.drawShield(ctx, unit);
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
		WP.Unit.UI.Text.writeDesignation(ctx, unit);
	}
}
