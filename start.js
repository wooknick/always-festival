require("dotenv").config();
const cron = require("node-cron");
const express = require("express");
const path = require("path");
const cors = require("cors");
const wrap = require("express-async-wrap");
const mongoose = require("mongoose");
const Artists = require("./artists");
const Lineups = require("./lineups");
const axios = require("axios");
const { google } = require("googleapis");
const util = require("util");

// const variables
const LINEUP = { red: [], blue: [] };
const SCORE = { red: { count: 0, sum: 0 }, blue: { count: 0, sum: 0 } };

// DB Connection
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("connect to mongoDB Server");
});
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("*", (req, res, next) => {
  let protocol = req.headers["x-forwarded-proto"] || req.protocol;
  if (req.hostname === "localhost") {
    next();
  } else if (protocol === "https") {
    next();
  } else {
    let from = `${protocol}://${req.hostname}${req.url}`;
    let to = `https://${req.hostname}${req.url}`;
    console.log(`[${req.method}]: ${from} -> ${to}`);
    res.redirect(to);
  }
});

app.use(express.static(path.join(__dirname, "build")));
// app.get("/api/artists/:stage", wrap(getArtists));
app.get("/api/artists/:stage", (req, res) => {
  const stage = req.params.stage;
  res.json(LINEUP[stage]);
});
app.get("/api/rate/:stage", (req, res) => {
  const stage = req.params.stage;
  res.json({ rate: getScore(stage) });
});

app.put("/api/score/:stage", (req, res) => {
  const stage = req.params.stage;
  const { value } = req.query;
  addScore(stage, Number(value));
  res.json({ result: "ok" });
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT);
console.log(`server start on http://localhost:${process.env.PORT}`);

// Init
// setInterval(fetchLineup, 2000);
// checkDB();
getLineups();
// testVideoId(["PlE_xUktHz0", "p5NV4Y8Nl4A", "ttt", "j2gye27OAbA"]);

// Cron Schedule
cron.schedule("0 0 * * *", fetchLineup);
cron.schedule("10 8 * * *", checkDB);

// Functions
async function addScore(stage, score) {
  SCORE[stage]["sum"] += score;
  SCORE[stage]["count"] += 1;
  try {
    const latestLineup = await Lineups.find({})
      .sort({ updated_at: -1 })
      .limit(1);
    await Lineups.updateOne(
      { _id: latestLineup[0]._id },
      {
        $set: {
          score: SCORE,
        },
      },
      (err, res) => {
        if (err) {
          console.log(`update error on DB : ${err}`);
          return;
        }
      }
    );
  } catch (e) {
    console.log(`update error on Server : ${e}`);
  }
}

function getScore(stage) {
  if (SCORE[stage]["count"] === 0) {
    return 2.5;
  } else {
    const rate = (SCORE[stage]["sum"] / SCORE[stage]["count"]).toFixed(1);
    return rate;
  }
}

async function testVideoId(videoIds) {
  try {
    const service = google.youtube("v3");
    const {
      data: { items },
    } = await service.videos.list({
      key: process.env.YOUTUBE_API_KEY,
      part: "id, status",
      id: videoIds.join(","),
    });
    console.log(items);
    const availableItems = items.filter((item) =>
      validateStatus(item["status"])
    );
    console.log(availableItems);
    const availableIds = availableItems.map((item) => item["id"]);
    console.log(availableIds);
  } catch (e) {
    console.log(`error on youtube data api : ${e}`);
  }
}

function validateStatus(status) {
  if (status["license"] === "creativeCommon") {
    return true;
  } else {
    return false;
  }
}

async function checkDB() {
  console.log(`DB Check Start : ${new Date()}`);
  try {
    await Artists.find({}, (err, artists) => {
      if (err) {
        console.log(`find error on DB : ${err}`);
        return;
      }
      if (!artists) {
        console.log("There is no artists");
        return;
      } else {
        artists.forEach((artist) => checkArtist(artist));
        console.log(`DB Check End : ${new Date()}`);
      }
    });
  } catch (e) {
    console.log(`find error on Server : ${e}`);
  }
}

async function checkArtist(artist) {
  const videoIds = artist.videos.map((video) => video.id);
  try {
    const service = google.youtube("v3");
    const {
      data: { items },
    } = await service.videos.list({
      key: process.env.YOUTUBE_API_KEY,
      part: "id, status",
      id: videoIds.join(","),
    });
    const availableItems = items.filter((item) =>
      validateStatus(item["status"])
    );
    const availableIds = availableItems.map((item) => item["id"]);
    console.log(availableIds);
    if (
      JSON.stringify(videoIds.sort()) !== JSON.stringify(availableIds.sort())
    ) {
      const newVideos = artist.videos.filter((video) =>
        availableIds.includes(video.id)
      );
      console.log(videoIds, "->", availableIds);
      try {
        await Artists.updateOne(
          { _id: artist._id },
          { $set: { videos: [...newVideos] } },
          (err, res) => {
            if (err) {
              console.log(`update error on DB : ${err}`);
              return;
            }
          }
        );
      } catch (e) {
        console.log(`update error on Server : ${e}`);
      }
    }
  } catch (e) {
    console.log(`error on youtube data api : ${e}`);
  }
}

async function fetchLineup() {
  console.log(`fetch lineup start : ${new Date()}`);
  const newLineup = [
    { stage: "red", artist: [] },
    { stage: "blue", artist: [] },
  ];
  try {
    const redResult = await Artists.find({ stage: "red" }).exec();
    const red = redResult.sort(() => Math.random() - Math.random()).slice(0, 6);
    newLineup[0].artist = red;
    console.log(`red: ${red.map((i) => i.artist).join(", ")}`);

    const blueResult = await Artists.find({ stage: "blue" }).exec();
    const blue = blueResult
      .sort(() => Math.random() - Math.random())
      .slice(0, 6);
    newLineup[1].artist = blue;
    console.log(`blue: ${blue.map((i) => i.artist).join(", ")}`);

    const LineupObj = new Lineups({
      lineup: newLineup,
      score: { red: { count: 0, sum: 0 }, blue: { count: 0, sum: 0 } },
    });
    await LineupObj.save().catch((err) => {
      console.log(`Error: create new lineup with DB : ${err}`);
    });
    getLineups();
  } catch (e) {
    console.log(e);
  }
}

async function getLineups() {
  await Lineups.find({}, (err, lineups) => {
    if (err) {
      console.log(err);
    }
    if (!lineups) {
      console.log("no lineups");
    }
    lineups[0].lineup.forEach((lineupItem) => {
      if (lineupItem.stage === "red") {
        LINEUP.red = lineupItem.artist;
      } else if (lineupItem.stage === "blue") {
        LINEUP.blue = lineupItem.artist;
      }
    });
    SCORE.red = lineups[0].score.red;
    SCORE.blue = lineups[0].score.blue;
  })
    .sort({ updated_at: -1 })
    .limit(1);
}
