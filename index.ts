import express, {Express, Request, Response} from 'express'
import { Interface } from 'readline';
// Help for build command: https://stackoverflow.com/questions/31749952/how-to-run-typescript-compiler-as-a-package-json-script-without-grunt-or-gulp
var app: Express = express();
const port: number = 3000;
const bodyParser = require('body-parser'); // Had to manually add body parser so the post data gets through and is not undefined. Help from: https://stackoverflow.com/questions/66064389/getting-typeerror-cannot-read-property-name-of-undefined-while-posting-the-f
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
interface vehicle {
    model: string;
    color: string;
    year: number;
    power: number;
    bodyType: string;
    wheelCount: 3;
};

function isVehicle(obj: any): obj is vehicle{
    return obj.model !== undefined
} // Help from: https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript

interface boat {
    draft: number;
}
function isBoat(obj: any): obj is boat{
    return obj.draft !== undefined
}
interface plane {
    wingspan: number
}
function isPlane(obj: any): obj is plane{
    return obj.wingspan !== undefined
}
let vehicleList: Array<vehicle|boat|plane> = []; //Help from: https://stackoverflow.com/questions/29382389/defining-array-with-multiple-types-in-typescript


app.get('/', (req: Request,res: Response) => {
    res.send("Hello from Express.")

});
app.get('/hello', (req: Request,res: Response) => {
    res.send("Hello world")

});

app.post('/vehicle/add', (req: Request,res: Response) => {

    let data = req.body;
    if(isVehicle(data)) {
        let newVehicle: vehicle = {
            model: data.model,
            color: data.color,
            year: data.year,
            power: data.power,
            bodyType: data.bodyType,
            wheelCount: data.wheelCount
        }
        
        vehicleList.push(newVehicle);
    }

    if(isBoat(data)) {
        let newBoat: boat = {
            draft: data.draft
        }
        vehicleList.push(newBoat)
    }

    if(isPlane(data)) {
        let newPlane: plane = {
            wingspan: data.wingspan
        }
        vehicleList.push(newPlane)
    }
    console.log(vehicleList)
    res.status(201).send("Vehicle added")
});

app.get('/vehicle/search/:model', (req: Request,res: Response) => {
    let model = req.params.model;
    let vehicleFound;
    vehicleList.map((element, index) => {
        if(isVehicle(element)) { //help from https://stackoverflow.com/questions/55421793/how-to-map-over-array-of-multiple-types-in-typescript
            if(element.model == model) {
                vehicleFound = element;
                if(element.bodyType == undefined) {
                    let moreInfo = vehicleList[index+1];
                    vehicleFound = {element,moreInfo}
                }
            }
        }
    })
    console.log(vehicleFound)
    if(vehicleFound != undefined) {
        res.json(vehicleFound)
    }
    else {
        res.status(404).send("Vehicle not found.")
    }
})

app.listen(port, () => {
    console.log("Server running.")

});