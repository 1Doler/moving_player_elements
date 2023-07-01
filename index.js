var Player = /** @class */ (function () {
    function Player() {
        this.configs = {};
        this.currentConfig = null;
    }
    Player.prototype.addConfig = function (configName, element) {
        this.configs[configName] = element;
    };
    Player.prototype.switchConfig = function (configName) {
        this.currentConfig = configName;
    };
    Player.prototype.moveElement = function () {
        if (!this.currentConfig) {
            console.log("Не указан конфиг");
            return;
        }
        var config = this.configs[this.currentConfig];
        var playerElement = document.getElementById("player");
        var styleGridArea = [];
        config.forEach(function (item) {
            var styleItemGrid = item.reduce(function (acc, value) { return (acc += "".concat(value, " ")); }, "");
            styleGridArea.push(styleItemGrid);
        });
        console.log(styleGridArea);
        if (playerElement) {
            playerElement.style.gridTemplateAreas = "\"".concat(styleGridArea[0], " .\"\n                                       \"").concat(styleGridArea[1], " .\"");
        }
        config
            .reduce(function (acc, arr) { return acc.concat(arr); }, [])
            .forEach(function (item) {
            var elem = document.getElementById(item);
            if (elem) {
                elem.setAttribute("style", "grid-area: ".concat(item));
            }
        });
    };
    return Player;
}());
var newPlayer = new Player();
newPlayer.addConfig("first", [
    ["time", "progresBar", "progresBar"],
    ["play", "left", "right"],
]);
newPlayer.switchConfig("first");
newPlayer.moveElement();
console.log(newPlayer);
