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
    Player.prototype.repeatStr = function (str, n) {
        var newString = '';
        while (n-- > 0)
            newString += str;
        return newString;
    };
    Player.prototype.setGridTemplateArea = function (playerElement, styleGridArea, maxLength) {
        var _this = this;
        if (playerElement && styleGridArea) {
            var styleGridAreaString = styleGridArea.reduce(function (acc, column) {
                if (column.length) {
                    acc += "\"".concat(column.toString().replace(',', ''), "\"");
                }
                else {
                    acc += "\"".concat(_this.repeatStr('. ', maxLength), "\"");
                }
                return acc;
            }, "");
            playerElement.style.gridTemplateAreas = styleGridAreaString;
        }
    };
    Player.prototype.setGridArea = function (config) {
        config
            .reduce(function (acc, arr) { return acc.concat(arr); }, [])
            .forEach(function (item) {
            var elem = document.getElementById(item);
            if (!elem) {
                item !== "." && console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441 id: ".concat(item, " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"));
                return;
            }
            elem.setAttribute("style", "grid-area: ".concat(item));
        });
    };
    Player.prototype.moveElement = function () {
        if (!this.currentConfig) {
            console.log("Не указан конфиг");
            return;
        }
        var config = this.configs[this.currentConfig];
        var playerElement = document.getElementById("player");
        var styleGridArea = [];
        var lengthsConfig = [];
        config.forEach(function (item) {
            var styleItemGrid = item.reduce(function (acc, value) { return (acc += "".concat(value, " ")); }, "");
            lengthsConfig.push(item.length);
            styleGridArea.push(styleItemGrid);
        });
        this.setGridTemplateArea(playerElement, styleGridArea, Math.max.apply(Math, lengthsConfig));
        this.setGridArea(config);
    };
    return Player;
}());
var newPlayer = new Player();
newPlayer.addConfig("first", [
    ["time", "progresBar", "progresBar"],
    ["play", "left", "right"],
]);
newPlayer.addConfig("second", [
    ["play", "left", "right"],
    ["time", "progresBar", "progresBar"],
]);
newPlayer.addConfig("new", [
    [],
    ["left", ".", ".", "right"],
    ["play", "time", "progresBar", "progresBar"],
]);
newPlayer.switchConfig("new");
newPlayer.moveElement();
