import Toaster from './toaster';
import shedule from 'node-schedule';
import RaportActions from './raport';
import ExpressApp from './express';
async function foo(){
    let toast = new Toaster();
    await toast.Monitor();
}

foo();

// const raport = shedule.scheduleJob('*/10 * * * * *', ()=>{
//     let raport = new RaportActions();
//     raport.CreateRaport();
// })

new ExpressApp().Init();
