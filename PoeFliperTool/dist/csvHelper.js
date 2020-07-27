"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var CSV = /** @class */ (function () {
    function CSV() {
    }
    CSV.getSettings = function () {
        var output = [];
        fs_1.default.readFileSync(__dirname + "\\appFiles\\settings.txt").toString().split('\n').filter(function (x) { return x.indexOf("#") == 0; }).forEach(function (e) {
            output.push({
                name: e.split('=')[0],
                value: e.split('=')[1]
            });
        });
        return output;
    };
    CSV.setSettingValue = function (name, value) {
        var file = fs_1.default.readFileSync(__dirname + "\\appFiles\\settings.txt").toString().split('\n');
        var changedFile = file.map(function (x) {
            if (x.indexOf("#" + name) != -1) {
                x = x.split('=')[0] + "=" + value;
            }
            return x;
        });
        fs_1.default.writeFileSync(__dirname + "\\appFiles\\settings.txt", changedFile.join('\n'));
    };
    CSV.getItems = function () {
        var output = [];
        fs_1.default
            .readFileSync(__dirname + '\\appFiles\\items.csv')
            .toString()
            .split('\n')
            .filter(function (x) { return x.indexOf(',') != -1; })
            .forEach(function (row) {
            var item = row.split(',');
            var parsedItem = {
                Name: item[0],
                Path: item[1],
                Price: item[2],
                Currency: item[3],
                ID: item[4],
                Notify: item[5],
                LastNotify: item[6]
            };
            output.push(parsedItem);
        });
        return output;
    };
    CSV.addItem = function (itemName, itemID) {
        var items = CSV.getItems();
        var o = {
            Name: "New Item",
            ID: itemID,
            Path: itemName,
            Currency: "Chaos Orb",
            Price: "0",
            Notify: "0",
            LastNotify: Date.now().toString()
        };
        items.push(o);
        CSV.writeItems(items);
    };
    CSV.delateItem = function (itemID) {
        CSV.writeItems(CSV.getItems().filter(function (x) { return x.ID !== itemID; }));
    };
    CSV.writeItems = function (items) {
        fs_1.default.writeFileSync(__dirname + '\\appFiles\\items.csv', items.map(function (x) {
            return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
        }).join('\n'));
    };
    CSV.UpdateItem = function (itemID, itemProperty, Value) {
        var items = CSV.getItems();
        var item = items.filter(function (x) { return x.ID == itemID; })[0];
        switch (itemProperty) {
            case "Name":
                item.Name = Value;
                break;
            case "Price":
                item.Price = Value;
                break;
            case "Currency":
                item.Currency = Value;
                break;
            case "Notify":
                item.Notify = Value;
                break;
            case "LastNotify":
                item.LastNotify = Value;
                break;
            default: break;
        }
        CSV.writeItems(items.filter(function (x) { return x.ID != itemID; }).concat([item]));
    };
    CSV.GetData = function (id) {
        var file = fs_1.default.readFileSync(__dirname + '\\appFiles\\data.csv').toString().split('\n').filter(function (x) { return x.indexOf(id) !== -1; });
        var items = file.map(function (x) {
            var array = x.split(',');
            var o = {
                ID: array[0],
                Time: Number(array[1]),
                Price1: Number(array[2]),
                Price2: Number(array[3]),
                Price3: Number(array[4]),
            };
            return o;
        }).filter(function (x) { return x.Time > Date.now() - 2678400000; });
        return items;
    };
    return CSV;
}());
exports.default = CSV;
