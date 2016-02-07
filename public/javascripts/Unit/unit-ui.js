/* global game */
WP.Unit.UI = {

	drawBase: function (ctx, unit) {
		var arc = Math.floor(unit.size / 14.33);

		ctx.lineWidth = 0;
		ctx.fillStyle = WP.Unit.UI.getShadowColor(unit.owner.backColor).toRgb();
		ctx.strokeStyle = ctx.fillStyle;
		// if ($.browser.msie)
		// 	ctx.roundRect(0, 0, unit.size, unit.size, arc);
		// else
			ctx.roundRect(0, 0, unit.size + 1, unit.size + 1, arc);

		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = unit.owner.backColor.toRgb();
		ctx.strokeStyle = ctx.fillStyle;
		// if ($.browser.msie)
		// 	ctx.roundRect(.5, .5, unit.size - .5, unit.size - .5, arc);
		// else
			ctx.roundRect(1, 1, unit.size - .5, unit.size - .5, arc);

		ctx.fill();
		ctx.stroke();
		var owner = unit.owner.name.toLowerCase()
		if ((owner == "vlasov") || (owner == "wang") || (owner == "indian nat. army")) { WP.Unit.UI.drawGradientBackground(ctx, unit); }
	},

	drawColorRect: function (ctx, x, y, w, h, color) {
        var boxColor
		var blackLineColor = new WP.Color(0, 0, 0);
		var blueBoxColor = new WP.Color(11, 128, 244);
		var yellowBoxColor = new WP.Color(238, 237, 41);
		var darkpurpleBoxColor = new WP.Color(150, 87, 180);
		if (color == "blue") { boxColor = blueBoxColor; }
		else if (color == "yellow") { boxColor = yellowBoxColor; }
		else if (color == "purple") { boxColor = darkpurpleBoxColor; }
		ctx.lineWidth = 1;
		ctx.strokeStyle = blackLineColor.toRgb();
		ctx.strokeRect(x, y, w, h);
		ctx.fillStyle = boxColor.toRgb();
		ctx.fillRect(x, y, w, h);
	},

	drawDamaged: function (ctx, unit) {
		var burningShip = new Image();
		burningShip.src = "content/units/burning_ship.gif";
		ctx.drawImage(burningShip, 0, 11);
	},

	drawEllipse: function (ctx, x, y, w, h, color, linewidth) {
		var kappa = 0.5522848;
        var ox, oy, xe, ye, xm, ym
		ox = (w / 2) * kappa, 		// control point offset horizontal
				oy = (h / 2) * kappa, // control point offset vertical
				xe = x + w,           // x-end
				ye = y + h,           // y-end
				xm = x + w / 2,       // x-middle
				ym = y + h / 2;       // y-middle
		ctx.lineWidth = linewidth;
		ctx.strokeStyle = color.toRgb();
		ctx.beginPath();
		ctx.moveTo(x, ym);
		ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		ctx.closePath();
		ctx.stroke();
	},

	drawExploiting: function (ctx, unit) {
		WP.Unit.UI.makeShape(ctx, 1, 0, 1, unit.owner.foreColor, [12.5], [8.5], [24.5, 8.5], [29, 12.5, 24.5, 16.5], [12.5, 16.5], [8, 12.5, 12.5, 8.5]);
	},

	drawEliminated: function (ctx, unit) {
		ctx.lineWidth = 1;
		for (i = 7; i < 40; i += 7) {
			ctx.strokeStyle = new WP.Color(150, 107, 180).toRgb();
			ctx.beginPath();
			ctx.moveTo(2, 40- i);
			ctx.lineTo(i, 38);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(38, i);
			ctx.lineTo(40 - i, 2);
			ctx.closePath();
			ctx.stroke();
		}
	},

	drawFlagOutline: function (ctx) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = new WP.Color(10, 10, 10).toRgb();
		ctx.strokeRect(6.5, 3.5, 27, 19);
	},

	drawGradientBackground: function (ctx, unit) {
		var black = new WP.Color(40, 40, 40);
		var backgrad = ctx.createLinearGradient(0, 0, 0, 41);
		backgrad.addColorStop(0, unit.owner.backColor.toRgb())
		backgrad.addColorStop(1, black.toRgb())
		ctx.fillStyle = backgrad;
		ctx.fillRect(0, 0, 41, 41);
	},

	drawHighlight: function (ctx, unit) {
		var arc = Math.floor(unit.size / 14.33);
		ctx.lineWidth = 4;
		if (unit.highlight)
			ctx.strokeStyle = unit.highlight;
		else
			// ctx.strokeStyle = new WP.Color(0, 255, 0).toRgb();
			ctx.strokeStyle = new WP.Color(193, 215, 193).toRgb();

		ctx.roundRect(2, 2, unit.size - 1.5, unit.size - 1.5, arc);
		ctx.stroke();
	},

	drawInverted: function (ctx, unit) {
		ctx.lineWidth = 1;
		for (var i = 7; i < 40; i += 7) {
			ctx.strokeStyle = unit.owner.foreColor.toRgb();
			ctx.beginPath();
			ctx.moveTo(2, i);
			ctx.lineTo(i, 2);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(38, 40 - i);
			ctx.lineTo(40 - i, 38);
			ctx.closePath();
			ctx.stroke();
		}
	},

	drawIsolated: function (ctx, unit) {
		ctx.lineWidth = 1;
		ctx.strokeStyle = unit.owner.foreColor.toRgb();
		ctx.beginPath();
		ctx.moveTo(2, 2);
		ctx.lineTo(38, 38);
		ctx.moveTo(2, 38);
		ctx.lineTo(38, 2);
		ctx.closePath();
		ctx.stroke();
	},

	drawOutline: function (ctx, args) {
		for (var step = 5; step < args.length; step++) {
			var coords = args[step];
			var len = coords.length;
			if (len == 1) { ctx.moveTo(coords[0], args[++step][0]); }
			else if (len == 2) { ctx.lineTo(coords[0], coords[1]) }
			else if (len == 4) { ctx.quadraticCurveTo(coords[0], coords[1], coords[2], coords[3]); }
			else if (len == 6) { ctx.bezierCurveTo(coords[0], coords[1], coords[2], coords[3], coords[4], coords[5]); }
		}
	},

	drawReflection: function (ctx, args, mirror) {
		mirror = mirror * 2
		for (var step = 5; step < args.length; step++) {
			var coords = args[step];
			var len = coords.length;
			if (len == 1) { ctx.moveTo(mirror - coords[0], args[++step][0]); }
			else if (len == 2) { ctx.lineTo(mirror - coords[0], coords[1]); }
			else if (len == 4) { ctx.quadraticCurveTo(mirror - coords[0], coords[1], mirror - coords[2], coords[3]); }
			else if (len == 6) { ctx.bezierCurveTo(mirror - coords[0], coords[1], mirror - coords[2], coords[3], mirror - coords[4], coords[5]); }
		}
	},

	drawSharedAlliedBase: function (ctx, unit) {
		var tan = new WP.Color(151, 172, 108); //us back color
		var olive = new WP.Color(209, 188, 140); //britain back color
		ctx.fillStyle = tan.toRgb();
		ctx.fill();
		ctx.lineWidth = 0;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(unit.size, unit.size);
		ctx.lineTo(0, unit.size);
		ctx.lineTo(0, 0);
		ctx.fillStyle = olive.toRgb();
		ctx.fill();
		ctx.stroke();
	},

	drawShield: function (ctx, unit) {
		var start = new Point(adjust(8), adjust(7));
		var width = Math.floor(unit.size / 1.9);
		var height = Math.floor(unit.size / 3.5);
		ctx.lineWidth = 1;
		ctx.strokeStyle = unit.owner.lineColor.toRgb();
		ctx.strokeRect(start.x, start.y, width, height);
		ctx.fillStyle = unit.owner.innerColor.toRgb();
		ctx.fillRect(start.x, start.y, width, height);
	},

	drawSunk: function (ctx, unit) {
		var seaCol = new WP.Color(53, 178, 202);
		var skyCol = new WP.Color(210, 240, 255);
		var seabedCol = new WP.Color(130, 205, 210);
		ctx.fillStyle = seaCol.toRgb();
		ctx.fillRect(0.5, 12, 39, 13);
		ctx.fillStyle = seabedCol.toRgb();
		ctx.fillRect(0.5, 21, 39, 4);
		if (unit.hex.isPort) { ctx.fillStyle = skyCol.toRgb(); ctx.fillRect(1, 12, 40, 4); }
	},

	drawNavalColorBox: function (ctx, color) {
		var useCol
		if (color == "orange") { useCol = new WP.Color(240, 154, 49); }
		else if (color == "purple") { useCol = new WP.Color(180, 147, 190); }
		else if (color == "yellow") { useCol = new WP.Color(238, 237, 41); }
		ctx.fillStyle = useCol.toRgb();
		ctx.fillRect(0.5, 12, 39, 13);
	},

	drawUnitTexture: function (ctx) {

		var unitTexture = new Image();
		unitTexture.src = "content/Units/unit_texture0.png";
		ctx.drawImage(unitTexture, -1, 0);
	},

	drawWhiteBase: function (ctx, unit) {
		bc = unit.owner.backColor;
		unit.owner.backColor = new WP.Color(245, 245, 245);
		WP.Unit.UI.drawBase(ctx, unit);
		unit.owner.backColor = bc;
	},

	fillEllipse: function (ctx, x, y, w, h, color, linewidth) {
		WP.Unit.UI.drawEllipse(ctx, x, y, w, h, color, linewidth)
		ctx.fillStyle = color.toRgb();
		ctx.fill();
	},

	getHighlightColor: function (color) {
		var mod = 30;
		// if ($.browser.msie) {
		// 	mod = 50;
		// }

		var r = color.red + mod;
		var g = color.green + mod;
		var b = color.blue + mod;

		if (r > 255) r = 255;
		if (g > 255) g = 255;
		if (b > 255) b = 255;
		return new WP.Color(r, g, b);
	},

	getShadowColor: function (color) {
		var mod = 30;
		// if ($.browser.msie) {
		// 	mod = 50;
		// }

		var r = color.red - mod;
		var g = color.green - mod;
		var b = color.blue - mod;

		if (r < 0) r = 0;
		if (g < 0) g = 0;
		if (b < 0) b = 0;
		return new WP.Color(r, g, b);
	},

	makeShape: function () {
		var args = arguments
		var ctx = args[0];
		var doFill = args[1];
		var mirror = args[2];
		ctx.lineWidth = args[3];
		var color = args[4];
		ctx.beginPath();
		ctx.strokeStyle = color.toRgb();
		WP.Unit.UI.drawOutline(ctx, args);
		if (mirror) { WP.Unit.UI.drawReflection(ctx, args, mirror); }
		if (doFill) { ctx.fillStyle = color.toRgb(); ctx.fill(); }
		ctx.stroke(); ctx.closePath();
	}
}

