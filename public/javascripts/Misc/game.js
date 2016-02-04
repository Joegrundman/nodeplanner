WP.Game = function (){
  this.name = 'not set'
  this.mapIndex = 0
  this.zoomLevel = 1
  this.type = null
  this.countries = null
  this.maps = null
  this.currentMap = null
  this.selectedUnit = null
  this.gameType = null
  this.shipyards = null
  this.taskforces = null
  this.selectedTaskforce = null
}

WP.Game.Util = {
	gameBuilder: function () {
    console.log('Misc/game - Game.Util.GameBuilder - building')
		game = new WP.Game()
		game.name = "new"
		game.countries = []
		game.shipyards = []
		game.maps = new Array(2)
		game.maps[0] = new WP.Map("euro", 0)
		// game.maps[0].createHexes(0)
		game.maps[1] = new WP.Map("pac", 1)
		// game.maps[1].createHexes(1)
		game.currentMap = game.maps[0]
		return game
	}
};
