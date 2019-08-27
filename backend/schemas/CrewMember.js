const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const CrewMemberSchema = new Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    vocation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CrewMember", CrewMemberSchema);