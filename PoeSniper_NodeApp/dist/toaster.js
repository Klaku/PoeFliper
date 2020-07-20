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
var puppeteer_1 = __importDefault(require("puppeteer"));
var node_notifier_1 = require("node-notifier");
var child_process_1 = require("child_process");
var raport_1 = __importDefault(require("./raport"));
var csvHelper_1 = __importDefault(require("./csvHelper"));
var Toaster = /** @class */ (function () {
    function Toaster() {
        this.path = __dirname + "\\appFiles\\items.csv";
        this.selector = "#trade > div.results > div.resultset > div > div.right > div > div.price > span";
    }
    Toaster.prototype.Monitor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, browser, page, ExPrice, _a, MirrorPrice, _b, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        items = csvHelper_1.default.getItems();
                        return [4 /*yield*/, puppeteer_1.default.launch()];
                    case 1:
                        browser = _c.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        page = _c.sent();
                        _a = Number;
                        return [4 /*yield*/, this.getExaltedPrice(page)];
                    case 3:
                        ExPrice = _a.apply(void 0, [_c.sent()]);
                        _b = Number;
                        return [4 /*yield*/, this.getMirrorPrice(page)];
                    case 4:
                        MirrorPrice = _b.apply(void 0, [_c.sent()]);
                        i = 0;
                        _c.label = 5;
                    case 5:
                        if (!(i < items.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.CheckItem(items[i], page, ExPrice, MirrorPrice)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        browser.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    Toaster.prototype.CheckItem = function (item, page, exaltPrice, MirrorPrice) {
        return __awaiter(this, void 0, void 0, function () {
            var selectors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.goto(item.Path)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector(this.selector, { timeout: 5000 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function (ex, mp) {
                                var ItemsArray = [];
                                for (var ii = 0; ii < 3; ii++) {
                                    var priceSpan = document.querySelector("#trade > div.results > div.resultset > div:nth-child(" + (ii + 1) + ") > div.right > div > div.price > span > span:nth-child(3)");
                                    var currencySpan = document.querySelector("#trade > div.results > div.resultset > div:nth-child(" + (ii + 1) + ") > div.right > div > div.price > span > span.currency-text.currency-image > span");
                                    var status = document.querySelector("#trade > div.results > div.resultset > div:nth-child(" + (ii + 1) + ") > div.right > div > div.btns > span.pull-left > span.status");
                                    if (priceSpan != null && currencySpan != null && status != null) {
                                        var c = currencySpan.textContent !== null ? currencySpan.textContent : "Chaos Orb";
                                        var pT = priceSpan.textContent !== null ? priceSpan.textContent : "0";
                                        var p = c == "Chaos Orb" ? pT : c == "Exalted Orb" ? Number(pT) * Number(ex) : c == "Mirror of Kalandra" ? Number(pT) * Number(mp) : 0;
                                        var o = {
                                            Price: Number(p),
                                            Currency: c,
                                            Status: status.textContent !== null ? status.textContent : "Offline"
                                        };
                                        ItemsArray.push(o);
                                    }
                                    else {
                                        var o = {
                                            Price: 0,
                                            Currency: "Chaos Orb",
                                            Status: "Offline"
                                        };
                                    }
                                }
                                return ItemsArray;
                            }, exaltPrice, MirrorPrice)];
                    case 3:
                        selectors = _a.sent();
                        raport_1.default.StoreItemInformation(item.ID, selectors);
                        if (selectors[0].Price !== 0) {
                            this.ValidateWindowsAlert(item.ID, item.Name, selectors[0].Price, selectors[0].Currency, item.Path, Number(item.Price), item.Currency, exaltPrice, MirrorPrice);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Toaster.prototype.getExaltedPrice = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var string;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.goto("https://poe.ninja/challenge/currency/exalted-orb")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector("tr:nth-child(1) div:nth-child(2) span.currency-amount", { timeout: 5000 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () {
                                var selector = document.querySelector('tr:nth-child(1) div:nth-child(2) span.currency-amount');
                                return selector === null || selector === void 0 ? void 0 : selector.getAttribute("title");
                            })];
                    case 3:
                        string = _a.sent();
                        return [2 /*return*/, string];
                }
            });
        });
    };
    Toaster.prototype.getMirrorPrice = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var string;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.goto("https://poe.ninja/challenge/currency/mirror-of-kalandra")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector("tr:nth-child(1) div:nth-child(2) span.currency-amount", { timeout: 5000 })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () {
                                var selector = document.querySelector('tr:nth-child(1) div:nth-child(2) span.currency-amount');
                                return selector === null || selector === void 0 ? void 0 : selector.getAttribute("title");
                            })];
                    case 3:
                        string = _a.sent();
                        return [2 /*return*/, string];
                }
            });
        });
    };
    Toaster.prototype.ValidateWindowsAlert = function (ItemID, ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency, ExPrice, MirPrice) {
        var ChaosItemPrice = ItemCurrency == "Chaos Orb" ? ItemPrice : ItemCurrency == "Exalted Orb" ? ItemPrice * ExPrice : ItemCurrency == "Mirror of Kalandra" ? ItemPrice * MirPrice : ItemPrice;
        if (AlertCurrency == "Chaos Orb" && AlertPrice > ChaosItemPrice) {
            this.SendWindowsAlert(ItemID, ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }
        if (AlertCurrency == "Exalted Orb" && AlertPrice * ExPrice > ChaosItemPrice) {
            this.SendWindowsAlert(ItemID, ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }
        if (AlertCurrency == "Mirror of Kalandra" && AlertPrice * MirPrice > ChaosItemPrice) {
            this.SendWindowsAlert(ItemID, ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }
    };
    Toaster.prototype.SendWindowsAlert = function (ItemID, ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency) {
        node_notifier_1.notify({
            title: "Time to Snipe!",
            message: ItemName + " wystawiony za " + ItemPrice + " " + ItemCurrency + "\n Ustawi\u0142e\u015B powiadomienia na kwote " + AlertPrice + " " + AlertCurrency
        }, function (error, response, metadata) {
            if (response == "activate" && (metadata === null || metadata === void 0 ? void 0 : metadata.activationType) == "clicked") {
                child_process_1.exec("start \"\" \"" + ItemURL + "\"");
            }
        });
        csvHelper_1.default.UpdateItem(ItemID, "LastNotify", Date.now().toString());
    };
    return Toaster;
}());
exports.default = Toaster;
