import { View } from 'react-native';

interface Params {
    width: number;
    height: number;
}
interface Configuration {
    episodes: boolean,
    lastReleaseDate: boolean,
}

export const SkeletonBox = ({episodes, lastReleaseDate}: Configuration) => {
    return (
        <View className="grow-0 shrink-0 bg-gray-500 w-[31.5vw] rounded-lg p-3">
            <View className="w-full h-44 bg-gray-400 aspect-[3/4] rounded-md animate-pulse"></View>
            <View className="flex gap-1 mt-1 -space-y-1">
                <View className="w-full h-4 bg-gray-400 rounded-md animate-pulse"></View>
                {episodes && (
                    <View className="w-12 h-3 bg-gray-400 rounded-md animate-pulse"></View>
                )}
                {lastReleaseDate && (
                    <View className="w-12 h-3 bg-gray-400 rounded-md animate-pulse"></View>
                )}
            </View>
        </View>
    )
}
export const EpisodeSkeleton = () => {
    return (
        <View className="flex gap-y-2 w-full border border-gray-500 p-1.5 px-3 rounded-xl">
            <View className="w-32 h-5 bg-gray-400 rounded-md animate-pulse"></View>
            <View className="w-24 h-3 bg-gray-400 rounded-md animate-pulse"></View>
        </View>
    )
}
export const ChangeEpsSkeleton = () => {
    return (
        <View className="bg-gray-500 h-8 w-36 rounded-lg animate-pulse"></View>
    )
}
export const SkeletonTags = ({width, height}: Params) => {
    return (
        <View style={{ width: width * 4, height: height * 4 }} className="bg-gray-400 rounded-md py-0.5 px-2 animate-pulse"></View>
    )
}
export const SkeletonText = ({width, height}: Params) => {
    return (
        <View style={{ width: width * 4, height: height * 4 }} className="bg-gray-400 rounded-md animate-pulse"></View>
    )
}