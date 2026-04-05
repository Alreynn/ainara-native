import { useEffect, useState } from 'react';
import { FlatList, View, ScrollView, Pressable, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { useRouter, Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkeletonBox, SkeletonTags, SkeletonText } from '../components/skeletons.tsx'
import AnimeBox from '../components/AnimeBox';
import Tags from '../components/Tags';

interface Params {
    title: string;
    poster: string;
    episodes: number;
    latestReleaseDate: string;
    lastReleaseDate: string;
    animeId: string;
}

const App = () => {
    const router = useRouter();
    const [recent, setRecent] = useState<Params[]>([]);
    const [genres, setGenres] = useState<Params[]>([]);
    const [completed, setCompleted] = useState<Params[]>([]);
    const [isLoaded, setLoaded] = useState(false);
    const [isError, setError] = useState(false);
    
    useEffect(() => {
        fetchRecent();
        fetchGenres();
        fetchCompleted();
    }, [])
    
    const fetchRecent = async (): Promise<void> => {
        try {
            const recent = await fetch("https://www.sankavollerei.com/anime/home");
            const response = await recent.json();
            setRecent(response.data.ongoing.animeList);
            setLoaded(true);
        } catch(e) {
            setError(true);
        }
    }

    const fetchGenres = async (): Promise<void> => {
        try {
            const genres = await fetch("https://www.sankavollerei.com/anime/genre");
            const response = await genres.json();
            setGenres(response.data.genreList);
            setLoaded(true);
        } catch(e) {
            setError(true);
        }
    }
    
    const fetchCompleted = async () => {
        try {
            const completed = await fetch("https://www.sankavollerei.com/anime/complete-anime?page=1");
            const response = await completed.json();
            setCompleted(response.data.animeList);
            setLoaded(true);
        } catch(e) {
            setError(true);
        }
    }
    
    const repeatment = (item, amount) => {
        let components = [];
        
        for (let i = 0; i < amount; i++) {
            components.push(<View key={i}>{item}</View>)
        }
        return components;
    }
    
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3">
            <ScrollView
                onSubmitEditing={(event) => router.push({
                    pathname: '/Search',
                    params: { query: event.nativeEvent.text }
                })}
                returnKeyType="search"
                showsVerticalScrollIndicator={false}
            >
                <TextInput placeholder="Cari anime disini..." className="w-full rounded-3xl border border-indigo-300 py-2 px-3 my-5 outline-none text-white placeholder:text-gray-300" />
                
                {/* Recent Section */}
                {!isLoaded && !isError && (
                    <>
                        <View className="flex flex-row justify-between items-center mb-2">
                            <SkeletonText width={32} height={5} />
                            <SkeletonText width={22} height={3} />
                        </View>
                        <View className="flex flex-row flex-wrap gap-y-3 mb-8">
                            {repeatment(<SkeletonBox episodes={true} lastReleaseDate={true} />, 12)}
                        </View>
                    </>
                )}
                
                {isLoaded && !isError && (
                    <>
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
                            contentContainerStyle={{ gap: 3 * 4, marginBottom: 8 * 4, }}
                            renderItem={({item}) => <AnimeBox animeId={item.animeId} title={item.title} poster={item.poster} episodes={item.episodes} lastReleaseDate={item.latestReleaseDate} />}
                            keyExtractor={item => item.animeId}
                            scrollEnabled={false}
                        />
                    </>
                )}
                
                {/* Genre Section */}
                {!isLoaded && !isError && (
                    <View className="flex gap-y-1">
                        <SkeletonText width={32} height={5} />
                        <View className="flex flex-row flex-wrap gap-x-3 gap-y-1.5 mt-1 mb-8">
                            {repeatment(
                                <SkeletonTags width={14} height={4} />
                            , 30)}
                        </View>
                    </View>
                )}
                
                {isLoaded && !isError && (
                    <>
                        <Text className="font-bold text-2xl mb-1 text-white">Daftar Genre</Text>
                        <FlatList
                            data={genres}
                            contentContainerStyle={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: 3 * 4, rowGap: 1.5 * 4, marginBottom: 8 * 4, }}
                            renderItem={({item}) => (
                                <Link href={{ pathname: '/Genre', params: { genreId: item.genreId } }} asChild>
                                    <Pressable>
                                        <Tags>{item.title}</Tags>
                                    </Pressable>
                                </Link>
                            )}
                            keyExtractor={item => item.genreId}
                            scrollEnabled={false}
                        />
                    </>
                )}
                
                {/* Completed Section */}
                {!isLoaded && !isError && (
                    <>
                        <SkeletonText width={32} height={5} />
                        <View className="flex flex-row flex-wrap gap-y-3 mt-2">
                            {repeatment(<SkeletonBox episodes={true} lastReleaseDate={true} />, 12)}
                        </View>
                    </>
                )}
                
                {isLoaded && !isError && (
                    <>
                        <Text className="font-bold text-2xl mb-1 text-white">Anime Tamat</Text>
                        <FlatList
                            data={completed}
                            numColumns={3}
                            contentContainerStyle={{ justifyContent: 'space-around', gap: 3 * 4, }}
                            renderItem={({item}) => <AnimeBox animeId={item.animeId} title={item.title} poster={item.poster} episodes={item.episodes} lastReleaseDate={item.lastReleaseDate} />}
                            keyExtractor={item => item.animeId}
                            scrollEnabled={false}
                        />
                    </>
                )}
                
                {isError && (
                    <View className="flex justify-center items-center h-screen w-full">
                        <Text className="font-bold text-2xl text-white">Tidak dapat memuat!</Text>
                        <Text className="text-white">Pastikan kamu punya koneksi internet.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;