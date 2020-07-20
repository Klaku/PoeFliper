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
        })
        return array;
    }
}