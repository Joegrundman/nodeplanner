WP.Map = function (theater, id) {
  this.theater = theater
  this.width = 0
  this.height = 0
  this.currentX = 0
  this.currentY = 0
  this.id = id
  this.dragging = false
  this.hexes = null
  this.currentHex =null

  // this.getHex = function(id) {
  //   return this.hexes[id]
  // }
}
