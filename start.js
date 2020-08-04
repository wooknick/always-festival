require("dotenv").config();
const cron = require("node-cron");
const express = require("express");
const path = require("path");
const cors = require("cors");
const wrap = require("express-async-wrap");
const mongoose = require("mongoose");
const Artists = require("./artists");
const axios = require("axios");
const { google } = require("googleapis");

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
fetchLineup();
// checkDB();

// Cron Schedule
cron.schedule("0 0 * * *", fetchLineup);
// cron.schedule("10 8 * * *", checkDB);

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
  console.log(`fetch Lineup : ${new Date()}`);
  await Artists.find({ stage: "red" }, (err, artists) => {
    if (err) {
      console.log(err);
    }
    if (!artists) {
      console.log("no artist");
    }
    const red = artists.sort(() => Math.random() - Math.random()).slice(0, 6);
    LINEUP.red = red;
  });
  await Artists.find({ stage: "blue" }, (err, artists) => {
    if (err) {
      console.log(err);
    }
    if (!artists) {
      console.log("no artist");
    }
    const blue = artists.sort(() => Math.random() - Math.random()).slice(0, 6);
    LINEUP.blue = blue;
  });
}

async function getArtists(req, res) {
  const stage = req.params.stage;
  await Artists.find({ stage }, (err, artists) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!artists) {
      return res.status(404).json({ error: "artists not found" });
    }
    const ret = artists.sort(() => Math.random() - Math.random()).slice(0, 6);
    res.json(ret);
  });
}
