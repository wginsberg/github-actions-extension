import { MAX_WORKFLOW_RUNS_TO_DISPLAY, MAX_WORKFLOW_RUNS_TO_STORE } from './../constants';
import { Octokit } from "@octokit/rest"
import { useStorage } from "@plasmohq/storage/hook"
import { useOctkit } from "./useOctokit"
import sortBy from 'lodash.sortby';
import uniqby from "lodash.uniqby"

export type WorkflowRunList = Awaited<ReturnType<Octokit["actions"]["listWorkflowRunsForRepo"]>>["data"]["workflow_runs"]

const REFRESH_QUOTA = 100
const REFRESH_INTERVAL = 5 * 1000

export function useGithubWorkflowRuns(selectedRepos: string[]) {
    const { octokit, isOctokitLoading } = useOctkit()
    const [githubWorkflowRuns, setGithubWorkflowRuns] = useState<WorkflowRunList>([])
    const [isWorkflowRunListLoading, setIsWorkflowRunListLoading] = useState(true)
    const [githubWorkflowError, setGithubWorkflowError] = useState<string>()
    const refreshQuota = useRef(REFRESH_QUOTA)
    const [isPaused, setIsPaused] = useState(false)

    const fetchAllRuns = useCallback(async () => {
        if (!octokit) throw new Error("Could not fetch workflow runs")

        return Promise
            .allSettled(
                selectedRepos.map((selectedRepo) =>  {
                    const [owner, repo] = selectedRepo.split("/")
                    return octokit.actions.listWorkflowRunsForRepo({ owner, repo, headers: { 'If-None-Match': '' } })
                })
            )
            .then(results => 
                results
                    .map(result => {
                        if (result.status === "rejected") return []
                        return result.value.data.workflow_runs
                    })
                    .flat()
            )
    }, [octokit, selectedRepos])

    useEffect(() => {
        setGithubWorkflowRuns([])
        setGithubWorkflowError(undefined)
        setIsWorkflowRunListLoading(true)

        if (isOctokitLoading || !octokit) {
            return
        }

        const interval = setInterval(() => {
            refreshQuota.current -= 1
            if (refreshQuota.current === 0) {
                setIsPaused(true)
                return
            }

            if (refreshQuota.current < 1) return

            fetchAllRuns()
                .then(results => setGithubWorkflowRuns(prev => {
                    const allResults = [...results, ...prev]
                        .slice(0, MAX_WORKFLOW_RUNS_TO_STORE)
                    const deduplicatedResults = uniqby(allResults, workfulRun => workfulRun.id)
                    return deduplicatedResults
                }))
                .catch(error => setGithubWorkflowError(error))
        }, REFRESH_INTERVAL)

        fetchAllRuns()
            .then(results => setGithubWorkflowRuns(prev => [...results, ...prev].slice(0, MAX_WORKFLOW_RUNS_TO_STORE)))
            .catch(error => setGithubWorkflowError(error))
            .finally(() => setIsWorkflowRunListLoading(false))

        return () => clearInterval(interval)
    }, [octokit, isOctokitLoading, selectedRepos])
    
    const unPause = useCallback(() => {
        setIsPaused(false)
        refreshQuota.current = REFRESH_QUOTA
    }, [setIsPaused])

    return {
        githubWorkflowRuns: sortBy(githubWorkflowRuns, ["run_started_at"]).toReversed().slice(0, MAX_WORKFLOW_RUNS_TO_DISPLAY),
        isWorkflowRunListLoading: isOctokitLoading || isWorkflowRunListLoading,
        githubWorkflowError,
        isPaused,
        unPause
    }
}
