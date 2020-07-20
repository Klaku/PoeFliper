"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var RaportActions = /** @class */ (function () {
    function RaportActions() {
    }
    RaportActions.StoreItemInformation = function (itemID, properties) {
        fs_1.default.appendFileSync(__dirname + "\\appFiles\\Data.csv", itemID + "," + Date.now() + "," + properties[0].Price + "," + properties[1].Price + "," + properties[2].Price + "\n");
    };
    return RaportActions;
}());
exports.default = RaportActions;
