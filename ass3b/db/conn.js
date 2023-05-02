const mongoose = require("mongoose");

const connection = async (req, res) => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://omkarjarad:DnUTGUQ5w4UTBEee@cluster0.own5t5r.mongodb.net/angularwadpractical?retryWrites=true&w=majority"
    );
    if (response) {
      console.log("Connection Successfull");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connection };
