import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, View, Text } from 'react-native';
import { WebView } from 'react-native-webview'

interface Stream {
    defaultStreamingUrl: string;
}

const Watch = () => {
    const [streamLink, setStreamLink] = useState<Stream>("");
    const { episodeId, title, eps } = useLocalSearchParams<{
        episodeId: string;
        title: string;
        eps: string;
    }>();
    
    useEffect(() => {
        fetchStream();
    }, [])
    
    const fetchStream = async (): Promise<void> => {
        try {
            const stream = await fetch(`https://www.sankavollerei.com/anime/episode/${episodeId}`);
            const response = await stream.json();
            setStreamLink(response.data.defaultStreamingUrl);
        } catch(e) {
            Alert.alert(
                "Error!",
                (e)
            )
        }
    }
    
    const getTitle = (title) => {
        if (!title) return "";
        
        return title
        .replace(/Episode \d+/gi, "")
        .replace(/Subtitle Indonesia/gi, "")
        .trim();
    }
    
    const getEpisodeNumber = (id) => {
        const match = id?.match(/episode-(\d+)/);
        return match ? match[1] : "?";
    }
    
    return (
        <SafeAreaView className="flex-1 bg-indigo-500">
            <View className="aspect-video">
                <WebView
                    allowsFullscreenVideo={true}
                    source={{ uri: streamLink }}
                />
            </View>
            
            <View className="p-3">
                <Text className="font-bold text-2xl text-white">{getTitle(title)}</Text>
                <Text className="text-white">Episode {eps || getEpisodeNumber(episodeId)}</Text>
            </View>
        </SafeAreaView>
    );
};

export default Watch;