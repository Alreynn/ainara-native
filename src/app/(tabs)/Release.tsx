import { useState, useEffect } from 'react';
import { StatusBar, FlatList, View, Text } from 'react-native';
import AnimeBox from '../components/AnimeBox';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Releases {
    day: string;
    title: string;
    slug: string;
    poster: string;
}

const Release = () => {
    const [releases, setReleases] = useState<Releases[]>([])
    const [isLoaded, setLoaded] = useState(false);
    
    useEffect(() => {
        fetchAnime();
    }, [])
    
    const fetchAnime = async (): Promise<void> => {
        try {
            const releases = await fetch("https://www.sankavollerei.com/anime/schedule");
            const response = await releases.json();
            setReleases(response.data);
        } catch(e: any) {
            setLoaded(e);
        }
    }
    
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3">
            <Text className="font-bold text-2xl text-white">Jadwal Rilis</Text>
            <FlatList
                data={releases}
                renderItem={({item}) => (
                    <>
                        <Text className="font-bold text-xl text-white mb-1">{item.day}</Text>
                        <FlatList
                            data={item.anime_list}
                            renderItem={({item}) => <AnimeBox animeId={item.slug} title={item.title} poster={item.poster} />}
                            keyExtractor={item => item.title}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 3 * 4 }}
                        />
                    </>
                )}
                keyExtractor={item => item.day}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default Release;