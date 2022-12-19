"use strict";
exports.__esModule = true;
var express_1 = require("express");
// Help for build command: https://stackoverflow.com/questions/31749952/how-to-run-typescript-compiler-as-a-package-json-script-without-grunt-or-gulp
var app = (0, express_1["default"])();
var port = 3000;
var bodyParser = require('body-parser'); // Had to manually add body parser so the post data gets through and is not undefined. Help from: https://stackoverflow.com/questions/66064389/getting-typeerror-cannot-read-property-name-of-undefined-while-posting-the-f
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
var vehicleList = []; //Help from: https://stackoverflow.com/questions/29382389/defining-array-with-multiple-types-in-typescript
app.get('/', function (req, res) {
    res.send("Hello from Express.");
});
app.get('/hello', function (req, res) {
    res.send("Hello world");
});
app.post('/vehicle/add', function (req, res) {
    var data = req.body;
    if (isVehicle(data)) {
        var newVehicle = {
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
        var newBoat = {
            draft: data.draft
        };
        vehicleList.push(newBoat);
    }
    if (isPlane(data)) {
        var newPlane = {
            wingspan: data.wingspan
        };
        vehicleList.push(newPlane);
    }
    console.log(vehicleList);
    res.status(201).send("Hello world");
});
app.get('/vehicle/search/:model', function (req, res) {
    var model = req.params.model;
    var vehicleFound;
    vehicleList.map(function (element, index) {
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
app.listen(port, function () {
    console.log("Server running.");
});
