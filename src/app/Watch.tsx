import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router'
import { Alert, View, Pressable, Text } from 'react-native';
import { WebView } from 'react-native-webview'
import { Ionicons } from '@expo/vector-icons';
import { ChangeEpsSkeleton } from './components/skeletons.tsx'
import ChangeEps from './components/ChangeEps';

interface Stream {
    defaultStreamingUrl: string;
}

const Watch = () => {
    const [fetchedData, setFetchedData] = useState<Stream>("");
    const [isLoaded, setLoaded] = useState(false);
    const hasPrevNextEp = fetchedData?.hasPrevEpisode || fetchedData?.hasNextEpisode
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
            setFetchedData(response.data);
            setLoaded(true);
        } catch(e) {
            
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
        <View className="flex-1 bg-indigo-500">
            <View className="aspect-video">
                <WebView
                    allowsFullscreenVideo={true}
                    source={{ uri: fetchedData?.defaultStreamingUrl }}
                />
            </View>
            
            {/* This need some fixes! */}
            <View className={`flex flex-row justify-between
            ${(!isLoaded || hasPrevNextEp) && "mt-3 mx-2"}
            `}>
                {!isLoaded ? (
                    <>
                        <ChangeEpsSkeleton />
                        <ChangeEpsSkeleton />
                    </>
                ) : (
                    <>
                        {fetchedData?.hasPrevEpisode ? (
                            <ChangeEps text="Ep Sebelumnya" isPrev={true} />
                        ) : (
                            <View />
                        )}
                        
                        {fetchedData?.hasNextEpisode && (
                            <ChangeEps text="Ep Selanjutnya" isNext={true} />
                        )}
                    </>
                )}
            </View>
            
            <View className="p-3">
                <Text className="font-bold text-2xl text-white">{getTitle(title)}</Text>
                <Text className="text-white">Episode {eps || getEpisodeNumber(episodeId)}</Text>
            </View>
        </View>
    );
};

export default Watch;