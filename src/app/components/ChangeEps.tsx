import React from 'react';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Params {
    text: string;
    isPrev: boolean;
    isNext: boolean;
}

const ChangeEps = ({text, isPrev, isNext}: Params) => {
    return (
        <Pressable className="flex flex-row items-center align-middle gap-1.5 border border-white w-fit py-1 px-2 rounded-lg">
            {isPrev && (
                <Ionicons name="arrow-back-circle-outline" color="white" size={5 * 4} />
            )}
            <Text className="text-white">{text}</Text>
            {isNext && (
                <Ionicons name="arrow-forward-circle-outline" color="white" size={5 * 4} />
            )}
        </Pressable>
    );
};

export default ChangeEps;