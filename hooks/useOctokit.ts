import { STORAGE } from "@/constants"
import { Octokit } from "@octokit/rest"
import { useStorage } from "@plasmohq/storage/hook"

export function useOctkit() {
    const tokenStorage = useStorage<string>(STORAGE.GITHUB_PERSONAL_ACCESS_TOKEN)
    const [octokit, setOctokit] = useState<Octokit>()

    const personalAccessToken = tokenStorage[0]
    const isTokenLoading = tokenStorage[2].isLoading

    useEffect(() => {
        if (isTokenLoading || !personalAccessToken) {
            setOctokit(undefined)
            return
        }

        setOctokit(new Octokit({ auth: personalAccessToken }))
    }, [personalAccessToken, isTokenLoading])

    console.log({isTokenLoading})

    return {
        octokit,
        isOctokitLoading: isTokenLoading
    }
}
