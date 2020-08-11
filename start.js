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
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT);
console.log(`server start on http://localhost:${process.env.PORT}`);

// Init
// fetchLineup();
// checkDB();
getLineups();

// Cron Schedule
cron.schedule("0 0 * * *", fetchLineup);
cron.schedule("10 8 * * *", checkDB);

// Functions
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
    //   const {
    //     data: { items },
    //   } = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    //     params: {
    //       part: "id",
    //       id: videoIds.join(","),
    //       key: process.env.YOUTUBE_API_KEY,
    //     },
    //   });
    const service = google.youtube("v3");
    const {
      data: { items },
    } = await service.videos.list({
      key: process.env.YOUTUBE_API_KEY,
      part: "id",
      id: videoIds.join(","),
    });
    const availableIds = items.map((item) => item["id"]);
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
  await Artists.find({ stage: "red" }, (err, artists) => {
    if (err) {
      console.log(err);
    }
    if (!artists) {
      console.log("no artist");
    }
    const red = artists.sort(() => Math.random() - Math.random()).slice(0, 6);
    newLineup[0].artist = red;
    console.log(`red: ${red.map((i) => i.artist).join(", ")}`);
  });
  await Artists.find({ stage: "blue" }, (err, artists) => {
    if (err) {
      console.log(err);
    }
    if (!artists) {
      console.log("no artist");
    }
    const blue = artists.sort(() => Math.random() - Math.random()).slice(0, 6);
    newLineup[1].artist = blue;
    console.log(`blue: ${blue.map((i) => i.artist).join(", ")}`);
  });
  try {
    const LineupObj = new Lineups({
      lineup: newLineup,
    });
    await LineupObj.save().catch((err) => {
      console.log(`Error: create new lineup with DB : ${err}`);
    });
    getLineups();
  } catch (e) {
    console.log(`Error: create new lineup with Server : ${e}`);
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
  })
    .sort({ updated_at: -1 })
    .limit(1);
}
