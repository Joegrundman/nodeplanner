WP.FileLoader = function(file) {
  this.file = file
  this.unitIndex = 0
}

WP.FileLoader.Util = {
  startGame: function(type, file) {
    game = WP.Game.Util.gameBuilder()
  }
}
