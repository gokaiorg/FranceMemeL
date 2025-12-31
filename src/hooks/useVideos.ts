import { useState, useCallback, useEffect } from 'react';
import { Video } from '../types';
import { fetchVideos } from '../api/youtube';

export const useVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);

    const loadVideos = useCallback(async (pageToken?: string, refresh = false) => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);

        try {
            const { videos: newVideos, nextPageToken: newToken } = await fetchVideos(pageToken);

            setVideos(prev => refresh ? newVideos : [...prev, ...newVideos]);
            setNextPageToken(newToken);
        } catch (err) {
            setError('Failed to load videos. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const refreshJson = useCallback(() => {
        loadVideos(undefined, true);
    }, [loadVideos]);

    const loadMore = useCallback(() => {
        if (nextPageToken) {
            loadVideos(nextPageToken);
        }
    }, [nextPageToken, loadVideos]);

    useEffect(() => {
        loadVideos();
    }, [loadVideos]);

    return {
        videos,
        isLoading,
        error,
        refresh: refreshJson,
        loadMore,
    };
};
