import React from 'react';
import { Pressable, View, Image, Text } from 'react-native';
import { Link } from 'expo-router'

interface Parameters {
    animeId: string;
    title: string;
    poster: string;
    score: string;
    episodes: number;
    lastReleaseDate: string;
}

const AnimeBox = ({animeId, title, poster, score, episodes, lastReleaseDate}: Parameters) => {
    const getScore = (score) => {
        if (!score) return "";
        
        return score
        .replace(/Fall 2025/gi, "")
        .trim();
    }
    
    return (
        <Link href={{ pathname: '/Details', params: { animeId, title, poster } }} asChild>
            <Pressable className="grow-0 shrink-0 border border-indigo-300 w-[31.5vw] rounded-lg p-3">
                <View className="relative">
                    <Image source={{uri: poster}} className="w-full aspect-[3/4] rounded-md" />
                    {getScore(score) &&
                        <Text className="absolute top-0 bg-blue-700 rounded-br-lg p-1 px-2.5 text-md text-white">{getScore(score)}</Text>
                    }
                </View>
                <View className="mt-1 -space-y-1">
                    <Text numberOfLines={2} ellipsizeMode="tail" className="font-bold text-lg leading-tight text-white">{title}</Text>
                    {episodes && (
                        <Text className="text-sm text-white">Ep {episodes}</Text>
                    )}
                    {lastReleaseDate && (
                        <Text className="text-sm text-white">{lastReleaseDate}</Text>
                    )}
                </View>
            </Pressable>
        </Link>
    );
};

export default AnimeBox;