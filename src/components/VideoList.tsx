import React, { useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import VideoItem from './VideoItem';
import { Video } from '../types';

interface VideoListProps {
    videos: Video[];
    isLoading: boolean;
    onEndReached: () => void;
    onRefresh: () => void;
    isRefreshing: boolean;
    onVideoPress: (id: string) => void;
}

const VideoList = ({
    videos,
    isLoading,
    onEndReached,
    onRefresh,
    isRefreshing,
    onVideoPress,
}: VideoListProps) => {
    const renderItem = useCallback(
        ({ item, index }: { item: Video; index: number }) => (
            <VideoItem video={item} index={index} onPress={onVideoPress} />
        ),
        [onVideoPress]
    );

    const keyExtractor = useCallback((item: Video) => item.id, []);

    const ListFooterComponent = useCallback(() => {
        return (
            <View style={styles.footer}>
                {isLoading && <ActivityIndicator size="large" color="#FF0000" style={styles.loader} />}
                <Text style={styles.footerText}>@FranceMemeL</Text>
            </View>
        );
    }, [isLoading]);

    const ListEmptyComponent = useCallback(() => {
        if (isLoading) return null; // Let footer handle initial load visual if desired, or simple centering
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No videos found.</Text>
            </View>
        );
    }, [isLoading]);

    return (
        <View style={styles.container}>
            <FlashList
                data={videos}
                renderItem={renderItem}
                estimatedItemSize={280} // Height of card + margin roughly
                keyExtractor={keyExtractor}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                ListFooterComponent={ListFooterComponent}
                ListEmptyComponent={ListEmptyComponent}
                contentContainerStyle={styles.listContent}
                accessibilityRole="list"
                accessibilityLabel="Video List"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Light blue-gray background
        width: '100%',
        maxWidth: 800, // Limit width for larger screens
        alignSelf: 'center', // Center the list
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: '#0B2C5B',
        fontSize: 16,
    },
    loader: {
        marginBottom: 10,
    },
    footerText: {
        color: '#2196F3',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VideoList;
