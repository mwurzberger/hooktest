const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CrewMember = require('./CrewMember');

// this will be our data base's data structure 
const PositionSchema = new Schema(
  {
    name: {type: String, required: true},
    location: String,
    crewMembers: [CrewMember.schema]
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Position", PositionSchema);


