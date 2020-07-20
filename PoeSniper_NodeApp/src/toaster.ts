import fs from 'fs';
import puppeteer from 'puppeteer';
import { IInputItem, StringPair, IItem } from './types';
// import cheerio from 'cheerio';
import { notify } from 'node-notifier';
import { exec } from 'child_process';
import RaportActions from './raport';

export default class Toaster{
    private path = __dirname+"\\appFiles\\items.csv";
    private selector = "#trade > div.results > div.resultset > div > div.right > div > div.price > span";
    public async Monitor(){
        let items = this.GetFileContent();
        let raports = new RaportActions();
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        var ExPrice = Number(await this.getExaltedPrice(page));
        var MirrorPrice = Number(await this.getMirrorPrice(page));
        for(let itemIndex=0; itemIndex<items.length; itemIndex++){
            console.log(`scaning ${itemIndex}/${items.length}`);
            await this.CheckItem(items[itemIndex], page, raports, ExPrice, MirrorPrice);
        }
        browser.close();
    }



    private GetFileContent():(undefined|IItem)[]{
        return fs.readFileSync(this.path).toString().split('\n').filter(x => x.indexOf(',') != -1).map(x=> {
            let y = x.split(',');
            let o:IItem = {
                Name:y[0],
                Path:y[1],
                Price:y[2],
                Currency:y[3],
                ID:y[4],
                Notify:y[5],
                LastNotify:y[6]
            }
            return o;
        });
    }

    private async CheckItem(item:(IItem|undefined), page:puppeteer.Page, action:RaportActions, exaltPrice:number, MirrorPrice:number){
        if(typeof item == "undefined" || item.Notify == "0") return;
        await page.goto(item.Path);
        await page.waitForSelector(this.selector, { timeout: 5000 });

        let selectors:string[][] = await page.evaluate(()=>{
            let ItemsArray:string[][]= []
            for(var index = 0; index<3; index++){
                var priceSpan = document.querySelector("#trade > div.results > div.resultset > div:nth-child("+(index+1)+") > div.right > div > div.price > span > span:nth-child(3)");
                var currencySpan = document.querySelector("#trade > div.results > div.resultset > div:nth-child("+(index+1)+") > div.right > div > div.price > span > span.currency-text.currency-image > span");
                var status = document.querySelector("#trade > div.results > div.resultset > div:nth-child("+(index+1)+") > div.right > div > div.btns > span.pull-left > span.status");
                if(priceSpan != null && currencySpan != null && status != null){
                    var c = currencySpan.textContent !== null ? currencySpan.textContent : "Chaos Orb";
                    var pT = priceSpan.textContent !== null ? priceSpan.textContent : "0";
                    var p = c == "Chaos Orb" ? pT : c == "Exalted Orb" ? Number(pT) * Number(exaltPrice) : c == "Mirror of Kalandra" ? Number(pT) * Number(MirrorPrice) : 0;
                    ItemsArray[index] = [
                        p.toString(),
                        c,
                        status.textContent !== null ? status.textContent : "Offline",
                    ]
                }
            }
            return ItemsArray;
        });
        action.StoreItemInformation(item.ID, selectors);
        if(Number(selectors[0][0]).toString() !== 'NaN'){
            this.ValidateWindowsAlert(item.Name, Number(selectors[0][0]), selectors[0][1], item.Path, Number(item.Price), item.Currency, exaltPrice, MirrorPrice)
        }
        
    }

    public GetParsedItems():(IItem|undefined)[]{
        return fs.readFileSync(__dirname+'\\appFiles\\items.csv').toString().split('\n').map(x => {
                if(x.indexOf(',')!=-1){
                    var y = x.trim().split(',');
                    var o :IItem = {
                        Name:y[0],
                        Path:y[1],
                        Price:y[2],
                        Currency:y[3],
                        ID:y[4],
                        Notify:y[5],
                        LastNotify:y[6]
                    }
                    return o
                }else{
                    return undefined;
                }
            })
    }
    public async getExaltedPrice(page:puppeteer.Page){
        await page.goto("https://poe.ninja/challenge/currency/exalted-orb");
        await page.waitForSelector("tr:nth-child(1) div:nth-child(2) span.currency-amount", { timeout: 5000 });
        var string = await page.evaluate(()=>{
            var selector = document.querySelector('tr:nth-child(1) div:nth-child(2) span.currency-amount');
            return selector?.getAttribute("title");
        });
        return string;
    }

    public async getMirrorPrice(page:puppeteer.Page){
        await page.goto("https://poe.ninja/challenge/currency/mirror-of-kalandra");
        await page.waitForSelector("tr:nth-child(1) div:nth-child(2) span.currency-amount", { timeout: 5000 });
        var string = await page.evaluate(()=>{
            var selector = document.querySelector('tr:nth-child(1) div:nth-child(2) span.currency-amount');
            return selector?.getAttribute("title");
        });
        return string;
    }

    private ValidateWindowsAlert(ItemName:string, ItemPrice:number, ItemCurrency:string, ItemURL:string, AlertPrice:number, AlertCurrency:string, ExPrice:number, MirPrice:number){
        if(AlertCurrency == "Chaos Orb" && AlertPrice > ItemPrice){
            this.SendWindowsAlert(ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }

        if(AlertCurrency == "Exalted Orb" && AlertPrice*ExPrice > ItemPrice){
            this.SendWindowsAlert(ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }

        if(AlertCurrency == "Mirror of Kalandra" && AlertPrice*MirPrice > ItemPrice){
            this.SendWindowsAlert(ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }
    }

    private SendWindowsAlert(ItemName:string, ItemPrice:number, ItemCurrency:string, ItemURL:string, AlertPrice:number, AlertCurrency:string){
        notify({
            title:"Time to Snipe!",
            message:`${ItemName} wystawiony za ${ItemPrice} ${ItemCurrency}\n Ustawiłeś powiadomienia na kwote ${AlertPrice} ${AlertCurrency}`
        }, (error, response, metadata)=>{
            if(response == "activate" && metadata?.activationType == "clicked"){
                exec(`start "" "${ItemURL}"`)
            }
        })
    }
}