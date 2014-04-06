angular.module('2048', [])

.controller('GameCtrl', ['$scope', 'Game', function ($scope, Game) {

  Game.start();
  $scope.tiles = Game.tiles;
}])

.constant('Slots', [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1},
  {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2},
  {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}, {x: 4, y: 3},
  {x: 1, y: 4}, {x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 4}])

.service('Game', ['Tile', function Game(Tile) {

  Game.prototype.start = function () {
    this.tiles = [new Tile(2), new Tile(2)];
  }

  Game.prototype.removeTile = function (tile) {
    this.tiles.splice(this.tiles.indexOf(tile), 1);
    tile.remove();
  }

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
  }

  function randSlot() {
    return Slots[Math.floor(Math.random() * Slots.length)];
  }

  return Tile;
}])
