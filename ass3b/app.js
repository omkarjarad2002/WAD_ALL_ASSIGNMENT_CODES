const express = require("express");
const app = express();
const User = require("./schema/users");
const { connection } = require("./db/conn");
connection();

const cors = require("cors");
const { connections } = require("mongoose");
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,POST,DELETE,PUT,UPDATE",
    credentials: true,
  })
);

app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ message: "Unexpected error occured !!" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ message: "User already exist !!" });
    } else {
      const user = new User({ name, email, password });

      await user.save();
      return res.status(201).json({ user });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/login/:email/:password", async (req, res) => {
  if (!req.params.email || !req.params.password) {
    return res.status(422).json({ message: "Unexpected error occured !!" });
  }

  try {
    const userExist = await User.findOne({ email: req.params.email });

    if (!userExist) {
      return res.status(404).json({ message: "User not exist !!" });
    }
    return res.status(201).json({ userExist });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteaccount/:email/:password", async (req, res) => {
  if (!req.params.email || !req.params.password) {
    return res.status(422).json({ message: "Unexpected error occured !!" });
  }

  try {
    const userExist = await User.findOne({
      email: req.params.email,
      password: req.params.password,
    });
    if (userExist) {
      const data = await User.findByIdAndDelete({ _id: userExist.id });
      return res.json(data);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateaccount/:id", async (req, res) => {
  const data = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  return res.json(data);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