WP.Unit.prototype.draw = function (ctx, x, y) {
	ctx.save();
	x = Math.floor(x);
	y = Math.floor(y);
	ctx.translate(x, y);
	WP.Unit.UI.drawBase(ctx, this);
	switch (this.type.toLowerCase()) {
		case "aaf": WP.Unit.UI.Air.drawAaf(ctx, this); break;
		case "aas-attack": WP.Unit.UI.Air.drawAasAttack(ctx, this); break;
		case "aas-cover": WP.Unit.UI.Air.drawAasCover(ctx, this); break;
		case "aas-search": WP.Unit.UI.Air.drawAasSearch(ctx, this); break;
		case "advsub": case "adv sub": WP.Unit.UI.Naval.drawAdvSub(ctx, this); break;
		case "airbase": WP.Unit.UI.Misc.drawAirbase(ctx, this); break;
		case "airborne": WP.Unit.UI.Ground.drawAirborne(ctx, this); break;
		case "airtransport": case "at": case "air trans": WP.Unit.UI.Air.drawAirTransport(ctx, this); break;
		case "alliedpartisan": WP.Unit.UI.Ground.drawAlliedPartisan(ctx, this); break;
		case "armor": case "arm": WP.Unit.UI.Ground.drawArmor(ctx, this); break;
		case "asw": WP.Unit.UI.Naval.drawAsw(ctx, this); break;
		case "atomicattack": case "atomic attack": WP.Unit.UI.Misc.drawAtomicAttack(ctx, this); break;
		case "avg": WP.Unit.UI.Air.drawAvg(ctx, this); break;
		case "axispartisan": WP.Unit.UI.Ground.drawAxisPartisan(ctx, this); break;
		case "battleship": case "b": case "bc": case "pb": WP.Unit.UI.Naval.drawBattleship(ctx, this); break;
		case "beachdefense": WP.Unit.UI.Misc.drawBeachDefense(ctx, this); break;
		case "bomber": WP.Unit.UI.Air.drawBomber(ctx, this); break;
		case "pacificbomber": case "pac bomber": WP.Unit.UI.Air.drawPacificBomber(ctx, this); break;
		case "partialsupply": WP.Unit.UI.Misc.drawPartialSupply(ctx, this); break;
		case "breakthrough": WP.Unit.UI.Misc.drawBreakthrough(ctx, this); break;
		case "bridgehead": WP.Unit.UI.Misc.drawBridgehead(ctx, this); break;
		case "chindit": WP.Unit.UI.Ground.drawChindit(ctx, this); break;
		case "commando": WP.Unit.UI.Ground.drawCommando(ctx, this); break;
		case "communistpartisan": case "compartisan": WP.Unit.UI.Ground.drawCommunistPartisan(ctx, this); break;
		case "cruiser": WP.Unit.UI.Naval.drawCruiser(ctx, this); break;
		case "carrier": case "cv": WP.Unit.UI.Naval.drawCarrier(ctx, this); break;
		case "cve": WP.Unit.UI.Naval.drawCve(ctx, this); break;
		case "damage": WP.Unit.UI.Misc.drawDamage(ctx, this); break;
		case "destroyer": case "dd": WP.Unit.UI.Naval.drawDestroyer(ctx, this); break;
		case "done": WP.Unit.UI.Misc.drawDone(ctx, this); break;
		case "enas": case "elitenas": WP.Unit.UI.Air.drawEnas(ctx, this); break;
		case "exploit": WP.Unit.UI.Misc.drawExploit(ctx, this); break;
		case "firestorm": WP.Unit.UI.Misc.drawFireStorm(ctx, this); break;
		case "flak": WP.Unit.UI.Misc.drawFlak(ctx, this); break;
		case "fortress": case "ft": WP.Unit.UI.Misc.drawFortress(ctx, this); break;
		case "grant": WP.Unit.UI.Misc.drawGrant(ctx, this); break;
		case "ic": case "IC": WP.Unit.UI.Misc.drawIc(ctx, this); break;
		case "infantry": case "i": WP.Unit.UI.Ground.drawInfantry(ctx, this); break;
		case "information": case "inf": WP.Unit.UI.Misc.drawInformation(ctx, this); break;
		case "interceptor": WP.Unit.UI.Air.drawInterceptor(ctx, this); break;
		case "isolation": WP.Unit.UI.Misc.drawIsolation(ctx, this); break;
		case "jet": WP.Unit.UI.Air.drawJet(ctx, this); break;
		case "jetsquadron": WP.Unit.UI.Air.drawJetSquadron(ctx, this); break;
		case "kamikaze": WP.Unit.UI.Air.drawKamikaze(ctx, this); break;
		case "lent": WP.Unit.UI.Misc.drawLent(ctx, this); break;
		case "marine": WP.Unit.UI.Ground.drawMarine(ctx, this); break;
		case "mechanized": case "mech": WP.Unit.UI.Ground.drawMechanized(ctx, this); break;
		case "nas": WP.Unit.UI.Air.drawNas(ctx, this); break;
		case "oil": WP.Unit.UI.Misc.drawOil(ctx, this); break;
		case "oilplant": WP.Unit.UI.Misc.drawOilPlant(ctx, this); break;
		case "partisan": case "pw": case "px": case "pc": WP.Unit.UI.Ground.drawPartisan(ctx, this); break;
		case "port": WP.Unit.UI.Misc.drawPort(ctx, this); break;
		case "railhead": WP.Unit.UI.Misc.drawRailhead(ctx, this); break;
		case "replacement": case "rep": WP.Unit.UI.Ground.drawReplacement(ctx, this); break;
		case "rocket": WP.Unit.UI.Misc.drawRocket(ctx, this); break;
		case "spyring": WP.Unit.UI.Misc.drawSpyRing(ctx, this); break;
		case "sub": WP.Unit.UI.Naval.drawSub(ctx, this); break;
		case "taskforce": WP.Unit.UI.Naval.drawTaskForce(ctx, this); break;
		case "transport": case "tr": WP.Unit.UI.Naval.drawTransport(ctx, this); break;
		case "turn": WP.Unit.UI.Misc.drawTurn(ctx, this); break;
		default: alert("Unknown unit type: " + this.type + ".");
	}

	if (this.eliminated) { WP.Unit.UI.drawEliminated(ctx, this); }
	else if (this.inverted) { WP.Unit.UI.drawInverted(ctx, this); }
	else if (this.isolated) { WP.Unit.UI.drawIsolated(ctx, this); }
	if (this.damaged) { WP.Unit.UI.drawDamaged(ctx, this); }
	if (this.exploiting) { WP.Unit.UI.drawExploiting(ctx, this); }
	if (this.lent) { WP.Unit.UI.Misc.drawLent(ctx, this); }
	if (game.showUnitTexture == true) { WP.Unit.UI.drawUnitTexture(ctx); }
	if (game.selectedUnit == this || this.highlight)
		WP.Unit.UI.drawHighlight(ctx, this);

	ctx.restore();
}
