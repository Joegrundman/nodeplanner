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
//  window.mapHeight = window.mapHeight - 75
//  window.mapWidth = window.mapWidth - 192
window.mapHeight = window.mapHeight - 100

  window.mapWidth = window.mapWidth - 40

}

function repositionControls(){
  // still many parts to this function not yet included - just minimum for map
  $('#main').removeClass('pageContent')
  $('#main').addClass('gameContent')
  $('footer').hide()

  var mapDiv = $("#mapDiv")
  var menuDiv =$("#menuDiv")

  mapDiv.height(window.mapHeight)
  mapDiv.width(window.mapWidth)
}

function onWindowResize() {
  console.log('Misc/ui-util - onWindowResize')
  var map = game.currentMap
  getWindowDimensions()
  repositionControls()
  map.draw()
}
