import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, View, Pressable, FlatList, Image, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import { SkeletonText, SkeletonTags } from './components/skeletons.tsx'
import EpisodeBox from './components/EpisodeBox';
import DetailsBox from './components/DetailsBox';
import Tags from './components/Tags';

interface Details {
    title: string;
    poster: string;
    japanese: string;
    score: string;
    status: string;
    type: string;
    aired: string;
    studios: string;
    paragraphs: string;
}

const Details = () => {
    const [details, setDetails] = useState<Details[]>([]);
    const [isSynopsisOpen, setSynopsisOpen] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const { animeId, title, poster } = useLocalSearchParams<{
        animeId: string;
        title: string;
        poster: string;
    }>();
    
    useEffect(() => {
        fetchDetails();
    }, [])
    
    const fetchDetails = async (): Promise<void> => {
        try {
            const getDetails = await fetch(`https://www.sankavollerei.com/anime/anime/${animeId}`);
            const response = await getDetails.json();
            setDetails(response.data);
            setLoaded(true);
        } catch(e) {
            Alert.alert(
                "Error Message",
                (e)
            )
        }
    }
    
    const repeatment = (item, amount) => {
        let components = [];
        
        for (let i = 0; i < amount; i++) {
            components.push(<View key={i}>{item}</View>)
        }
        return components;
    }
    
    const imageUrl = poster ? decodeURIComponent(poster) : details?.poster;
    
    return (
        <SafeAreaView className="flex-1 bg-black">
        <Image source={{ uri: imageUrl }} className="w-full aspect-[3/4]" />
            
            <DetailsBox
                colors={['#0f172a10', '#0f172a', '#0f172a']}
                locations={[ 0, 0.3, 1 ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="-mt-96 p-3 pt-24 h-screen"
            >
                <View className="flex flex-row justify-between items-center">
                    <Text className="font-bold text-4xl w-80 text-white">{title}</Text>
                    <Text className="max-w-[62px] text-center border border-white rounded-lg p-1 px-2 text-white">{"?" || details?.score}</Text>
                </View>
                {!isLoaded ? (
                    <>
                        <SkeletonText width={72} height={3} />
                        <View className="flex flex-row gap-3 mt-1">
                            {repeatment(
                                <SkeletonTags width={12} height={4} />
                            , 4)}
                        </View>
                        
                        <View className="flex gap-1.5 mt-4">
                            <SkeletonText width={20} height={5} />
                            <View className="flex gap-1">
                                <SkeletonText width={96} height={3} />
                                <SkeletonText width={72} height={3} />
                                <SkeletonText width={80} height={3} />
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <Text className="text-white">{details?.japanese}</Text>
                        <View className="flex flex-row gap-3 mt-1">
                            <Tags>{details?.status}</Tags>
                            <Tags>{details?.type}</Tags>
                            <Tags>{details?.aired}</Tags>
                            <Tags>{details?.studios}</Tags>
                        </View>
                        
                        {details?.synopsis?.paragraphs.length > 0 && (
                            <View className="mt-3">
                                <Text className="text-2xl font-bold text-white">Sinopsis</Text>
                                <Pressable onPress={() => setSynopsisOpen(!isSynopsisOpen)} className={`
                                    overflow-hidden text-ellipsis
                                    ${isSynopsisOpen ? "h-full" : "max-h-14"}
                                `}>
                                    <Text className="text-white">{details?.synopsis?.paragraphs}</Text>
                                </Pressable>
                            </View>
                        )}
                    </>
                )}
                
                <View className="mt-3 gap-y-2">
                    <Text className="text-2xl font-bold text-white">Daftar Episode</Text>
                    <FlatList
                        data={details?.episodeList}
                        contentContainerStyle={{ gap: 3 * 4, paddingBottom: 56 * 8 }}
                        renderItem={({item}) => <EpisodeBox episodeId={item.episodeId} title={item.title} eps={item.eps} date={item.date} />}
                        keyExtractor={item => item.eps}
                        scrollEnabled={true}
                    />
                </View>
            </DetailsBox>
        </SafeAreaView>
    );
};

export default Details;