import puppeteer from 'puppeteer';
import { IItem, PoeTradeItem } from './types';
import { notify } from 'node-notifier';
import { exec } from 'child_process';
import RaportActions from './raport';
import CSV from './csvHelper';

export default class Toaster{
    private selector = "#trade > div.results > div.resultset > div > div.right > div > div.price > span";
    public async Monitor(){
        let items:IItem[] = CSV.getItems();
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        var ExPrice = Number(await this.getExaltedPrice(page));
        var MirrorPrice = Number(await this.getMirrorPrice(page));
        for(let i=0; i<items.length; i++){
            await this.CheckItem(items[i], page, ExPrice, MirrorPrice);
        }
        browser.close();
    }

    private async CheckItem(item:IItem, page:puppeteer.Page, exaltPrice:number, MirrorPrice:number){
        await page.goto(item.Path);
        await page.waitForSelector(this.selector, { timeout: 5000 });
        let selectors:PoeTradeItem[] = await page.evaluate((ex,mp)=>{
            let ItemsArray:PoeTradeItem[]= []
            for(var ii = 0; ii<3; ii++){
                var priceSpan = document.querySelector("#trade > div.results > div.resultset > div:nth-child("+(ii+1)+") > div.right > div > div.price > span > span:nth-child(3)");
                var currencySpan = document.querySelector("#trade > div.results > div.resultset > div:nth-child("+(ii+1)+") > div.right > div > div.price > span > span.currency-text.currency-image > span");
                var status = document.querySelector("#trade > div.results > div.resultset > div:nth-child("+(ii+1)+") > div.right > div > div.btns > span.pull-left > span.status");
                if(priceSpan != null && currencySpan != null && status != null){
                    var c = currencySpan.textContent !== null ? currencySpan.textContent : "Chaos Orb";
                    var pT = priceSpan.textContent !== null ? priceSpan.textContent : "0";
                    var p = c == "Chaos Orb" ? pT : c == "Exalted Orb" ? Number(pT) * Number(ex) : c == "Mirror of Kalandra" ? Number(pT) * Number(mp) : 0;
                    var o:PoeTradeItem = {
                        Price:Number(p),
                        Currency:c,
                        Status: status.textContent !== null ? status.textContent : "Offline"
                    }
                    ItemsArray.push(o);
                }else{
                    var o:PoeTradeItem = {
                        Price:0,
                        Currency:"Chaos Orb",
                        Status:"Offline"
                    }
                }
            }
            return ItemsArray;
        }, exaltPrice, MirrorPrice);
        RaportActions.StoreItemInformation(item.ID, selectors);
        if(selectors[0].Price !== 0 && item.Notify != "0"){
            this.ValidateWindowsAlert(item.ID, item.Name, selectors[0].Price, selectors[0].Currency, item.Path, Number(item.Price), item.Currency, exaltPrice, MirrorPrice);
        }
        
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

    private ValidateWindowsAlert(ItemID:string, ItemName:string, ItemPrice:number, ItemCurrency:string, ItemURL:string, AlertPrice:number, AlertCurrency:string, ExPrice:number, MirPrice:number){
        let ChaosItemPrice = ItemCurrency == "Chaos Orb" ? ItemPrice : ItemCurrency == "Exalted Orb" ? ItemPrice*ExPrice : ItemCurrency == "Mirror of Kalandra"? ItemPrice* MirPrice : ItemPrice;
        if(AlertCurrency == "Chaos Orb" && AlertPrice > ChaosItemPrice){
            this.SendWindowsAlert(ItemID,ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }

        if(AlertCurrency == "Exalted Orb" && AlertPrice*ExPrice > ChaosItemPrice){
            this.SendWindowsAlert(ItemID,ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }

        if(AlertCurrency == "Mirror of Kalandra" && AlertPrice*MirPrice > ChaosItemPrice){
            this.SendWindowsAlert(ItemID,ItemName, ItemPrice, ItemCurrency, ItemURL, AlertPrice, AlertCurrency);
        }
    }

    private SendWindowsAlert(ItemID:string, ItemName:string, ItemPrice:number, ItemCurrency:string, ItemURL:string, AlertPrice:number, AlertCurrency:string){
        notify({
            title:"Time to Snipe!",
            message:`${ItemName} wystawiony za ${ItemPrice} ${ItemCurrency}\n Ustawiłeś powiadomienia na kwote ${AlertPrice} ${AlertCurrency}`
        }, (error, response, metadata)=>{
            if(response == "activate" && metadata?.activationType == "clicked"){
                exec(`start "" "${ItemURL}"`)
            }
        })
        CSV.UpdateItem(ItemID, "LastNotify", Date.now().toString());
    }
}