import { STORAGE } from "@/constants"
import { Octokit } from "@octokit/rest"
import { useStorage } from "@plasmohq/storage/hook"
import { useOctkit } from "./useOctokit"

type GithubUser = Awaited<ReturnType<Octokit["users"]["getAuthenticated"]>>["data"]

export function useGithubUser() {
    const { octokit, isOctokitLoading } = useOctkit()
    const [githubUser, setGithubUser] = useState<GithubUser>()
    const [isGithubUserLoading, setIsGithubUserLoading] = useState(false)
    const [githubUserError, setGithubUserError] = useState()

    useEffect(() => {
        if (!octokit || isOctokitLoading) {
            setGithubUser(undefined)
            setGithubUserError(undefined)
            return
        }

        setIsGithubUserLoading(true)
        octokit
            .users
            .getAuthenticated()
            .then(result => {
                setGithubUser(result.data)
                setGithubUserError(undefined)
            })
            .catch(error => {
                setGithubUserError(error)
            })
            .finally(() => {
                setIsGithubUserLoading(false)
            })
    }, [octokit])

    return {
        githubUser,
        isGithubUserLoading: isOctokitLoading || isGithubUserLoading,
        githubUserError
    }
}
