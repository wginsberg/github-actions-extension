import { WorkflowRunList } from "@/hooks/useGithubWorkflowRuns";
import WorkflowRun from "./workflow-run";
import { Space, Title } from "@mantine/core";

interface WorkflowRunFeedProps {
    workflowRunList: WorkflowRunList
}

function WorkflowRunFeed({ workflowRunList }: WorkflowRunFeedProps) {
    return (
        <div>
            <Title order={2}>Recent github actions workflow runs</Title>
            <Space h={8} />
            <ul>
                {
                    workflowRunList.map(workflowRun => (
                        <li key={workflowRun.run_started_at} className="contents">
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
        <Space h={8} />
        <ul className="grid grid-cols-[auto_1fr_auto]">
            <li className="contents"><WorkflowRun.Skeleton w1={"50%"} w2={"75%"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"25%"} w2={"50%"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"75%"} w2={"33%"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"33%"} w2={"15"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"25%"} w2={"50%"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"50%"} w2={"75%"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"33%"} w2={"15"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"50%"} w2={"75%"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"75%"} w2={"33%"} /></li>
            <li className="contents"><WorkflowRun.Skeleton w1={"75%"} w2={"33%"} /></li>
        </ul>
    </div>
)

export default WorkflowRunFeed
