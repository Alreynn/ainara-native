import { Pressable, Text } from 'react-native'
import { Link } from 'expo-router';

const MinimalAnimeBox = ({animeId, title}: string) => {
    return (
        <Link href={{ pathname: "/Details", params: { animeId, title } }} asChild>
            <Pressable className="flex flex-col grow-0 shrink-0 border border-indigo-300 w-full rounded-xl p-3">
                <Text className="text-white">{title}</Text>
            </Pressable>
        </Link>
    )
}
export default MinimalAnimeBox