import { WorkflowRunList } from "@/hooks/useGithubWorkflowRuns";
import WorkflowRun from "./workflow-run";
import { Title } from "@mantine/core";

interface WorkflowRunFeedProps {
    workflowRunList: WorkflowRunList
}

function WorkflowRunFeed({ workflowRunList }: WorkflowRunFeedProps) {
    return (
        <div>
            <Title order={2}>Recent github actions workflow runs</Title>
            <ul>
                {
                    workflowRunList.map(workflowRun => (
                        <li key={workflowRun.run_started_at}>
                            <WorkflowRun workflowRun={workflowRun} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

WorkflowRunFeed.Skeleton = () => (
    <div>
        <Title order={2}>Recent github actions workflow runs</Title>
        <ul>
            <li><WorkflowRun.Skeleton /></li>
            <li><WorkflowRun.Skeleton /></li>
            <li><WorkflowRun.Skeleton /></li>
            <li><WorkflowRun.Skeleton /></li>
            <li><WorkflowRun.Skeleton /></li>
            <li><WorkflowRun.Skeleton /></li>
            <li><WorkflowRun.Skeleton /></li>
        </ul>
    </div>
)

export default WorkflowRunFeed
