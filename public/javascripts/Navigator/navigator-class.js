
WP.Navigator = function () {
 this.dragging = false;
}

WP.Navigator.prototype.refresh = function () {
 var mapImage = new Image();

 mapImage.onload = function () {
   WP.Canvas.resizeCanvas(navigatorCanvas, mapImage);
   navigatorCtx.drawImage(mapImage, 0, 0);
   WP.Navigator.Util.paintMap();
 }
 var url = "/content/maps/small" + game.currentMap.theater + ".bmp";
 mapImage.src = url;
}

WP.Navigator.Util = {

 getBaseMapTemplate: function (navWidth, navHeight) {
   var templateMap = navigatorCtx.getImageDataSafely(0, 0, navWidth, navHeight);
   var baseMap = new Array(templateMap.data.length);
   for (var id = 0; id < baseMap.length; id++) {
     baseMap[id] = templateMap.data[id];
   }
   return baseMap;
 },

 drawControlColors: function (navWidth, navHeight) {
   var map = game.currentMap;
   var xMod = map.width / navWidth;
   var yMod = map.height / navHeight;

   navigatorCtx.lineWidth = 0;
   for (var x = 0; x < game.currentMap.hexes.length; x++) {
     var hex = game.currentMap.hexes[x];
     if (!hex) continue;
     if (!hex.owner) continue;

     navigatorCtx.fillStyle = hex.owner.backColor.toRgb();
     var dx = (hex.pixelPoint.x / (xMod * 1)) - .5;
     var dy = (hex.pixelPoint.y / (yMod * 1)) - .5;

     if (dx < navWidth - 4 && dy < navHeight - 3.5)
       navigatorCtx.fillRect(dx, dy, 4, 3.5);
   }
   navigatorCtx.fill();
 },

 overlayOceanForDefinedCoastlines: function (baseMap, navWidth, navHeight) {
   var output = navigatorCtx.getImageDataSafely(0, 0, navWidth, navHeight);

   var coloredMap = output.data;
   for (var i = 0, n = baseMap.length; i < n; i += 4) {
     if (baseMap[i] == 51 && baseMap[i + 1] == 102 && baseMap[i + 2] == 153) {
       coloredMap[i] = 51;
       coloredMap[i + 1] = 102;
       coloredMap[i + 2] = 153;
     }
   }
   navigatorCtx.putImageData(output, 0, 0);
 },

 paintMap: function () {
   var navWidth = $("#navigatorCanvas").width();
   var navHeight = $("#navigatorCanvas").height();

   var baseMap = WP.Navigator.Util.getBaseMapTemplate(navWidth, navHeight);
   WP.Navigator.Util.drawControlColors(navWidth, navHeight);
   WP.Navigator.Util.overlayOceanForDefinedCoastlines(baseMap, navWidth, navHeight);

   $("#navigatorDiv").width(navWidth - 4);
   $("#navigatorDiv").height(navHeight - 1);

 }
}

function pointIsInHex(point, hexPoint, size) {
 if (point.x < hexPoint.x) return false;
 if (point.x > hexPoint.x + size) return false;
 if (point.y < hexPoint.y) return false;
 if (point.y > hexPoint.y + size) return false;
 return true;
}
