import { useState, useEffect } from 'react';
import { StatusBar, FlatList, View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkeletonBox, SkeletonText } from '../components/skeletons.tsx'
import AnimeBox from '../components/AnimeBox';

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
            setLoaded(true);
        } catch(e) {
            setLoaded(e);
        }
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
            <>
                <SkeletonText width={12} height={4} />
                <View className="flex flex-row gap-3 mt-1">
                    {repeatment(<SkeletonBox />, 3)}
                </View>
            </>
        )
    }
    
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3">
            <Text className="font-bold text-2xl text-white">Jadwal Rilis</Text>
            {!isLoaded ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {repeatment(<SkeletonLoad />, 6)}
                </ScrollView>
            ) : (
                <FlatList
                    data={releases}
                    renderItem={({item}) => (
                        <>
                            <Text className="font-bold text-xl mt-3 mb-1 text-white">{item.day}</Text>
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
            )}
        </SafeAreaView>
    );
};

export default Release;