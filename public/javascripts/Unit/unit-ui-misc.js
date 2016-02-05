WP.Unit.UI.Misc = {

	drawAirbase: function (ctx, unit) {
		var white = new WP.Color(255, 255, 255);
		var color = unit.owner.foreColor
		var owner = unit.owner.name.toLowerCase()
		if ((owner == "japan") ||
		(owner == "nationalist china") ||
		(owner == "natchina"))
		{ WP.Unit.UI.drawEllipse(ctx, 7, 6.5, 27, 27, color, 1.8); }
		else { WP.Unit.UI.drawEllipse(ctx, 7, 6.5, 27, 27, white, 1.8); }
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.8, color, [10.5], [21], [30.5, 21], [13.5], [25.5], [26.5, 13.5]);
	},

	drawAtomicAttack: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(30, 30, 30);
		var red = new WP.Color(225, 80, 30);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Atomic", "bold 8px tahoma", null, 27, black);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Attack", "bold 8px tahoma", null, 35, black);
		WP.Unit.UI.makeShape(ctx, 0, 20, 1.5, black, [4], [18], [20, 18], [7], [18], [7, 16], [10], [18], [10, 15], [13], [18], [13, 16]);
		ctx.fillStyle = red.toRgb();
		WP.Unit.UI.fillEllipse(ctx, 10, 3, 20, 8, red, 0);
		WP.Unit.UI.makeShape(ctx, 1, 0, 0, red, [19], [10], [17, 15], [23, 15], [21, 10]);
	},

	drawBeachDefense: function (ctx, unit) {
		var bc = unit.owner.backColor
		unit.owner.backColor = new WP.Color(250, 233, 137);
		var white = new WP.Color(245, 245, 245);
		var darkgray = new WP.Color(68, 81, 130);
		var lightgray = new WP.Color(180, 180, 180);
		var blue = new WP.Color(158, 191, 210);
		WP.Unit.UI.drawBase(ctx, unit);
		WP.Unit.UI.makeShape(ctx, 0, 0, 5, white, [0], [30], [5, 32], [10, 33], [13, 33], [15, 31], [22, 30], [25, 28], [27, 27], [32, 28], [41, 30]);
		WP.Unit.UI.makeShape(ctx, 1, 0, 1, blue, [0], [30], [5, 32], [10, 33], [13, 33], [15, 31], [22, 30], [25, 28], [27, 27], [32, 28], [41, 30], [41, 41], [0, 41], [0, 30]);
		WP.Unit.UI.makeShape(ctx, 0, 20, 1.3, darkgray, [4.5], [14.5], [8.5, 21.5], [4.5], [21.5], [8.5, 14.5], [13.5], [14.5], [17.5, 21.5], [13.5], [21.5], [17.5, 14.5]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, darkgray, [8], [7], [4.5, 12], [20], [7], [20, 13], [32], [7], [35.5, 12]);
		ctx.fillStyle = lightgray.toRgb();
		WP.Unit.UI.fillEllipse(ctx, 5, 4, 6, 6, lightgray, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 17, 4, 6, 6, lightgray, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 29, 4, 6, 6, lightgray, 0.5);
		WP.Unit.UI.drawEllipse(ctx, 5, 4, 6, 6, darkgray, 0.8);
		WP.Unit.UI.drawEllipse(ctx, 17, 4, 6, 6, darkgray, 0.8);
		WP.Unit.UI.drawEllipse(ctx, 29, 4, 6, 6, darkgray, 0.8);
		unit.owner.backColor = bc
	},

	drawBreakthrough: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(30, 30, 30);
		var red = new WP.Color(225, 80, 30);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Break", "bold 8px tahoma", 20, 27, black);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Through", "bold 8px tahoma", 20, 35, black);
		WP.Unit.UI.makeShape(ctx, 0, 20, 1.5, black, [4], [15], [14, 15], [16, 13, 12, 11]);
		WP.Unit.UI.makeShape(ctx, 1, 20, 0.1, red, [20], [20], [16, 20], [18, 8], [15, 8], [20, 3]);
	},

	drawBridgehead: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(20, 20, 20);
		var blue = new WP.Color(140, 200, 235);
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.fillStyle = blue.toRgb();
		ctx.arc(20.5, 20.5, 13, 0, 3.14, 0);
		ctx.fill();
		WP.Unit.UI.drawEllipse(ctx, 7.5, 7.5, 26, 26, black, 1.3);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "BH", "bold 13px helvetica", null, 26, black);
	},

	drawDamage: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(20, 20, 20);
		var red = new WP.Color(225, 80, 30);
		WP.Unit.UI.makeShape(ctx, 1, 0, 1.4, black, [12], [21], [15, 18.5], [15, 21], [17], [21], [20, 18.5], [20, 21], [22], [21], [25, 18.5], [25, 21], [28], [21], [28, 11], [32], [21], [32, 11]);
		ctx.fillStyle = black.toRgb();
		ctx.fillRect(9, 20, 26, 5);
		WP.Unit.UI.makeShape(ctx, 1, 20, 0.1, red, [5], [14], [11, 14], [8, 8], [5, 14]);
		WP.Unit.UI.makeShape(ctx, 1, 20, 0.1, red, [13], [14], [19, 14], [16, 8], [13, 14]);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Damaged", "bold 7px tahoma", null, 35, black);
	},

	drawDone: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(20, 20, 20);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "DONE", "bold 8px tahoma", null, 21, black);
	},

	drawExploit: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(30, 30, 30);
		var red = new WP.Color(225, 80, 30);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Exploit", "bold 8px tahoma", null, 36, black);
		WP.Unit.UI.makeShape(ctx, 0, 20, 1.5, black, [4], [25], [14, 25], [16, 23, 12, 21]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 3, red, [19], [26], [20, 14, 11, 11], [20], [26], [20, 6], [21], [26], [22, 12, 32, 15]);
		WP.Unit.UI.makeShape(ctx, 1, 0, 0.1, red, [20], [3], [23.5, 9], [16.5, 9], [20, 3]);
		WP.Unit.UI.makeShape(ctx, 1, 0, 0.1, red, [6], [9.5], [13, 7.5], [11, 14.5], [6, 9.5]);
		WP.Unit.UI.makeShape(ctx, 1, 0, 0.1, red, [36], [14.5], [30, 18], [30, 11], [36, 14.5]);
	},

	drawFireStorm: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(30, 30, 30);
		var red = new WP.Color(225, 80, 30);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Fire", "bold 8px tahoma", null, 27, black);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Storm", "bold 8px tahoma", null, 35, black);
		WP.Unit.UI.makeShape(ctx, 0, 20, 1.5, black, [4], [18], [20, 18], [7], [18], [7, 16], [10], [18], [10, 15], [13], [18], [13, 16], [17], [18], [17, 16], [20], [18], [20, 15]);
		WP.Unit.UI.makeShape(ctx, 1, 20, 0.1, red, [5], [14], [11, 14], [8, 8], [5, 14]);
		WP.Unit.UI.makeShape(ctx, 1, 20, 0.1, red, [13], [14], [19, 14], [16, 8], [13, 14]);
	},

	drawFlak: function (ctx, unit) {
		var color = unit.owner.foreColor
		switch (unit.owner.name.toLowerCase()) {
			case "america": case "us": case "united states": case "unitedstates": case "britain": WP.Unit.UI.drawSharedAlliedBase(ctx, unit); break;
			default: break;
		}
		WP.Unit.UI.makeShape(ctx, 0, 0, 1.3, color, [15], [21], [28, 21], [25], [19], [17, 13]);
		WP.Unit.UI.makeShape(ctx, 1, 0, 1.3, color, [19], [21], [19, 18], [22, 15], [23, 21]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1, color, [25.5], [18.5], [11.6, 7.5]);
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
	},

	drawFortress: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(20, 20, 20);
		ctx.fillStyle = black.toRgb();
		WP.Unit.UI.fillEllipse(ctx, 8.5, 16.5, 7, 7, black, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 13, 8, 7, 7, black, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 13, 24.5, 7, 7, black, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 26.5, 16.5, 7, 7, black, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 22, 8, 7, 7, black, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 22, 24.5, 7, 7, black, 0.5);
		WP.Unit.UI.makeShape(ctx, 0, 21, 1, black, [7.5], [19.5], [4.5, 19.5], [14.5], [9], [12.5, 5], [14.5], [30], [12.5, 34]);
	},

	drawGrant: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var gray = new WP.Color(155, 155, 155);
		var white = new WP.Color(250, 250, 250);
		ctx.fillStyle = gray.toRgb();
		ctx.fillRect(3, 3, 35, 35);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Grant", "bold 11px tahoma", null, 15, white);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, unit.strength, "bold 12px tahoma", null, 30, white);
	},

	drawIc: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 1, 0, 1.4, unit.owner.foreColor, [12], [17], [15, 14.5], [15, 17], [17], [17], [20, 14.5], [20, 17], [22], [17], [25, 14.5], [25, 17], [28], [17], [28, 7], [32], [17], [32, 7]);
		ctx.fillStyle = unit.owner.foreColor.toRgb();
		ctx.fillRect(9, 16, 26, 5);
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
	},

	drawInformation: function (ctx, unit) {
		ctx.lineWidth = 3;
		ctx.strokeStyle = WP.Unit.UI.getHighlightColor(unit.owner.backColor).toRgb();
		ctx.strokeRect(2, 2, unit.size - 6, unit.size - 6);
		ctx.lineWidth = 0;
		ctx.drawImage(unit.owner.flagImage, 6.5, 4);
		WP.Unit.UI.drawFlagOutline(ctx);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, unit.name, "bold 8px verdana", null, 35);
	},

	drawIsolation: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		fc = unit.owner.foreColor
		var black = new WP.Color(30, 30, 30);
		var red = new WP.Color(225, 80, 30);
		unit.owner.foreColor = black
		WP.Unit.UI.makeShape(ctx, 0, 0, 1, black, [14.5], [14.5], [25.5, 14.5], [25.5, 21.5], [14.5, 21.5], [14.5, 14.5], [25.5, 21.5], [14.5], [21.5], [25.5, 14.5]);
		WP.Unit.UI.drawEllipse(ctx, 9, 11.5, 22, 13, red, 1.5);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Isolation", "bold 8px tahoma", null, 10);
		WP.Unit.UI.Text.writeBottomMiddleStrength(ctx, unit);
		unit.owner.foreColor = fc
	},

	drawLent: function (ctx, unit) {
		var owner = unit.owner.name.toLowerCase();
		var ic = unit.owner.innerColor;
		if (owner == "spain") { unit.owner.innerColor = new WP.Color(140, 140, 140); }
		else if (owner == "vichy") { unit.owner.innerColor = new WP.Color(100, 100, 100) }
		else { unit.owner.innerColor = new WP.Color(151, 184, 108); }
		WP.Unit.UI.drawShield(ctx, unit);
		unit.owner.innerColor = ic;
	},

	drawOil: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(20, 20, 20);
		var darkGray = new WP.Color(100, 100, 100);
		var midGray = new WP.Color(170, 170, 170);
		var lightGray = new WP.Color(220, 220, 220);
		var white = new WP.Color(250, 250, 250);
		ctx.fillStyle = darkGray.toRgb(); //dark background
		ctx.fillRect(4, 4, 34, 34);
		var oilCanGradient1 = ctx.createLinearGradient(20, 10, 30, 10)//back can
		oilCanGradient1.addColorStop(0, black.toRgb());
		oilCanGradient1.addColorStop(0.7, lightGray.toRgb());
		oilCanGradient1.addColorStop(1, black.toRgb());
		//oil can 1
		ctx.fillStyle = oilCanGradient1;
		ctx.strokeStyle = black.toRgb();
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.moveTo(19, 9);
		ctx.lineTo(30, 9);
		ctx.lineTo(30, 24.5);
		ctx.quadraticCurveTo(25, 26, 19, 24.5, 0, 0);
		ctx.lineTo(19, 9);
		ctx.fill();
		ctx.moveTo(30, 12.5);
		ctx.quadraticCurveTo(25, 14.5, 19, 12.5, 0, 0); //ribs
		ctx.moveTo(30, 16.5);
		ctx.quadraticCurveTo(25, 18.5, 19, 16.5, 0, 0);
		ctx.moveTo(30, 20.5);
		ctx.quadraticCurveTo(25, 22.5, 19, 20.5, 0, 0);
		ctx.stroke();
		ctx.fillStyle = midGray.toRgb(); //lid
		WP.Unit.UI.fillEllipse(ctx, 19.5, 9, 10, 1.5, black, 1);
		ctx.fillStyle = black.toRgb(); //spout
		WP.Unit.UI.fillEllipse(ctx, 22, 9.8, 1, 1, black, 1);
		////oil can 2
		var oilCanGradient2 = ctx.createLinearGradient(8, 13, 21, 13)//front can
		oilCanGradient2.addColorStop(0, black.toRgb());
		oilCanGradient2.addColorStop(0.7, lightGray.toRgb());
		oilCanGradient2.addColorStop(1, black.toRgb());
		ctx.fillStyle = oilCanGradient2;
		ctx.strokeStyle = black.toRgb();
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.moveTo(8, 13);
		ctx.lineTo(22, 13);
		ctx.lineTo(22, 30.5);
		ctx.quadraticCurveTo(15, 32.5, 8, 30.5, 0, 0);
		ctx.lineTo(8, 13);
		ctx.fill();
		ctx.moveTo(22, 17.5);
		ctx.quadraticCurveTo(15, 19.5, 8, 17.5, 0, 0); //ribs
		ctx.moveTo(22, 21.5);
		ctx.quadraticCurveTo(15, 23.5, 8, 21.5, 0, 0);
		ctx.moveTo(22, 25.5);
		ctx.quadraticCurveTo(15, 27.5, 8, 25.5, 0, 0);
		ctx.stroke();
		ctx.fillStyle = midGray.toRgb(); //lid
		WP.Unit.UI.fillEllipse(ctx, 8.5, 13, 12, 2, black, 1);
		ctx.fillStyle = black.toRgb(); //spout
		WP.Unit.UI.fillEllipse(ctx, 12, 13.8, 1, 1, black, 1.5);
		ctx.font = "bold 14px helvetica"; //text
		ctx.textAlign = "center";
		ctx.fillStyle = white.toRgb();
		ctx.fillText(unit.strength, 32, 35);
	},

	drawOilEffect: function (ctx, unit) {
		ctx.fillStyle = unit.owner.innerColor.toRgb();
		ctx.fillRect(5, 4, 32, 24);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, "oil", "bold 8px verdana", null, 14);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, "effect", "bold 8px verdana", null, 22);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, unit.name, "bold 8px verdana", 21, 36);
	},

	drawOilPlant: function (ctx, unit) {
		var owncol = unit.owner.foreColor;
		ctx.fillStyle = owncol.toRgb();
		ctx.fillRect(5, 23, 32, 3);
		ctx.fillRect(11, 19, 8, 4);
		WP.Unit.UI.makeShape(ctx, 1, 0, 1.8, owncol, [8], [23], [8, 10], [22], [23], [22, 7], [26], [23], [26, 15], [28, 15], [33, 20], [36, 20], [36, 23]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1, owncol, [26.5], [15], [26.5, 9], [29.5], [17], [29.5, 13], [32.5], [20], [32.5, 14], [34.5], [20], [34.5, 17]);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, "Oil Plant", "bold 8px tahoma", 21, 37);
	},

	drawPartialSupply: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		fc = unit.owner.foreColor
		var black = new WP.Color(30, 30, 30);
		var red = new WP.Color(225, 80, 30);
		var white = new WP.Color(250, 250, 250);
		unit.owner.foreColor = black
		WP.Unit.UI.makeShape(ctx, 0, 0, 1, black, [14.5], [24.5], [25.5, 24.5], [25.5, 31.5], [14.5, 31.5], [14.5, 24.5], [25.5, 31.5], [14.5], [31.5], [25.5, 24.5]);
		WP.Unit.UI.drawEllipse(ctx, 9, 21.5, 22, 13, red, 1.5);
		WP.Unit.UI.makeShape(ctx, 0, 20, 3, white, [15], [22], [18, 22], [10.5], [23], [10.5, 26], [15], [34], [18, 34], [10.5], [33], [10.5, 30]);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Partial", "bold 8px tahoma", null, 10, black);
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Supply", "bold 8px tahoma", null, 17, black);
		unit.owner.foreColor = fc;
	},

	drawPort: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(30, 30, 30);
		var blue = new WP.Color(140, 200, 235);
		var white = new WP.Color(250, 250, 250);
		ctx.lineWidth = 1; //blue sea
		ctx.beginPath();
		ctx.fillStyle = blue.toRgb();
		ctx.arc(20.5, 20.5, 13, 0, 3.14, 0);
		ctx.fill();
		ctx.lineWidth = 1; //waves
		ctx.beginPath();
		ctx.fillStyle = white.toRgb();
		ctx.arc(13, 18.5, 4, 0, 3.14, 0);
		ctx.fill();
		ctx.arc(20.5, 18.5, 4, 0, 3.14, 0);
		ctx.fill();
		ctx.arc(28, 18.5, 4, 0, 3.14, 0);
		ctx.fill();
		WP.Unit.UI.drawEllipse(ctx, 19, 10.5, 3, 3, black, 1.2); //anchorring
		WP.Unit.UI.makeShape(ctx, 0, 20.5, 1, black, [20.5], [13], [20.5, 30], [20.5], [15.5], [14.5, 15.5], [20.5, 16], [20.5], [30], [13.5, 30, 13.5, 25], [16, 28]);
		WP.Unit.UI.drawEllipse(ctx, 7.5, 7.5, 26, 26, black, 1.3); //circle
	},

	drawRailhead: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(30, 30, 30);
		var red = new WP.Color(225, 80, 30);
		WP.Unit.UI.drawEllipse(ctx, 5, 5, 30, 30, red, 1.5); //circle
		ctx.fillStyle = black.toRgb();
		ctx.fillRect(12, 17, 17, 7);
		WP.Unit.UI.fillEllipse(ctx, 14, 23, 3, 3, black, 0.5); //wheels
		WP.Unit.UI.fillEllipse(ctx, 18, 23, 3, 3, black, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 22, 23, 3, 3, black, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 26, 23, 3, 3, black, 0.5);
		WP.Unit.UI.fillEllipse(ctx, 25, 18, 5, 5, black, 0.5); //nose
		WP.Unit.UI.fillEllipse(ctx, 18, 16, 3, 3, black, 0.5); //boiler stuff
		WP.Unit.UI.fillEllipse(ctx, 10.5, 22, 3, 3, black, 0.5); //under cabin
		WP.Unit.UI.makeShape(ctx, 1, 0, 0.001, black, [14], [18], [14, 16], [8, 16], [8, 18], [12, 18], [14], [19], [9, 19], [9, 23], [14, 23]);
		WP.Unit.UI.makeShape(ctx, 0, 0, 1, black, [30], [20.5], [32, 20.5], [28], [24], [30.5, 24], [31, 26], [27], [18.5], [27, 14.5], [27], [18.5], [27, 14.5], [23], [18.5], [23, 15.5], [16], [18.5], [16, 15.5], [9.5], [16], [9.5, 19]);
	},

	drawRocket: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 13, 20.5, 1, unit.owner.foreColor, [20.5], [5.5], [20.5, 35], [20.5], [6], [19, 10, 18.5, 20], [18.5, 28], [16.5, 30], [16.5, 35], [17.5, 35], [20.5, 33]);
	},

	drawSpyRing: function (ctx, unit) {
		ctx.fillStyle = unit.owner.innerColor.toRgb();
		WP.Unit.UI.fillEllipse(ctx, 10.5, 6, 20, 20, unit.owner.innerColor, 1);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, "spy", "bold 8px verdana", 21, 14);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, "ring", "bold 8px verdana", 21, 22);
		WP.Unit.UI.Text.writeAutoGenericText(ctx, unit, unit.name, "bold 8px verdana", 21, 36);
	},

	drawTurn: function (ctx, unit) {
		WP.Unit.UI.drawWhiteBase(ctx, unit);
		var black = new WP.Color(30, 30, 30);
		var orange = new WP.Color(229, 111, 50);
		var yellow = new WP.Color(220, 187, 82);
		var turnCircleGradient = ctx.createRadialGradient(20.5, 20.5, 0, 20.5, 20.5, 12);
		turnCircleGradient.addColorStop(0.5, yellow.toRgb());
		turnCircleGradient.addColorStop(1, orange.toRgb());
		ctx.fillStyle = turnCircleGradient;
		WP.Unit.UI.drawEllipse(ctx, 4, 4, 33, 33, orange, 1);
		ctx.fill();
		WP.Unit.UI.Text.writeGenericText(ctx, unit, "Turn", "bold 12px arial", 21, 24, black);
	}

}
