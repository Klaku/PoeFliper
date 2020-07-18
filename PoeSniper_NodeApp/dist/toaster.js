"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var puppeteer_1 = __importDefault(require("puppeteer"));
// import cheerio from 'cheerio';
var node_notifier_1 = require("node-notifier");
var child_process_1 = require("child_process");
var raport_1 = __importDefault(require("./raport"));
var Toaster = /** @class */ (function () {
    function Toaster() {
        this.path = __dirname + "\\appFiles\\items.csv";
        this.selector = "#trade > div.results > div.resultset > div > div.right > div > div.price > span";
    }
    Toaster.prototype.Monitor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, raports, browser, page, itemIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = this.GetFileContent();
                        raports = new raport_1.default();
                        return [4 /*yield*/, puppeteer_1.default.launch()];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _a.sent();
                        itemIndex = 0;
                        _a.label = 3;
                    case 3:
                        if (!(itemIndex < items.length)) return [3 /*break*/, 6];
                        console.log("scaning " + itemIndex + "/" + items.length);
                        return [4 /*yield*/, this.CheckItem(items[itemIndex], page, raports)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        itemIndex++;
                        return [3 /*break*/, 3];
                    case 6:
                        browser.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    Toaster.prototype.GetFileContent = function () {
        return fs_1.default.readFileSync(this.path).toString().split('\n').filter(function (x) { return x.indexOf(',') != -1; }).map(function (x) {
            var y = x.split(',');
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
        });
    };
    Toaster.prototype.CheckItem = function (item, page, action) {
        return __awaiter(this, void 0, void 0, function () {
            var selectors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof item == "undefined" || item.Notify == "0")
                            return [2 /*return*/];
                        return [4 /*yield*/, page.goto(item.Path)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector(this.selector, { timeout: 5000 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () {
                                var ItemsArray = [];
                                for (var index = 0; index < 3; index++) {
                                    var priceSpan = document.querySelector("#trade > div.results > div.resultset > div:nth-child(" + (index + 1) + ") > div.right > div > div.price > span > span:nth-child(3)");
                                    var currencySpan = document.querySelector("#trade > div.results > div.resultset > div:nth-child(" + (index + 1) + ") > div.right > div > div.price > span > span.currency-text.currency-image > span");
                                    var status = document.querySelector("#trade > div.results > div.resultset > div:nth-child(" + (index + 1) + ") > div.right > div > div.btns > span.pull-left > span.status");
                                    if (priceSpan != null && currencySpan != null && status != null) {
                                        ItemsArray[index] = [
                                            priceSpan.textContent !== null ? priceSpan.textContent : "0",
                                            currencySpan.textContent !== null ? currencySpan.textContent : "Chaos Orb",
                                            status.textContent !== null ? status.textContent : "Offline",
                                        ];
                                    }
                                }
                                return ItemsArray;
                            })];
                    case 3:
                        selectors = _a.sent();
                        action.StoreItemInformation(item.Name, selectors);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toaster.prototype.ValidateWindowsAlert = function (Model, currentPrice, currentCurrency) {
        if (currentCurrency == "Chaos Orb" && currentPrice < Model.ChaosAlert) {
            this.SendWindowsAlert(Model.Name, Model.ChaosAlert, Model.Url, currentCurrency, currentPrice);
        }
        if (currentCurrency == "Exalted Orb" && currentPrice < Model.ExaltedAlert) {
            this.SendWindowsAlert(Model.Name, Model.ExaltedAlert, Model.Url, currentCurrency, currentPrice);
        }
    };
    Toaster.prototype.SendWindowsAlert = function (name, currency, url, currentCurrency, currentPrice) {
        node_notifier_1.notify({
            title: "Znalazłem nowy flip",
            message: name + " zosta\u0142 wystawiony za " + currentPrice + " " + currentCurrency + "\nUstawi\u0142e\u015B powiadomienia na kwote " + currency
        }, function (error, response, metadata) {
            if (response == "activate" && (metadata === null || metadata === void 0 ? void 0 : metadata.activationType) == "clicked") {
                child_process_1.exec("start \"\" \"" + url + "\"");
            }
        });
    };
    return Toaster;
}());
exports.default = Toaster;
