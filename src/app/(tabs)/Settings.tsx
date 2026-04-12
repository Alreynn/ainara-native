import React from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsTag from '../components/SettingsTag';

const Settings = () => {
    return (
        <SafeAreaView className="flex-1 bg-indigo-500 p-3">
            <View className="flex items-center py-3">
                <Image source={require("../../../assets/images/icon.png")} className="aspect-square w-48 h-48" />
                <Text className="text-2xl font-bold text-white">Ainara</Text>
            </View>
            
            <View className="flex flex-col gap-y-2">
                <SettingsTag>
                    <Text className="text-white">Versi Aplikasi</Text>
                    <Text className="text-white">Initial Release OTA 1</Text>
                </SettingsTag>
            </View>
        </SafeAreaView>
    );
};

export default Settings