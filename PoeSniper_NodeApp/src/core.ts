import Toaster from './toaster';
import shedule from 'node-schedule';
import ExpressApp from './express';

const monitor = shedule.scheduleJob('0 * * * * *',async function(){
    let m = new Toaster();
    await m.Monitor();
});

new ExpressApp().Init();
