import AnimeBox from '../components/AnimeBox';
import { useEffect, useState } from 'react';
import { StatusBar, FlatList, View, ScrollView, Pressable, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

interface Recent {
    title: string;
    poster: string;
    episodes: number;
    latestReleaseDate: string;
    animeId: string;
}

const App = () => {
    const router = useRouter();
    const [recent, setRecent] = useState<Recent[]>([]);
    const [isError, setError] = useState(false);
    
    useEffect(() => {
        fetchRecent();
    }, [])
    
    const fetchRecent = async (): Promise<void> => {
        try {
            const recent = await fetch("https://www.sankavollerei.com/anime/home");
            const response = await recent.json();
            setRecent(response.data.ongoing.animeList);
        } catch(e: any) {
            setError(true);
        }
    }
    
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3">
            <StatusBar barStyle="dark-content" />
            
            <TextInput placeholder="Cari anime disini..." className="w-full rounded-3xl border border-indigo-300 py-2 px-3 my-5 outline-none text-white placeholder:text-gray-300" />
            <View className="flex flex-row justify-between items-center mb-1">
                <Text className="font-bold text-2xl text-white">Anime Terbaru</Text>
                <Pressable onPress={() => router.navigate("/Release")} className="flex flex-row items-center gap-1.5">
                    <Text className="text-white">Jadwal Rilis</Text>
                    <Ionicons name="arrow-forward-outline" color="white" />
                </Pressable>
            </View>
            
            <FlatList
                data={recent}
                numColumns={3}
                contentContainerStyle={{ justifyContent: 'space-around', gap: 12 }}
                renderItem={({item}) => <AnimeBox animeId={item.animeId} title={item.title} poster={item.poster} episodes={item.episodes} lastReleaseDate={item.latestReleaseDate} />}
                keyExtractor={item => item.animeId}
                showsVerticalScrollIndicator={false}
            />
            
            {isError && (
                <View>
                    <Text>Error!</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default App;