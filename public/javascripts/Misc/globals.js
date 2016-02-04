var WP = {
  initialize: function () {
    console.log('Misc/globals.js  - initializing WP')
    // for sample testing only - to be commented out
    var filename = 'content/Sample/sample.xml'

    WP.Canvas.initCanvas()
    WP.FileLoader.Util.startGame("euro", filename)
    onWindowResize()
  }
}

var mapCanvas, backgroundCanvas
var mapCtx, backgroundCtx
var game, mapNav
var keyPress
var fileName
var mapHeight = -1
var mapWidth = -1
var mapImage

function Enum() { }
Enum.HexSides = { east: 0, southeast: 1, southwest: 3, west: 4, northwest: 5, northeast: 6 };
Enum.HexPoints = { northeast: 0, southeast: 1, south: 3, southwest: 4, northwest: 5, north: 6 };
