const express = require("express");
const { connection } = require("./db/conn");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: "GET,POST,DELETE,PUT,UPDATE",
    credentials: true,
  })
);

app.use(express.json());

const port = process.env.PORT || 3000;
// const staticPath = path.join(__dirname, "./public");

// app.use(express.static(staticPath));

connection();

const contact = require("./models/contact");

app.post("/contact", async (req, res) => {
  console.log(req.body);
  const { name, phone, email } = req.body;
  const Contact = new contact({ name, phone, email });
  try {
    await Contact.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
  res.json("Successfull");
});

app.listen(port, () => {
  console.log(`Server Listening on port : ${port}`);
});
