import { MAX_WORKFLOW_RUNS_TO_DISPLAY, MAX_WORKFLOW_RUNS_TO_STORE } from './../constants';
import { Octokit } from "@octokit/rest"
import { useStorage } from "@plasmohq/storage/hook"
import { useOctkit } from "./useOctokit"
import sortBy from 'lodash.sortby';

export type WorkflowRunList = Awaited<ReturnType<Octokit["actions"]["listWorkflowRunsForRepo"]>>["data"]["workflow_runs"]

export function useGithubWorkflowRuns(selectedRepos: string[]) {
    const { octokit, isOctokitLoading } = useOctkit()
    const [githubWorkflowRuns, setGithubWorkflowRuns] = useState<WorkflowRunList>([])
    const [isWorkflowRunListLoading, setIsWorkflowRunListLoading] = useState(false)
    const [githubWorkflowError, setGithubWorkflowError] = useState<string>()

    useEffect(() => {
        setGithubWorkflowRuns([])
        setGithubWorkflowError(undefined)
        setIsWorkflowRunListLoading(true)

        if (isOctokitLoading) {
            return
        }

        if (!octokit) {
            setGithubWorkflowError("Could not load workflows")
            setIsWorkflowRunListLoading(false)
            return
        }

        Promise
            .all(
                selectedRepos.map((selectedRepo) =>  {
                    const [owner, repo] = selectedRepo.split("/")
                    return octokit.actions.listWorkflowRunsForRepo({ owner, repo })
                        .then(result => {
                            setGithubWorkflowRuns(prev => [...result.data.workflow_runs, ...prev].slice(0, MAX_WORKFLOW_RUNS_TO_STORE))
                        })
                })
            )
            .then(res => console.log({res}))
            .catch(error => setGithubWorkflowError(error))
            .finally(() => setIsWorkflowRunListLoading(false))
            
    }, [octokit, isOctokitLoading, selectedRepos])
    
    return {
        githubWorkflowRuns: sortBy(githubWorkflowRuns, ["run_started_at"]).toReversed().slice(0, MAX_WORKFLOW_RUNS_TO_DISPLAY),
        isWorkflowRunListLoading: isOctokitLoading || isWorkflowRunListLoading,
        githubWorkflowError
    }
}
