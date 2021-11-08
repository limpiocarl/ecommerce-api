const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin131@zuittbootcamp.0e0ak.mongodb.net/gizbytes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Connected to MongoDB"));

app.listen(port, () => console.log(`Server is running at ${port}`));
