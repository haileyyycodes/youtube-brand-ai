import { google } from 'googleapis';

const youtube = google.youtube('v3');

function ensureApiKey(apiKey) {
  if (!apiKey) {
    throw new Error('YOUTUBE_API_KEY is required');
  }
}

export async function fetchVideoComments(apiKey, videoId, options = {}) {
  ensureApiKey(apiKey);
  const pageToken = options.pageToken;
  const response = await youtube.commentThreads.list({
    key: apiKey,
    part: 'snippet,replies',
    videoId,
    maxResults: options.maxResults ?? 100,
    pageToken
  });

  const threads = response.data.items || [];
  return {
    nextPageToken: response.data.nextPageToken,
    pageInfo: response.data.pageInfo,
    threads: threads.map(normalizeCommentThread)
  };
}

export async function fetchChannelUploadsPlaylistId(apiKey, channelId) {
  ensureApiKey(apiKey);
  const response = await youtube.channels.list({
    key: apiKey,
    part: 'contentDetails',
    id: channelId
  });

  const channel = response.data.items?.[0];
  if (!channel) {
    throw new Error(`Channel not found: ${channelId}`);
  }

  return channel.contentDetails.relatedPlaylists.uploads;
}

export async function fetchPlaylistVideoIds(apiKey, playlistId, maxResults = 50) {
  ensureApiKey(apiKey);
  const videos = [];
  let pageToken;

  while (videos.length < maxResults) {
    const response = await youtube.playlistItems.list({
      key: apiKey,
      part: 'contentDetails,snippet',
      playlistId,
      maxResults: Math.min(50, maxResults - videos.length),
      pageToken
    });

    const items = response.data.items || [];
    videos.push(...items.map((item) => item.contentDetails.videoId));
    pageToken = response.data.nextPageToken;
    if (!pageToken) break;
  }

  return videos;
}

export async function fetchCommentsForChannel(apiKey, channelId, options = {}) {
  ensureApiKey(apiKey);
  const maxVideos = options.maxVideos ?? 5;
  const commentsPerVideo = options.commentsPerVideo ?? 50;

  const uploadsPlaylistId = await fetchChannelUploadsPlaylistId(apiKey, channelId);
  const videoIds = await fetchPlaylistVideoIds(apiKey, uploadsPlaylistId, maxVideos);
  const results = [];

  for (const videoId of videoIds) {
    const comments = [];
    let pageToken;

    while (comments.length < commentsPerVideo) {
      const response = await fetchVideoComments(apiKey, videoId, {
        maxResults: Math.min(100, commentsPerVideo - comments.length),
        pageToken
      });

      comments.push(...response.threads);
      pageToken = response.nextPageToken;
      if (!pageToken) break;
    }

    results.push({ videoId, comments });
  }

  return results;
}

function normalizeCommentThread(thread) {
  const snippet = thread.snippet?.topLevelComment?.snippet;
  const replies = (thread.replies?.comments || []).map((reply) => ({
    id: reply.id,
    author: reply.snippet?.authorDisplayName,
    text: reply.snippet?.textDisplay,
    publishedAt: reply.snippet?.publishedAt,
    likeCount: reply.snippet?.likeCount
  }));

  return {
    id: thread.id,
    author: snippet?.authorDisplayName,
    text: snippet?.textDisplay,
    publishedAt: snippet?.publishedAt,
    updatedAt: snippet?.updatedAt,
    likeCount: snippet?.likeCount,
    totalReplyCount: thread.snippet?.totalReplyCount,
    replies
  };
}
