import axios from "axios";

export const getAvailableVideo = async (videos) => {
  try {
    const video_ids = videos.map((video) => video.id);
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
    // const ret = items.map((item) => item["id"]);
    const available_ids = items.map((item) => item["id"]);
    const ret = videos
      .filter((video) => available_ids.includes(video.id))
      .sort(() => Math.random() - Math.random());
    return ret;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getYoutubeIframe = (video_id) => {
  return {
    __html: `<iframe
    id="ytplayer"
    type="text/html"
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/${video_id}?autoplay=1&playsinline=1"
    frameborder="0"
   />`,
  };
};
