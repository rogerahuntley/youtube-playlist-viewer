import 'dotenv/config';

export const get = async () => {
  const google_api_key = process.env.GOOGLE_API_KEY;
  const playlist_id = process.env.PLAYLIST_ID;
  const video_limit = process.env.VIDEO_LIMIT; // 50, no real reason
  const background_id = process.env.BACKGROUND_VIDEO_ID;
  let data = { videos: [], background_id};

  await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=${video_limit}&playlistId=${playlist_id}&key=${google_api_key}`)
  .then(response => response.json())
  .then(json => {
    data.videos = json.items?.map((item: {contentDetails: {videoId: string}})=> item.contentDetails.videoId);
  })

  return {
    body: data
  }
}
