WP.Map.UI = {}

// WP.Map.prototype.drawBackground = function () {
//   var mapImage = new Image()
//   var map = this

//   mapImage.onload = function() {
//     var mapDiv = $("#mapDiv")
//     var menuDiv = $("#menuDiv")

//     // mapDiv.hide()
//     // menuDiv.hide()
//     map.width = mapImage.width
//     map.height = mapImage.height

//     WP.Canvas.resizeCanvas(mapCanvas, map)
//     WP.Canvas.resizeCanvas(backgroundCanvas, map)

//     backgroundCtx.drawImage(mapImage, 0, 0, map.width, map.height)

//     if(WP.Misc.Ui.isiPad() || WP.Misc.Ui.isiPod()) {
// 			mapCtx.drawImage(mapImage, 0, 0, mapDiv.width(), mapDiv.height(), 0, 0, mapDiv.width(), mapDiv.height())
//     } else {
//       $('#mapBackgroundDiv').css("background-image", "url(" + url + ")")
//     }

//      map.drawHexes()
//      mapNav.refresh()

//     var mapBackgroundDiv = $("#mapBackgroundDiv")
//     mapBackgroundDiv.height(mapImage.height)
//     mapBackgroundDiv.width(mapImage.width)

//     mapDiv.show()
//     // menuDiv.show()
//     scrollDivRight(getCookie("rightscroll"))
//     scrollDivDown(getCookie("downscroll"))
//   }

//   var url = "/content/maps/WP" + this.theater + (game.zoomLevel *10) + ".jpg"
//   mapImage.src = url
// }

// WP.Map.prototype.drawHexes = function () {
// 	// for (var i in this.hexes) {
// 	// 	this.hexes[i].draw();
// 	// }
//     this.hexes.forEach(h => h.draw())
// }

// WP.Map.prototype.draw = function() {
//   this.setZoom()
//   this.drawBackground()
// }

// WP.Map.prototype.setZoom = function () {
// 	// for (var i in this.hexes) {
// 	// 	this.hexes[i].setZoom();
// 	// }
//     this.hexes.forEach(h => h.setZoom())
// };

// WP.Map.prototype.redrawHexesContainingUnits = function (units) {
// 	// for (var i in this.hexes) {
// 	// 	for (var u in units) {
// 	// 		for (var hu in this.hexes[i].units) {
// 	// 			if (hu == u) {
// 	// 				this.hexes[i].clear();
// 	// 				this.hexes[i].draw();
// 	// 			}
// 	// 		}
// 	// 	}
// 	// }
//     this.hexes.forEach(h =>{
//         h.units.forEach(hu => {
//             if (units.some(un => un == hu)){
//                 h.clear()
//                 h.draw()
//             }
//         })
//     })
// }
