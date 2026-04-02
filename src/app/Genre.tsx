import AnimeBox from './components/AnimeBox';
import { useState, useEffect } from 'react';
import { View, FlatList, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SkeletonBox } from './components/skeletons.tsx'

interface Params {
    title: string;
    poster: string;
}

const Genre = () => {
    const router = useRouter();
    const [animes, setAnimes] = useState<Params[]>([]);
    const [isLoaded, setLoaded] = useState(false);
    const { genreId } = useLocalSearchParams<{
        genreId: string;
    }>();
    
    useEffect(() => {
        fetchAnimes();
    }, [])
    
    const fetchAnimes = async () => {
        try {
            const animes = await fetch(`https://www.sankavollerei.com/anime/genre/${genreId}?page=1`);
            const response = await animes.json();
            setAnimes(response.data.animeList);
            setLoaded(true);
        } catch(e) {
            alert(e);
        }
    }
    
    const repeatment = (item, amount) => {
        let components = [];
        
        for (let i = 0; i < amount; i++) {
            components.push(<View key={i}>{item}</View>)
        }
        return components;
    }
    
    const getGenreTitle = (title) => {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }
    
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3 pt-20">
            <Text className="font-bold text-3xl mb-3 text-white">{getGenreTitle(genreId)}</Text>
            
            {!isLoaded ? (
                <View className="flex flex-row flex-wrap gap-y-5">
                    {repeatment(<SkeletonBox />, 9)}
                </View>
            ) : (
                <FlatList
                    data={animes}
                    contentContainerStyle={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', rowGap: 5 * 4, }}
                    renderItem={({item}) => <AnimeBox animeId={item.animeId} title={item.title} poster={item.poster} />}
                    keyExtractor={item => item.animeId}
                />
            )}
        </SafeAreaView>
    )
}
export default Genre