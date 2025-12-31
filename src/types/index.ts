export interface VideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default: { url: string; width: number; height: number };
        medium: { url: string; width: number; height: number };
        high: { url: string; width: number; height: number };
    };
    channelTitle: string;
}

export interface VideoId {
    kind: string;
    videoId: string;
}

export interface YouTubeVideoItem {
    kind: string;
    etag: string;
    id: VideoId;
    snippet: VideoSnippet;
}

export interface YouTubeApiResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YouTubeVideoItem[];
}

export interface Video {
    id: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
}
