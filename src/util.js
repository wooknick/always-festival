import axios from "axios";

export const getAvailableVideo = async (video_ids) => {
  try {
    const {
      data: { items },
    } = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: "id",
        id: video_ids.join(","),
        key:
          process.env.REACT_APP_YOUTUBE_API_KEY ||
          "AIzaSyDoTorqMsD8ldjOt14uNPt6dFqN3mtCL-g",
      },
    });
    const ret = items.map((item) => item["id"]);
    return ret;
  } catch (e) {
    console.error(e);
    return null;
  }
};
