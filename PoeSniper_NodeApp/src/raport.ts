import fs from 'fs';
import { IArchiveItem, IRaportItem } from './types';
export default class RaportActions {
    private path = __dirname+"\\appFiles\\Data.csv";
    public StoreItemInformation(itemName:string, properties:string[][]){
        let items = properties.map(x => {
            if(x == null){
                return ",,";
            }
            return x.join(',');
        })
        fs.appendFileSync(this.path, `${itemName},${Date.now()},${items.join(',')}\n`);
    }
}