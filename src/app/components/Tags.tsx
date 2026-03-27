import { Text } from 'react-native'

const Tags = ({ children }: any) => {
    return (
        <Text className="border border-white/75 rounded-md self-start py-0.5 px-2 text-sm text-white">{children}</Text>
    )
}
export default Tags