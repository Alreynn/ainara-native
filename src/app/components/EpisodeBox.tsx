import { Pressable, Text } from 'react-native'
import { Link } from 'expo-router'

interface Parameters {
    episodeId: string;
    title: string;
    eps: string;
    date: string;
}

const EpisodeBox = ({episodeId, title, eps, date}: Parameters) => {
    const dateFix = (date) => {
        return date.replace(",", " ");
    }
    
    return (
        <Link href={{ pathname: './Watch', params: { episodeId, title, eps } }} asChild>
            <Pressable className="w-full border border-gray-500 p-1.5 px-3 rounded-xl">
                <Text className="font-bold text-xl text-white">Episode {eps}</Text>
                <Text className="text-sm text-white">{dateFix(date)}</Text>
            </Pressable>
        </Link>
    )
}
export default EpisodeBox