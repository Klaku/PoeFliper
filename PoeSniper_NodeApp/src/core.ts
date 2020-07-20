import Toaster from './toaster';
import shedule from 'node-schedule';
import RaportActions from './raport';
import ExpressApp from './express';

const monitor = shedule.scheduleJob('0 */2 * * * *',async function(){
    let m = new Toaster();
    await m.Monitor();
})

// const raport = shedule.scheduleJob('*/10 * * * * *', ()=>{
//     let raport = new RaportActions();
//     raport.CreateRaport();
// })

new ExpressApp().Init();
