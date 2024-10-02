import { STORAGE } from "@/constants"
import { Octokit } from "@octokit/rest"
import { useStorage } from "@plasmohq/storage/hook"
import { useOctkit } from "./useOctokit"

type RepoList = Awaited<ReturnType<Octokit["repos"]["listForAuthenticatedUser"]>>["data"]

export function useGithubRepos() {
    const { octokit, isOctokitLoading } = useOctkit()
    const [githubRepos, setGithubRepos] = useState<RepoList>([])
    const [isRepoListLoading, setIsRepoListLoading] = useState(false)
    const [githubRepoError, setGithubRepoError] = useState()

    useEffect(() => {
        if (!octokit || isOctokitLoading) {
            setGithubRepos([])
            setGithubRepoError(undefined)
            return
        }

        setIsRepoListLoading(true)
        octokit
            .paginate(
                octokit.rest.repos.listForAuthenticatedUser
            )
            .then(result => {
                setGithubRepos(result)
                setGithubRepoError(undefined)
            })
            .catch(error => {
                setGithubRepoError(error)
            })
            .finally(() => {
                setIsRepoListLoading(false)
            })
    }, [octokit])
    
    return {
        githubRepos,
        isRepoListLoading: isOctokitLoading || isRepoListLoading,
        githubRepoError
    }
}
