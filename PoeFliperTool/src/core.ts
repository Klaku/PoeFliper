import Toaster from './toaster';
import shedule from 'node-schedule';
import ExpressApp from './express';
import CSV from './csvHelper'
let settings = CSV.getSettings();
let span = settings.filter(x => x.name == "#scanspan");
const monitor = shedule.scheduleJob('0 */'+span[0].value+' * * * *',async function(){
    let m = new Toaster();
    await m.Monitor();
});

new ExpressApp().Init();
