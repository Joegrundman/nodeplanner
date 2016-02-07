WP.Canvas = {

  initCanvas: function () {
    WP.Canvas.initMapCanvas()
    WP.Canvas.initBackgroundCanvas()
    WP.Canvas.initForcepoolCanvas()
    WP.Canvas.initHexInfoCanvas()
    WP.Canvas.initNavigatorCanvas()
    WP.Canvas.initShipyardCanvas()
    WP.Canvas.initTaskforceCanvas()
  },

  initBackgroundCanvas: function() {
    backgroundCanvas = $("#backgroundCanvas")[0]
    backgroundCtx = backgroundCanvas.getContext('2d')
  },

  initForcepoolCanvas: function () {
		forcepoolCanvas = $("#forcepoolCanvas")[0];
		forcepoolCtx = forcepoolCanvas.getContext('2d');
	},

  initHexInfoCanvas: function () {
    hexInfoCanvas = $("#hexInfoCanvas")[0];
    hexInfoCtx = hexInfoCanvas.getContext('2d');
    hexInfoBackgroundCanvas = $("#hexInfoBackgroundCanvas")[0];
    hexInfoBackgroundCtx = hexInfoBackgroundCanvas.getContext('2d');
  },

  initMapCanvas: function() {
    mapCanvas = $("#mapCanvas")[0]
    mapCtx = mapCanvas.getContext('2d')
    mapCtx.font = '10px verdana'
  },

  initNavigatorCanvas: function () {
    navigatorCanvas = $("#navigatorCanvas")[0];
    navigatorCtx = navigatorCanvas.getContext('2d');
    navigatorCtx.font = '10px verdana';
  },

  initNewUnitCanvas: function () {
    newUnitCanvas = $("#newUnitCanvas")[0];
    newUnitCtx = newUnitCanvas.getContext('2d');
  },

  initShipsAtSeaCanvas: function () {
    shipsAtSeaCanvas = $("#shipsAtSeaCanvas")[0];
    shipsAtSeaCtx = shipsAtSeaCanvas.getContext('2d');
  },

  initShipyardCanvas: function () {
    shipyardCanvas = $("#shipyardCanvas")[0];
    shipyardCtx = shipyardCanvas.getContext('2d');
  },

  initTaskforceCanvas: function () {
    taskforceCanvas = $("#taskforceCanvas")[0];
    taskforceCtx = taskforceCanvas.getContext('2d');
  },

  initUnitCounterCanvas: function () {
    unitCounterCanvas = $("#unitCounterCanvas")[0];
    unitCounterCtx = unitCounterCanvas.getContext('2d');
  },

  resizeCanvas: function (canvas, image) {
    canvas.width = image.width;
    canvas.height = image.height;
  },

  resizeCanvasToDiv: function (canvas, div) {
    canvas.width = div.scrollWidth;
    canvas.height = div.scrollHeight;
  }
}
