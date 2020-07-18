"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var RaportActions = /** @class */ (function () {
    function RaportActions() {
        this.path = __dirname + "\\appFiles\\Data.csv";
    }
    RaportActions.prototype.StoreItemInformation = function (itemName, properties) {
        var items = properties.map(function (x) {
            if (x == null) {
                return ",,";
            }
            return x.join(',');
        });
        fs_1.default.appendFileSync(this.path, itemName + "," + Date.now() + "," + items.join(',') + "\n");
    };
    return RaportActions;
}());
exports.default = RaportActions;
