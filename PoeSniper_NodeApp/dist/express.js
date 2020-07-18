"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var body_parser_1 = __importDefault(require("body-parser"));
var ExpressApp = /** @class */ (function () {
    function ExpressApp() {
    }
    ExpressApp.prototype.Init = function () {
        var app = express_1.default();
        app.use(express_1.default.static('public'));
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.get('/', function (req, rep) {
            rep.sendFile('index.html');
        });
        app.get('/items', function (req, rep) {
            rep.type('json');
            rep.send(ExpressApp.GetParsedItems().filter(function (x) { return typeof x !== "undefined"; }));
        });
        app.post('/items/update', function (req, rep) {
            fs_1.default.writeFileSync(__dirname + '\\appFiles\\items.csv', ExpressApp.ChangeProperty(ExpressApp.GetParsedItems(), req.body.i, req.body.v, req.body.p).filter(function (x) { return typeof x !== "undefined"; }).join('\n'));
            rep.send();
        });
        app.post('/items/delete', function (req, rep) {
            fs_1.default.writeFileSync(__dirname + '\\appFiles\\items.csv', ExpressApp.GetParsedItems().map(function (x) {
                if (typeof x !== "undefined") {
                    switch (x.ID) {
                        case req.body.i:
                            return;
                            break;
                        default:
                            return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                    }
                }
            }).filter(function (x) { return typeof x !== "undefined"; }).join('\n'));
            rep.send();
        });
        app.listen(8510);
    };
    ExpressApp.ChangeProperty = function (elements, id, value, prop) {
        return elements.map(function (x) {
            if (typeof x !== "undefined") {
                if (x.ID != id) {
                    return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                }
                else {
                    switch (prop) {
                        case "Name": return [value, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                        case "Price": return [x.Name, x.Path, value, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                        case "Currency": return [x.Name, x.Path, x.Price, value, x.ID, x.Notify, x.LastNotify].join(',');
                        case "Notify": return [x.Name, x.Path, x.Price, x.Currency, x.ID, value, x.LastNotify].join(',');
                    }
                }
            }
        }).filter(function (x) { return typeof x !== "undefined"; });
    };
    ExpressApp.GetParsedItems = function () {
        return fs_1.default.readFileSync(__dirname + '\\appFiles\\items.csv').toString().split('\n').map(function (x) {
            if (x.indexOf(',') != -1) {
                var y = x.trim().split(',');
                var o = {
                    Name: y[0],
                    Path: y[1],
                    Price: y[2],
                    Currency: y[3],
                    ID: y[4],
                    Notify: y[5],
                    LastNotify: y[6]
                };
                return o;
            }
            else {
                return undefined;
            }
        });
    };
    return ExpressApp;
}());
exports.default = ExpressApp;
