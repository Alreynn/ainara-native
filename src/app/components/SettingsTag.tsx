import { View } from 'react-native';

const SettingsTag = ({ children }: string) => {
    return (
        <View className="flex flex-row justify-between w-full border border-white/75 rounded-lg self-start py-2 px-3">
            {children}
        </View>
    )
}
export default SettingsTag