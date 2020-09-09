const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineupSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    lineup: [
      {
        stage: String,
        artist: [
          {
            _id: mongoose.Schema.Types.ObjectId,
            stage: String,
            artist: String,
            videos: [
              {
                id: String,
                comments: [String],
              },
            ],
          },
        ],
      },
    ],
    score: {
      red: {
        sum: Number,
        count: Number,
      },
      blue: {
        sum: Number,
        count: Number,
      },
    },
  },
  {
    collection: "lineups",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("lineups", lineupSchema);
