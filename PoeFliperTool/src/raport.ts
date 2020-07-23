import fs from 'fs';
import { IRaportItem, PoeTradeItem } from './types';
export default class RaportActions {
    public static StoreItemInformation(itemID:string, properties:PoeTradeItem[]){
        fs.appendFileSync(__dirname+"\\appFiles\\Data.csv", `${itemID},${Date.now()},${properties[0].Price},${properties[1].Price},${properties[2].Price}\n`);
    }
}