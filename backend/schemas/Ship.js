const mongoose = require("mongoose");
const uuid = require('uuid/v4');
const Schema = mongoose.Schema;
const Position = require('./Position');

// this will be our data base's data structure 
const ShipSchema = new Schema(
    {
        name: {type: String, required: true, index: {unique: true}},
        classification: {type: String, required: true, enum: ['Starfighter', 'Freighter', 'Capital']},
        positions: [Position.schema]
    },
    {
        timestamps: true,
        collection: 'mongoose_ships'
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Ship", ShipSchema);