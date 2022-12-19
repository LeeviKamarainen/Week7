"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Help for build command: https://stackoverflow.com/questions/31749952/how-to-run-typescript-compiler-as-a-package-json-script-without-grunt-or-gulp
var app = (0, express_1.default)();
const port = 3000;
const bodyParser = require('body-parser'); // Had to manually add body parser so the post data gets through and is not undefined. Help from: https://stackoverflow.com/questions/66064389/getting-typeerror-cannot-read-property-name-of-undefined-while-posting-the-f
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
;
function isVehicle(obj) {
    return obj.model !== undefined;
} // Help from: https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
function isBoat(obj) {
    return obj.draft !== undefined;
}
function isPlane(obj) {
    return obj.wingspan !== undefined;
}
let vehicleList = []; //Help from: https://stackoverflow.com/questions/29382389/defining-array-with-multiple-types-in-typescript
app.get('/', (req, res) => {
    res.send("Hello from Express.");
});
app.get('/hello', (req, res) => {
    res.send("Hello world");
});
app.post('/vehicle/add', (req, res) => {
    let data = req.body;
    if (isVehicle(data)) {
        let newVehicle = {
            model: data.model,
            color: data.color,
            year: data.year,
            power: data.power,
            bodyType: data.bodyType,
            wheelCount: data.wheelCount
        };
        vehicleList.push(newVehicle);
    }
    if (isBoat(data)) {
        let newBoat = {
            model: data.model,
            color: data.color,
            year: data.year,
            power: data.power,
            draft: data.draft
        };
        vehicleList.push(newBoat);
    }
    if (isPlane(data)) {
        let newPlane = {
            wingspan: data.wingspan,
            model: data.model,
            color: data.color,
            year: data.year,
            power: data.power
        };
        vehicleList.push(newPlane);
    }
    console.log(vehicleList);
    res.status(201).send("Hello world");
});
app.get('/vehicle/search/:model', (req, res) => {
    let model = req.params.model;
    let vehicleFound;
    vehicleList.map((element, index) => {
        if (isVehicle(element)) { //help from https://stackoverflow.com/questions/55421793/how-to-map-over-array-of-multiple-types-in-typescript
            if (element.model == model) {
                vehicleFound = element;
            }
        }
    });
    console.log(vehicleFound);
    if (vehicleFound != undefined) {
        res.json(vehicleFound);
    }
    else {
        res.status(404).send("Vehicle not found.");
    }
});
app.listen(port, () => {
    console.log("Server running.");
});
