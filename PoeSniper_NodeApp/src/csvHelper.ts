import fs from 'fs';
import { IItem, IDataItem } from './types';
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
        fs.writeFileSync(__dirname+'\\appFiles\\items.csv', items.map(x => {
            return [x.Name, x.Path, x.Price, x.Currency, x.ID, x.Notify, x.LastNotify].join(',');
        }).join('\n'));
    }

    public static UpdateItem(itemID:string, itemProperty:string, Value:string){
        let items:IItem[] = CSV.getItems();
        let item:IItem = items.filter(x => x.ID == itemID)[0];
        switch(itemProperty){
            case "Name": item.Name = Value; break;
            case "Price": item.Price = Value; break;
            case "Currency": item.Currency = Value; break;
            case "Notify": item.Notify = Value; break;
            case "LastNotify": item.LastNotify = Value; break;
            default: break;
        }
        CSV.writeItems(items.filter(x => x.ID != itemID).concat([item]));
    }

    public static GetData(id:string):IDataItem[]{
        var file = fs.readFileSync(__dirname+'\\appFiles\\data.csv').toString().split('\n').filter(x => x.indexOf(id) !== -1);
        var items:IDataItem[] = file.map(x => {
            var array = x.split(',');
            var o:IDataItem = {
                ID:array[0],
                Time:Number(array[1]),
                Price1:Number(array[2]),
                Price2:Number(array[3]),
                Price3:Number(array[4]),
            }
            return o;
        });
        return items;
    }
}