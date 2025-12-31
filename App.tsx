import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, ActivityIndicator, Image, Platform, TouchableOpacity, Linking } from 'react-native';
import { useVideos } from './src/hooks/useVideos';
import VideoList from './src/components/VideoList';
// @ts-ignore
import logo from './src/assets/logo.png';

const SOCIAL_LINKS = [
    {
        id: 'youtube',
        url: 'https://www.youtube.com/@FranceMemeL',
        icon: 'https://img.icons8.com/ios-filled/50/FFFFFF/youtube-play.png',
        label: 'YouTube'
    },
    {
        id: 'x',
        url: 'https://x.com/FranceMemeL',
        icon: 'https://img.icons8.com/ios-filled/50/FFFFFF/twitterx--v1.png',
        label: 'X'
    },
    {
        id: 'tiktok',
        url: 'https://www.tiktok.com/@francememel',
        icon: 'https://img.icons8.com/ios-filled/50/FFFFFF/tiktok--v1.png',
        label: 'TikTok'
    }
];

// Pre-compilation simulation component
const ShaderWarmup = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 1200); // Slightly longer for "premium" feel
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <View style={styles.warmupContainer}>
            <ActivityIndicator size="large" color="#E11B22" />
            <Text style={styles.warmupText}>INITIALIZING ENGINE</Text>
            <Text style={styles.warmupSubtitle}>FRANCE MÈME LEGEND</Text>
        </View>
    );
};

const App = () => {
    const [isReady, setIsReady] = useState(false);
    const { videos, isLoading, error, refresh, loadMore } = useVideos();

    if (!isReady) {
        return <ShaderWarmup onComplete={() => setIsReady(true)} />;
    }

    const handleSocialPress = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0B2C5B" />
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.brandContainer}>
                        <Image
                            source={logo}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View style={styles.titleContainer}>
                            <Text style={styles.headerTitle}>FRANCE MÈME</Text>
                            <Text style={styles.headerSubtitle}>LEGEND</Text>
                        </View>
                    </View>

                    <View style={styles.socialContainer}>
                        {SOCIAL_LINKS.map((social) => (
                            <TouchableOpacity
                                key={social.id}
                                onPress={() => handleSocialPress(social.url)}
                                style={styles.socialButton}
                                accessibilityRole="link"
                                accessibilityLabel={`Visit us on ${social.label}`}
                            >
                                <Image
                                    source={{ uri: social.icon }}
                                    style={styles.socialIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
            {/* Content Area */}
            {error ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <View style={styles.listContainer}>
                    <VideoList
                        videos={videos}
                        isLoading={isLoading}
                        onEndReached={loadMore}
                        onRefresh={refresh}
                        isRefreshing={isLoading && videos.length > 0}
                        onVideoPress={(id) => console.log('Playing video:', id)}
                    />
                </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Fait en râlant par{' '}
                    <Text
                        style={styles.footerLink}
                        onPress={() => Linking.openURL('https://gokai.org/')}
                        accessibilityRole="link"
                        accessibilityLabel="Visit Gokai Labs"
                    >
                        Gokai Labs
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        backgroundColor: '#0B2C5B',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        borderBottomWidth: 4,
        borderBottomColor: '#E11B22',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        zIndex: 10,
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1200, // Constrain width on large screens
        alignSelf: 'center',
        width: '100%',
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 1.5,
        lineHeight: 24,
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: '#E11B22',
        letterSpacing: 3,
        marginTop: -2,
    },
    logo: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
    },
    socialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    socialButton: {
        padding: 4,
        opacity: 0.9,
    },
    socialIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    listContainer: {
        flex: 1, // Ensures list takes up remaining space
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    footer: {
        backgroundColor: '#0B2C5B',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 'auto', // Push to bottom if content is short (though list usually fills)
    },
    footerText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    footerLink: {
        color: '#E11B22',
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
    warmupContainer: {
        flex: 1,
        backgroundColor: '#0B2C5B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warmupText: {
        color: '#FFFFFF',
        marginTop: 24,
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 2,
    },
    warmupSubtitle: {
        color: 'rgba(255,255,255,0.6)',
        marginTop: 8,
        fontSize: 12,
        fontWeight: '400',
        letterSpacing: 3,
    },
    errorText: {
        color: '#E11B22',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default App;
