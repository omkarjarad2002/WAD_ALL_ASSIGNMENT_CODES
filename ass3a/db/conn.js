const mongoose = require("mongoose");
const DB =
  "mongodb+srv://omkarjaradit2020:dYQVLM4JY1SArlop@cluster0.bloqzkx.mongodb.net/wadpractical3acontacts?retryWrites=true&w=majority";

const connection = async (req, res) => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("Connection successfull");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { connection };
