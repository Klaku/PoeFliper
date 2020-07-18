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

        for(let itemIndex=0; itemIndex<items.length; itemIndex++){
            console.log(`scaning ${itemIndex}/${items.length}`);
            await this.CheckItem(items[itemIndex], page, raports);
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

    private async CheckItem(item:(IItem|undefined), page:puppeteer.Page, action:RaportActions){
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
                    ItemsArray[index] = [
                        priceSpan.textContent !== null ? priceSpan.textContent : "0",
                        currencySpan.textContent !== null ? currencySpan.textContent : "Chaos Orb",
                        status.textContent !== null ? status.textContent : "Offline",
                    ]
                }
            }
            return ItemsArray;
        });
        action.StoreItemInformation(item.Name, selectors);
    }

    private async getExaltedPrice(){
        
    }

    private ValidateWindowsAlert(Model:IInputItem, currentPrice:number, currentCurrency:string){
        if(currentCurrency == "Chaos Orb" && currentPrice < Model.ChaosAlert){
            this.SendWindowsAlert(Model.Name, Model.ChaosAlert, Model.Url, currentCurrency, currentPrice)
        }

        if(currentCurrency == "Exalted Orb" && currentPrice < Model.ExaltedAlert){
            this.SendWindowsAlert(Model.Name, Model.ExaltedAlert, Model.Url, currentCurrency, currentPrice)
        }
    }

    private SendWindowsAlert(name:string, currency:number, url:string, currentCurrency:string, currentPrice:number){
        notify({
            title:"Znalazłem nowy flip",
            message:`${name} został wystawiony za ${currentPrice} ${currentCurrency}\nUstawiłeś powiadomienia na kwote ${currency}`
        }, (error, response, metadata)=>{
            if(response == "activate" && metadata?.activationType == "clicked"){
                exec(`start "" "${url}"`)
            }
        })
    }
}