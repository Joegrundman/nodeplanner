/* global diplomacy */
/* global hexControl */
/* global taskforce */
/* global mapNav */
WP.Eventing = {
	attachEvents: function () {
		$.ajaxSetup({ cache: false });

		$(document).ajaxError(function (event, request) {
			var start = request.responseText.indexOf("<title>") + 7;
			var end = request.responseText.indexOf("</title>");
			var error = request.responseText.substring(start, end);
			alert(error);
		});

		$("#attrition").dialog({ autoOpen: false, resizable: false, close: function () { WP.Attrition.UI.handleDialogClose(); } });
		$("#codebreaking").dialog({ autoOpen: false, resizable: false, close: function () { WP.Codebreaking.UI.handleDialogClose(); } });
		$("#forcepoolDialog").dialog({ autoOpen: false });
		//$("#dieRoller").dialog({ autoOpen: false, resizable: false });
		$("#diplomacy").dialog({ autoOpen: false, resizable: false });
		$("#gSettings").dialog({ autoOpen: false });
		$("#hexControl").dialog({ autoOpen: false });
		$("#newUnit").dialog({ autoOpen: false });
		$("#tables").dialog({ autoOpen: false, close: function () { WP.Tables.UI.handleDialogClose(); } });
		$("#researchDisplay").dialog({ autoOpen: false });
		$("#shipsAtSea").dialog({ autoOpen: false });
		$("#shipyard").dialog({ autoOpen: false });
		$("#taskforce").dialog({ autoOpen: false });
		$("#unitCounter").dialog({ autoOpen: false });

		WP.Eventing.attachWindowingEvents();
		WP.Eventing.attachMapEvents();
		WP.Eventing.attachNavigatorEvents();
		WP.Eventing.attachDialogWithHolderEvents();
		WP.Eventing.attachToolbarEvents();
	},

	attachDialogWithHolderMouseEvents: function (dialog, dialogCanvas) {
		if (dialogCanvas.addEventListener) {
			dialogCanvas.addEventListener("mousedown", dialog.onMouseDown, false);
		}
		else if (dialogCanvas.attachEvent) {
			dialogCanvas.attachEvent("onmousedown", dialog.onMouseDown);
		}
	},

	attachDialogWithHolderEvents: function () {
		if (!diplomacy) diplomacy = new WP.Diplomacy();
		if (!forcepool) forcepool = new WP.Forcepool();
		WP.Eventing.attachDialogWithHolderMouseEvents(forcepool, forcepoolCanvas);
	    if (!gameSettings) gameSettings = new WP.GameSettings();
		if (!hexControl) hexControl = new WP.HexControl();
		$("#hexControl").dialog({
			beforeClose: function () { hexControl.showUnits(); }
		});
		if (!newUnit) newUnit = new WP.NewUnit();
		if (!researchDisplay) researchDisplay = new WP.ResearchDisplay();
		if (!shipsAtSea) shipsAtSea = new WP.ShipsAtSea();
		WP.Eventing.attachDialogWithHolderMouseEvents(shipsAtSea, shipsAtSeaCanvas);
		if (!shipyard) shipyard = new WP.Shipyard();
		WP.Eventing.attachDialogWithHolderFullMouseEvents(shipyard, shipyardCanvas);
		if (!taskforce) taskforce = new WP.Taskforce();
		WP.Eventing.attachDialogWithHolderFullMouseEvents(taskforce, taskforceCanvas);
		if (!unitCounter) unitCounter = new WP.UnitCounter();
		WP.Eventing.attachDialogWithHolderMouseEvents(unitCounter, unitCounterCanvas);
	},

	attachDialogWithHolderFullMouseEvents: function (dialog, dialogCanvas) {
		if (dialogCanvas.addEventListener) {
			dialogCanvas.addEventListener("mousemove", dialog.onMouseMove, false);
			dialogCanvas.addEventListener("mousedown", dialog.onMouseDown, false);
			dialogCanvas.addEventListener("mouseup", dialog.onMouseUp, false);
			dialogCanvas.addEventListener("dblclick", dialog.onDoubleClick, false);
		}
		else if (dialogCanvas.attachEvent) {
			dialogCanvas.attachEvent("onmousemove", dialog.onMouseMove);
			dialogCanvas.attachEvent("onmousedown", dialog.onMouseDown);
			dialogCanvas.attachEvent("onmouseup", dialog.onMouseUp);
			dialogCanvas.attachEvent("ondblclick", game.dialog.onDoubleClick, false);
		}
	},

	attachWindowingEvents: function () {
		if (window.addEventListener) {
			window.addEventListener("resize", onWindowResize, false);
		}
		else if (window.attachEvent) {
			window.attachEvent("onresize", onWindowResize);
		}

		$(window).keydown(function (event) { WP.Eventing.Keyboard.handleKeyDown(event.keyCode); });
		$(window).keyup(function (event) { WP.Eventing.Keyboard.handleKeyUp(); });
	},

	attachMapEvents: function () {
		if (mapCanvas.addEventListener) {
			mapCanvas.addEventListener("mousemove", game.currentMap.onMouseMove, false);
			mapCanvas.addEventListener("mousedown", game.currentMap.onMouseDown, false);
			mapCanvas.addEventListener("mouseup", game.currentMap.onMouseUp, false);
			mapCanvas.addEventListener("dblclick", game.currentMap.onDoubleClick, false);
		}
		else if (mapCanvas.attachEvent) {
			mapCanvas.attachEvent("onmousemove", game.currentMap.onMouseMove);
			mapCanvas.attachEvent("onmousedown", game.currentMap.onMouseDown);
			mapCanvas.attachEvent("onmouseup", game.currentMap.onMouseUp);
			mapCanvas.attachEvent("ondblclick", game.currentMap.onDoubleClick, false);
		}
	},

	attachNavigatorEvents: function () {
		if (!mapNav) {
			mapNav = new WP.Navigator()
			mapNav.refresh()
		};

		if (navigatorCanvas.addEventListener) {
			navigatorCanvas.addEventListener("mousemove", mapNav.onMouseMove, false);
			navigatorCanvas.addEventListener("mousedown", mapNav.onMouseDown, false);
			navigatorCanvas.addEventListener("mouseup", mapNav.onMouseUp, false);
		}
		else if (navigatorCanvas.attachEvent) {
			navigatorCanvas.attachEvent("onmousemove", mapNav.onMouseMove);
			navigatorCanvas.attachEvent("onmousedown", mapNav.onMouseDown);
			navigatorCanvas.attachEvent("onmouseup", mapNav.onMouseUp);
		}
	},

	attachToolbarEvents: function () {
		$("#buttonAttrition").click(function () { WP.Attrition.UI.handleMenuButton(); });
		$("#buttonCodebreaking").click(function () { WP.Codebreaking.UI.handleMenuButton(); });
		// $("#buttonDieRoller").click(function () { WP.DieRoller.UI.handleMenuButton(); });
		$("#buttonDiplomacy").click(function () { WP.Diplomacy.UI.handleMenuButton(); });
		$("#buttonForcepool").click(function () { WP.Forcepool.UI.handleMenuButton(); });
		$("#buttonHexControl").click(function () { WP.HexControl.UI.handleMenuButton(); });
		$("#buttonNewspaper").click(function () { WP.Tables.UI.handleMenuButton(); });
		$("#buttonNewUnit").click(function () { WP.NewUnit.UI.handleMenuButton(); });
		$("#buttonResearch").click(function () { WP.ResearchDisplay.UI.handleMenuButton(); });
		$("#buttonSettings").click(function () { WP.GameSettings.UI.handleMenuButton(); });
        $("#buttonShipyards").click(function () { WP.Shipyard.UI.handleMenuButton(); });
		$("#buttonShipsAtSea").click(function () { WP.ShipsAtSea.UI.handleMenuButton(); });
		$("#buttonSwitchTheaters").click(function () { game.switchTheaters(); });
		$("#buttonTaskForces").click(function () { WP.Taskforce.UI.handleMenuButton(); });
		$("#buttonUnitCounter").click(function () { WP.UnitCounter.UI.handleMenuButton(); });
		//
		// $("#infoBarButtonDownload").click(WP.FileSaver.Util.saveGame);

	}
}
