import MinimumBox from '../components/MinimumBox';
import { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = () => {
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3">
            <View className="flex justify-center items-center w-full mb-3">
                <Image source={require("../../../assets/images/icon.png")} className="w-48 h-48 aspect-square" />
                <Text className="font-bold text-2xl text-white">Ainara</Text>
            </View>
            
            <MinimumBox>
                <Text className="text-white">Versi</Text>
                <Text className="text-white">Initial Release OTA Update 1</Text>
            </MinimumBox>
        </SafeAreaView>
    );
};

export default Settings;