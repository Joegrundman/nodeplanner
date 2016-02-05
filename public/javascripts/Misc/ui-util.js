function getWindowDimensions() {
  if (typeof (window.innerWidth) === 'number') {
    window.mapWidth = window.innerWidth
    window.mapHeight = window.innerHeight

  } else if (document.documentElement && (document.documentElement.clientWidth ||
                                          document.documentElement.clientHeight)) {
    window.mapWidth = document.documentElement.clientWidth
    window.mapHeight = document.documentElement.clientHeight
  } else {
    window.mapWidth = $(window).width()
    window.mapHeight = $(window).height()
  }
  // using goldfarb table display
   // window.mapHeight = window.mapHeight -40
   // window.mapWidth = window.mapWidth - 206

  // my nums for bootstrap
  // window.mapHeight = window.mapHeight - 100
  // window.mapWidth = window.mapWidth - 40

  window.mapHeight = window.mapHeight -80
  window.mapWidth = window.mapWidth - 186

}

function repositionControls(){
  // still many parts to this function not yet included - just minimum for map
  $('#main').removeClass('pageContent')
  $('#main').addClass('gameContent')
  $('footer').hide()

  var mapDiv = $("#mapDiv")
  var menuDiv = $("#menuDiv")
  // var hexInfoDiv = $("#hexInfoDiv");
  var splashImgDiv = $("#splashImg");

  mapDiv.height(window.mapHeight);
  splashImgDiv.height($(window).height());
  mapDiv.width(window.mapWidth);
  menuDiv.height(window.mapHeight);
  //hexInfoDiv.height(window.mapHeight - 268 - $("#phaseDiv").height());

}

function onWindowResize() {
  var map = game.currentMap
  getWindowDimensions()
  repositionControls()
  map.draw()
  mapNav.refresh()
}


function adjust(value) {
	return value * game.zoomLevel;
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function getPoint (canvasName, e) {
	if (typeof e == 'undefined') e = mapCanvas.event;
	var obj = document.getElementById(canvasName);
	var relPos = WP.Map.Mouse.Util.getRelativePosition(obj, e.clientX, e.clientY);
	var x = relPos[0];
	var y = relPos[1];
	return new Point(x, y);
}
