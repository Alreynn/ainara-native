import { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkeletonText, AllAnimeSkeleton } from '../components/skeletons.tsx'
import MinimalAnimeBox from '../components/MinimalAnimeBox';
import AnimeBox from '../components/AnimeBox';

interface Anime {
    startWith: string;
    title: string;
    animeId: string;
}

const AllAnime = () => {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [isLoaded, setLoad] = useState(false);
    
    useEffect(() => {
        fetchAllAnime();
    }, [])
    
    const fetchAllAnime = async () => {
        try {
            const getAll = await fetch("https://www.sankavollerei.com/anime/unlimited");
            const response = await getAll.json();
            setAnimes(response.data.list);
            setLoad(true);
        } catch(e) {
            alert(e)
        }
    }
    
    const getTitle = (title) => {
        if (!title) return "";
        
        return title
        .replaceAll(/[()]/gi, "")
        .replace(/Episode \d+ – \d+/gi, "")
        .replace(/Sub Indo/gi, "")
        .replace(/Subtitle Indonesia/gi, "")
        .replace(/On-Going/gi, "")
        .trim();
    }
    
    const repeatment = (item, amount) => {
        let components = [];
        
        for (let i = 0; i < amount; i++) {
            components.push(<View key={i}>{item}</View>)
        }
        return components;
    }
    
    const SkeletonLoad = () => {
        return (
            <View className="flex flex-col gap-y-1.5 mb-2">
                <SkeletonText width={4} height={5} />
                {repeatment(<AllAnimeSkeleton />, 6)}
            </View>
        )
    }
    
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3">
            <Text className="font-bold text-2xl mt-1 text-white">Semua Anime</Text>
            
            {!isLoaded ? (
                <>
                    {repeatment(<SkeletonLoad />, 6)}
                </>
            ) : (
                <FlatList
                    data={animes}
                    contentContainerStyle={{  }}
                    renderItem={({item}) => (
                        <>
                            <Text className="font-bold text-xl mt-1 text-white">{item.startWith}</Text>
                            <FlatList
                                data={item.animeList}
                                className="flex gap-3"
                                renderItem={({item}) => <MinimalAnimeBox animeId={item.animeId} title={getTitle(item.title)} />}
                                keyExtractor={item => item.title}
                            />
                        </>
                    )}
                    keyExtractor={item => item.startWith}
                />
            )}
        </SafeAreaView>
    );
};

export default AllAnime;