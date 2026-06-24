import { fetchVideoComments, fetchCommentsForChannel } from './youtube-api.js';

const apiKey = process.env.YOUTUBE_API_KEY;
const [mode, id] = process.argv.slice(2);

if (!apiKey) {
  console.error('Missing YOUTUBE_API_KEY. Set it in your environment before running.');
  process.exit(1);
}

if (!mode || !id) {
  console.error('Usage: node src/main.js <video|channel> <videoId|channelId>');
  process.exit(1);
}

async function main() {
  if (mode === 'video') {
    const response = await fetchVideoComments(apiKey, id, { maxResults: 100 });
    console.log(JSON.stringify(response, null, 2));
  } else if (mode === 'channel') {
    const channelComments = await fetchCommentsForChannel(apiKey, id, {
      maxVideos: 5,
      commentsPerVideo: 50
    });
    console.log(JSON.stringify(channelComments, null, 2));
  } else {
    console.error('Mode must be either "video" or "channel".');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
