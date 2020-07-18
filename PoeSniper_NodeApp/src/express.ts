import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";
import { IItem } from './types';
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
            fs.writeFileSync(__dirname+'\\appFiles\\items.csv', ExpressApp.ChangeProperty(ExpressApp.GetParsedItems(), req.body.i, req.body.v, req.body.p).filter(x => typeof x !== "undefined").join('\n'));
            rep.send();
        });

        app.post('/items/delete', (req,rep)=>{
            fs.writeFileSync(__dirname+'\\appFiles\\items.csv', ExpressApp.GetParsedItems().map(x => {
                if(typeof x !== "undefined"){
                    switch(x.ID){
                        case req.body.i:
                            return;
                            break;
                        default: 
                            return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                    }
                }
            }).filter(x => typeof x !== "undefined").join('\n'));
            rep.send();
        })

        app.listen(8510);
    }

    public static ChangeProperty(elements:(IItem|undefined)[], id:string, value:string, prop:string){
        return elements.map(x => {
            if(typeof x !== "undefined"){
                if(x.ID != id){
                    return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                }else{
                    switch(prop){
                        case "Name": return [value, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                        case "Price": return [x.Name, x.Path, value, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
                        case "Currency": return [x.Name, x.Path, x.Price, value, x.ID, x.Notify, x.LastNotify].join(',');
                        case "Notify": return [x.Name, x.Path, x.Price, x.Currency, x.ID, value, x.LastNotify].join(',');
                    }
                    
                }
            }
        }).filter(x => typeof x !== "undefined")
    }

    public static GetParsedItems():(IItem|undefined)[]{
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
}