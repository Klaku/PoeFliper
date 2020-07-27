import express from 'express';
import bodyParser from "body-parser";
import CSV from './csvHelper';
export default class ExpressApp{
    public Init(){
        const app = express();

        app.use(express.static(__dirname+'\\public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.get('/',(req,rep)=>{
            rep.sendFile('index.html');
        })

        app.get('/items',(req,rep)=>{
            rep.type('json');
            rep.send(CSV.getItems());
        });

        app.post('/items/add', (req,rep)=>{
            CSV.addItem(req.body.p, req.body.i);
            rep.send();
        })

        app.post('/items/update',(req,rep)=>{
            CSV.UpdateItem(req.body.i, req.body.p, req.body.v);
            rep.send();
        });

        app.post('/items/delete', (req,rep)=>{
            CSV.delateItem(req.body.i);
            rep.send();
        })

        app.get('/data/:id', (req,rep)=>{
            rep.send(CSV.GetData(req.params.id));
        })

        app.get('/settings', (req,rep)=>{
            rep.send(CSV.getSettings());
        })

        app.post('/settings', (req,rep)=>{
            CSV.setSettingValue(req.body.name, req.body.value);
            rep.send();
        })

        app.listen(8510);
    }
}