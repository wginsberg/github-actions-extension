import { MAX_WORKFLOW_RUNS } from './../constants';
import { Octokit } from "@octokit/rest"
import { useStorage } from "@plasmohq/storage/hook"
import { useOctkit } from "./useOctokit"

export type WorkflowRunList = Awaited<ReturnType<Octokit["actions"]["listWorkflowRunsForRepo"]>>["data"]["workflow_runs"]

export function useGithubWorkflowRuns(selectedRepos: string[]) {
    const { octokit, isOctokitLoading } = useOctkit()
    const [githubWorkflowRuns, setGithubWorkflowRuns] = useState<WorkflowRunList>([])
    const [isWorkflowRunListLoading, setIsWorkflowRunListLoading] = useState(false)
    const [githubWorkflowError, setGithubWorkflowError] = useState()

    useEffect(() => {
        setGithubWorkflowRuns([])
        setGithubWorkflowError(undefined)
        setIsWorkflowRunListLoading(true)

        if (!octokit || isOctokitLoading) {
            return
        }

        Promise.all(
            selectedRepos.map((selectedRepo) =>  {
                const [owner, repo] = selectedRepo.split("/")
                return octokit.actions.listWorkflowRunsForRepo({ owner, repo })
                    .then(result => {
                        setGithubWorkflowRuns(prev => [...result.data.workflow_runs, ...prev].slice(0, MAX_WORKFLOW_RUNS))
                    })
                    .catch(error => {
                        setGithubWorkflowError(error)
                    })
            })
        ).then(() => setIsWorkflowRunListLoading(false))
    }, [octokit, selectedRepos])
    
    return {
        githubWorkflowRuns,
        isWorkflowRunListLoading: isOctokitLoading || isWorkflowRunListLoading,
        githubWorkflowError
    }
}
