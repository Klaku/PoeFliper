import express from 'express';
import fs from 'fs';
import puppeteer from 'puppeteer';
import bodyParser from "body-parser";
import { IItem, IArchiveItem } from './types';
import CSV from './csvHelper';
export default class ExpressApp{
    public Init(){
        const app = express();

        app.use(express.static('public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.get('/',(req,rep)=>{
            rep.sendFile('index.html');
        })

        app.get('/items',(req,rep)=>{
            rep.type('json');
            rep.send(ExpressApp.GetParsedItems().filter(x => typeof x !== "undefined"));
        });

        app.post('/items/update',(req,rep)=>{
            fs.writeFileSync(__dirname+'\\appFiles\\items.csv', ExpressApp.ChangeProperty(CSV.getItems(), req.body.i, req.body.v, req.body.p).filter(x => typeof x !== "undefined").join('\n'));
            rep.send();
        });

        app.post('/items/delete', (req,rep)=>{
            fs.writeFileSync(__dirname+'\\appFiles\\items.csv', CSV.getItems().map(x => {
                switch(x.ID){
                    case req.body.i:
                        return;
                        break;
                    default: 
                        return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                }
            }).filter(x => typeof x !== "undefined").join('\n'));
            rep.send();
        })

        app.listen(8510);
    }

    public static ChangeProperty(elements:IItem[], id:string, value:string, prop:string):string[]{
        return elements.map(x => {
            if(x.ID != id){
                return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
            }else{
                switch(prop){
                    case "Name": return [value, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                    case "Price": return [x.Name, x.Path, value, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                    case "Currency": return [x.Name, x.Path, x.Price, value, x.ID, x.Notify, x.LastNotify].join(',');
                    case "Notify": return [x.Name, x.Path, x.Price, x.Currency, x.ID, value, x.LastNotify].join(',');
                    default return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                }
                
            }
        });
    }

    private static async getExaltedPrice(){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://poe.ninja/challenge/currency/exalted-orb");
        await page.waitForSelector("tr:nth-child(1) div:nth-child(2) span.currency-amount", { timeout: 5000 });
        var string = await page.evaluate(()=>{
            var selector = document.querySelector('tr:nth-child(1) div:nth-child(2) span.currency-amount');
            return selector?.getAttribute("title");
        });
        return Number(string);
    }

    private async getMirrorPrice(){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://poe.ninja/challenge/currency/mirror-of-kalandra");
        await page.waitForSelector("tr:nth-child(1) div:nth-child(2) span.currency-amount", { timeout: 5000 });
        var string = await page.evaluate(()=>{
            var selector = document.querySelector('tr:nth-child(1) div:nth-child(2) span.currency-amount');
            return selector?.getAttribute("title");
        });
        return Number(string);
    }
}