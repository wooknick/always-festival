require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const wrap = require("express-async-wrap");

const mongoose = require("mongoose");
const Artists = require("./artists");

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("connect to mongoDB Server");
});
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getArtists = async (req, res) => {
  const stage = req.params.stage;
  await Artists.find({ stage }, (err, artists) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!artists) {
      return res.status(404).json({ error: "artists not found" });
    }
    res.json(artists);
  });
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));
app.get("/api/artists/:stage", wrap(getArtists));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT);

console.log(`server start on http://localhost:${process.env.PORT}`);
