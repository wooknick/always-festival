const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistsSchema = new Schema(
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
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("artists", artistsSchema);
