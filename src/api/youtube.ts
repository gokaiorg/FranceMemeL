import axios from 'axios';
import { Video, YouTubeApiResponse, YouTubeVideoItem } from '../types';

// NOTE: In a real app, use react-native-config or similar.
// Ensure you have a valid key in your environment.
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCocL2wWxYJAYbrWMNgvRYfA'; // FranceMemeL channel ID

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Mock data for fallback/demo if no API key is provided
const MOCK_VIDEOS: Video[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `mock-${i}`,
    title: `France Meme Video ${i + 1}`,
    thumbnailUrl: `https://picsum.photos/seed/${i}/480/360`,
    publishedAt: new Date().toISOString(),
}));

export const fetchVideos = async (pageToken?: string): Promise<{ videos: Video[]; nextPageToken?: string }> => {
    // If API KEY is missing, use mock.
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('No API Key provided, returning mock data.');
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { videos: MOCK_VIDEOS, nextPageToken: undefined };
    }

    try {
        const response = await axios.get<YouTubeApiResponse>(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                channelId: CHANNEL_ID,
                type: 'video',
                maxResults: 20,
                order: 'date',
                key: API_KEY,
                pageToken: pageToken,
            },
        });

        const videos: Video[] = response.data.items.map((item: YouTubeVideoItem) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
        }));

        return {
            videos,
            nextPageToken: response.data.nextPageToken,
        };
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
};
