import 'dotenv/config';

export const get = async () => {
  const google_api_key = process.env.GOOGLE_API_KEY;
  const playlist_id = process.env.PLAYLIST_ID;
  const video_limit = process.env.VIDEO_LIMIT; // 50, no real reason
  let data = {};

  await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=${video_limit}&playlistId=${playlist_id}&key=${google_api_key}`)
  .then(response => response.json())
  .then(json => {
    data = json.items?.map((item: {contentDetails: {videoId: string}})=> item.contentDetails.videoId);
  })

  return {
    body: data
  }
}
