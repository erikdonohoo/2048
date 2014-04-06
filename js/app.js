angular.module('2048', [])

.controller('GameCtrl', ['$scope', 'Game', function ($scope, Game) {

  Game.start();
  $scope.tiles = Game.tiles;
  Game.move('up');
}])

.constant('Slots', [[{},{},{},{}],[{},{},{},{}],[{},{},{},{}],[{},{},{},{}]])

.service('Game', ['Tile', '$filter', function Game(Tile, $filter) {

  Game.prototype.start = function () {
    this.tiles = [new Tile(2), new Tile(2)];
  };

  Game.prototype.removeTile = function (tile) {
    this.tiles.splice(this.tiles.indexOf(tile), 1);
    tile.remove();
  };

  Game.prototype.move = function (direction) {
    var x = 0; y = 0;
    if (direction === 'left') {
      x = -1;
      this.tiles = $filter('orderBy')(this.tiles, 'x');
    } else if (direction === 'right') {
      x = 1;
      this.tiles = $filter('orderBy')(this.tiles, 'x', true);
    } else if (direction === 'up') {
      y = -1;
      this.tiles = $filter('orderBy')(this.tiles, 'y');
    } else if (direction === 'down') {
      y = 1;
      this.tiles = $filter('orderBy')(this.tiles, 'y', true);
    } else {
      throw new Error("Invalid direction");
    }

    this.moveTiles(x, y);
  };

  Game.prototype.moveTiles = function (x, y) {
    angular.forEach(this.tiles, function (tile) {

    })
  };

}])

.service('Tile', ['Slots', function (Slots) {

  function Tile(val) {
    this.slot = randSlot();
    this.x = this.slot.x;
    this.y = this.slot.y;

    Slots.splice(Slots.indexOf(this.slot), 1);

    this.value = val;
  }

  Tile.prototype.remove = function () {
    Slots.push(this.slot);
  };

  function randSlot() {
    return Slots[Math.floor(Math.random() * Slots.length)];
  }

  return Tile;
}]);
