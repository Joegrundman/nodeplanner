WP.Map.UI = {}

WP.Map.prototype.drawBackground = function () {
  console.log('Map/map - drawBackground')
  var mapImage = new Image()
  var map = this

  mapImage.onload = function() {
    console.log('Map/map -drawBackground - onload')
    var mapDiv = $("#mapDiv")
    // var menuDiv = $("#menuDiv")

    // mapDiv.hide()
    // menuDiv.hide()
    map.width = mapImage.width
    map.height = mapImage.height

    WP.Canvas.resizeCanvas(mapCanvas, map)
    WP.Canvas.resizeCanvas(backgroundCanvas, map)
    console.log('mapWidth:', map.width)
    backgroundCtx.drawImage(mapImage, 0, 0, map.width, map.height)

    if(WP.Misc.Ui.isiPad() || WP.Misc.Ui.isiPod()) {
			mapCtx.drawImage(mapImage, 0, 0, mapDiv.width(), mapDiv.height(), 0, 0, mapDiv.width(), mapDiv.height())
    } else {
      $('#mapBackgroundDiv').css("background-image", "url(" + url + ")")
    }

    // map.drawHexes()
    // mapNav.refresh()

    var mapBackgroundDiv = $("#mapBackgroundDiv")
    mapBackgroundDiv.height(mapImage.height)
    mapBackgroundDiv.width(mapImage.width)

    mapDiv.show()
    // menuDiv.show()
    scrollDivRight(getCookie("rightscroll"))
    scrollDivDown(getCookie("downscroll"))
  }

  var url = "/content/maps/WP" + this.theater + (game.zoomLevel *10) + ".jpg"
  mapImage.src = url
}

WP.Map.prototype.draw = function() {
  console.log('Map/map - draw')
  // this.setZoom()
  this.drawBackground()
}
