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

const Search = () => {
    const router = useRouter();
    const [searchedAnime, setSearchedAnime] = useState<Params[]>([]);
    const [isLoaded, setLoaded] = useState(false);
    const { query } = useLocalSearchParams<{
        query: string;
    }>();
    
    useEffect(() => {
        fetchSearching();
    }, [])
    
    const fetchSearching = async () => {
        try {
            const searchFor = await fetch(`https://www.sankavollerei.com/anime/search/${query}`);
            const response = await searchFor.json();
            setSearchedAnime(response.data.animeList);
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
    
    const getTitle = (title) => {
        if (!title) return "";
        
        return title
        .replaceAll(/[()]/gi, "")
        .replace(/Episode \d+ – \d+/gi, "")
        .replace(/BD/gi, "")
        .replace(/Spesial/gi, "")
        .replace(/Sub Indo/gi, "")
        .replace(/Subtitle Indonesia/gi, "")
        .replace(/[+] Summary/gi, "")
        .trim();
    }
    
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3 pt-20">
            <Text className="font-bold text-3xl mb-3 text-white">Kamu mencari "{query}"</Text>
            
            {!isLoaded ? (
                <View className="flex flex-row flex-wrap gap-y-5">
                    {repeatment(<SkeletonBox />, 9)}
                </View>
            ) : (
                <FlatList
                    data={searchedAnime}
                    contentContainerStyle={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', rowGap: 5 * 4, }}
                    renderItem={({item}) => <AnimeBox animeId={item.animeId} title={getTitle(item.title)} poster={item.poster} />}
                    keyExtractor={item => item.animeId}
                />
            )}
        </SafeAreaView>
    )
}
export default Search