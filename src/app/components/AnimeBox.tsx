import React from 'react';
import { Pressable, View, Image, Text } from 'react-native';
import { Link } from 'expo-router'

interface Parameters {
    animeId: string;
    title: string;
    poster: string;
    episodes: number;
    lastReleaseDate: string;
}

const AnimeBox = ({animeId, title, poster, episodes, lastReleaseDate}: Parameters) => {
    return (
        <Link href={{ pathname: './Details', params: { animeId, title, poster } }} asChild>
            <Pressable className="grow-0 shrink-0 border border-indigo-300 w-[31.5vw] rounded-lg p-3">
                <Image source={{uri: poster}} className="w-full aspect-[3/4] rounded-md" />
                <View className="mt-1 -space-y-1">
                    <Text className="truncate text-ellipsis font-bold text-lg leading-tight max-h-5 text-white">{title}</Text>
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