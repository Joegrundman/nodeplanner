WP.Canvas = {

  initCanvas: function () {
    console.log('Canvas/canvas - initCanvas')
    WP.Canvas.initMapCanvas()
    WP.Canvas.initBackgroundCanvas()

  },

  initBackgroundCanvas: function() {
    console.log('Canvas/canvas - initBackgroundCanvas')
    backgroundCanvas = $("#backgroundCanvas")[0]
    backgroundCtx = backgroundCanvas.getContext('2d')
  },

  initMapCanvas: function() {
    console.log('Canvas/canvas - initMapCanvas')
    mapCanvas = $("#mapCanvas")[0]
    mapCtx = mapCanvas.getContext('2d')
    mapCtx.font = '10px verdana'
  },


  resizeCanvas: function (canvas, image) {
    console.log('Canvas/canvas - resizeCanvas -imageWidth: ' + image.width)
    canvas.width = image.width;
    canvas.height = image.height;
  },

  resizeCanvasToDiv: function (canvas, div) {
    console.log('Canvas/canvas -resizeCanvasToDiv')
    canvas.width = div.scrollWidth;
    canvas.height = div.scrollHeight;
  }
}
