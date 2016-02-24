'use strict';

var WP = {

    
  initialize: function () {
    // for sample testing only - to be commented out
    var filename = 'Content/Sample/sample.xml'

    WP.Canvas.initCanvas()
    WP.FileLoader.startGame("euro", filename)
 
    WP.Eventing.attachEvents()

    if (!hexInfo) { hexInfo = new WP.HexInfo(); }
	  hexInfo.updateFor(game.currentMap.hexes[0], true);

    onWindowResize()

  }
}

var mapCanvas, navigatorCanvas, backgroundCanvas, hexInfoCanvas, forcepoolCanvas, newUnitCanvas, shipsAtSeaCanvas, shipyardCanvas, taskforceCanvas, unitCounterCanvas, hexInfoBackgroundCanvas;
var mapCtx, navigatorCtx, backgroundCtx, hexInfoCtx, forcepoolCtx, hexInfoBackgroundCtx, newUnitCtx, shipsAtSeaCtx, shipyardCtx, taskforceCtx, unitCounterCtx;
var game, mapNav, hexInfo, forcepool, attrition, codebreaking, diplomacy, dieRoller, gameSettings, hexControl, newUnit, phase, researchDisplay, shipsAtSea, shipyard, tables, taskforce, unitCounter;
var keyPress;
var fileName;
var mapHeight = -1;
var mapWidth = -1;
var mapImage;

function Enum() { }
Enum.HexSides = { east: 0, southeast: 1, southwest: 3, west: 4, northwest: 5, northeast: 6 };
Enum.HexPoints = { northeast: 0, southeast: 1, south: 3, southwest: 4, northwest: 5, north: 6 };
