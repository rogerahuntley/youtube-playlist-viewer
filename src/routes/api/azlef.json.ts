
// returns an array of video IDs for azlef900s trip report playlist
// https://www.youtube.com/playlist?list=PLYbhMD5GcdR4Pg9w0LaVieawNI9hlvV0O
export const get = async () => {
  const google_api_key = import.meta.env.VITE_GOOGLE_API_KEY;
  let data = {};

  const limit = 50;
  const playlistId = "PLYbhMD5GcdR4Pg9w0LaVieawNI9hlvV0O";

  await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=${limit}&playlistId=${playlistId}&key=${google_api_key}`)
  .then(response => response.json())
  .then(json => {
    data = json.items.map(item => item.contentDetails.videoId);
  })

  return {
    body: data
  }
}
