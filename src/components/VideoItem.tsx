import React, { memo, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Video } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface VideoItemProps {
    video: Video;
    index: number;
    onPress: (id: string) => void;
}

const decodeHtmlEntities = (text: string) => {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'");
};

const VideoItem = memo(({ video, index, onPress }: VideoItemProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const rawDate = format(new Date(video.publishedAt), 'd MMMM yyyy', { locale: fr });
    const formattedDate = rawDate.replace(/ [a-z]/, (letter) => letter.toUpperCase());
    const title = decodeHtmlEntities(video.title);
    const accessibilityLabel = `Video ${index + 1}: ${title}. Published on ${formattedDate}`;

    const handlePress = () => {
        if (Platform.OS === 'web') {
            setIsPlaying(true);
        } else {
            onPress(video.id);
        }
    };

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <View style={styles.listItemWrapper}>
            {children}
        </View>
    );

    if (isPlaying && Platform.OS === 'web') {
        return (
            <Wrapper>
                <View style={styles.container}>
                    <View style={styles.videoContainer}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none' }}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title} numberOfLines={2}>
                            {title}
                        </Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                </View>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {/* @ts-ignore - onMouseEnter/onMouseLeave are web-only but work in RN Web */}
            <TouchableOpacity
                {...({
                    activeOpacity: 0.8,
                    onPress: handlePress,
                    onMouseEnter: () => Platform.OS === 'web' && setIsHovered(true),
                    onMouseLeave: () => Platform.OS === 'web' && setIsHovered(false),
                } as any)}
                style={[
                    styles.container,
                    isHovered && styles.containerHover
                ]}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel}
            >
                <View style={styles.thumbnailContainer}>
                    <Image
                        source={{ uri: video.thumbnailUrl }}
                        style={styles.thumbnail}
                        resizeMode="cover"
                    />
                    <View style={[
                        styles.playIconContainer,
                        isHovered && styles.playIconContainerHover
                    ]}>
                        <View style={styles.playIcon}>
                            <View style={styles.playTriangle} />
                        </View>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    <View style={styles.metaContainer}>
                        <Text style={styles.date}>{formattedDate}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>MÈME</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Wrapper>
    );
});

const styles = StyleSheet.create({
    listItemWrapper: {
        marginBottom: 20,
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#0B2C5B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(11, 44, 91, 0.08)',
    },
    containerHover: {
        transform: [{ scale: 1.02 }],
        shadowOpacity: 0.2,
        shadowRadius: 12,
        borderColor: '#E11B22',
    },
    thumbnailContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#F0F2F5',
    },
    videoContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#000',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    playIconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    playIconContainerHover: {
        backgroundColor: 'rgba(225, 27, 34, 0.2)',
    },
    playIcon: {
        width: 64,
        height: 64,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    playTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 20,
        borderTopWidth: 12,
        borderBottomWidth: 12,
        borderLeftColor: '#E11B22',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        marginLeft: 6,
    },
    infoContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '700',
        color: '#0B2C5B',
        marginBottom: 10,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    badge: {
        backgroundColor: '#E11B22',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
});

export default VideoItem;
