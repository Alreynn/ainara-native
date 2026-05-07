import { View, Text } from 'react-native';

const MinimumBox = ({children}: any) => {
    return (
        <View className="flex flex-row justify-between w-full border border-indigo-300 p-1.5 px-3 rounded-lg">
            {children}
        </View>
    )
}
export default MinimumBox