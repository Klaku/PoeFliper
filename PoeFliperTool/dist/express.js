"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var csvHelper_1 = __importDefault(require("./csvHelper"));
var ExpressApp = /** @class */ (function () {
    function ExpressApp() {
    }
    ExpressApp.prototype.Init = function () {
        var app = express_1.default();
        app.use(express_1.default.static(__dirname + '\\public'));
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.get('/', function (req, rep) {
            rep.sendFile('index.html');
        });
        app.get('/items', function (req, rep) {
            rep.type('json');
            rep.send(csvHelper_1.default.getItems());
        });
        app.post('/items/add', function (req, rep) {
            csvHelper_1.default.addItem(req.body.p, req.body.i);
            rep.send();
        });
        app.post('/items/update', function (req, rep) {
            csvHelper_1.default.UpdateItem(req.body.i, req.body.p, req.body.v);
            rep.send();
        });
        app.post('/items/delete', function (req, rep) {
            csvHelper_1.default.delateItem(req.body.i);
            rep.send();
        });
        app.get('/data/:id', function (req, rep) {
            rep.send(csvHelper_1.default.GetData(req.params.id));
        });
        app.listen(8510);
    };
    return ExpressApp;
}());
exports.default = ExpressApp;
