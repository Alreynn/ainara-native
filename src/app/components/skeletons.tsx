import { View } from 'react-native';

interface Params {
    width: number;
    height: number;
}

export const SkeletonText = ({width, height}: Params) => {
    return (
        <View style={{ width: width * 4, height: height * 4 }} className="bg-gray-400 rounded-lg animate-pulse"></View>
    )
}
export const SkeletonTags = ({width, height}: Params) => {
    return (
        <View style={{ width: width * 4, height: height * 4 }} className="bg-gray-400 rounded-md py-0.5 px-2 animate-pulse"></View>
    )
}