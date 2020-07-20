import fs from 'fs';
import { IItem } from './types';
export default class CSV{
    public static getItems():IItem[]{
        var file: string[] = fs.readFileSync(__dirname+'\\appFiles\\items.csv').toString().split('\n').filter(x => x.indexOf(',') != -1);
        var array:IItem[] = [];
        file.forEach(row =>{
            let item = row.split(',');
            let parsedItem:IItem = {
                Name: item[0],
                Path: item[1],
                Price: item[2],
                Currency: item[3],
                ID:item[4],
                Notify: item[5],
                LastNotify: item[6]
            }
            array.push(parsedItem);
        })
        return array;
    }

    public static delateItem(itemID:string){
        CSV.writeItems(CSV.getItems().filter(x => x.ID !== itemID));
    }

    public static writeItems(items:IItem[]){
        fs.writeFileSync(__dirname+'\\appFiles\\items.csv', items.join('\n'));
    }

    public static UpdateItem(itemID:string, itemProperty:string, Value:string){
        let items:IItem[] = CSV.getItems();
        let item:IItem = items.filter(x => x.ID == itemID)[0];
        switch(itemProperty){
            case "Name": item.Name = itemProperty; break;
            case "Price": item.Price = itemProperty; break;
            case "Currency": item.Currency = itemProperty; break;
            case "Notify": item.Notify = itemProperty; break;
            case "LastNotify": item.LastNotify = itemProperty; break;
            default: break;
        }
        CSV.writeItems(items.filter(x => x.ID == itemID).concat([item]));
    }
}