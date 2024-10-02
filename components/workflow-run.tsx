import { WorkflowRunList } from "@/hooks/useGithubWorkflowRuns";
import { Skeleton } from "@mantine/core";
import { format } from 'timeago.js';

type ElementType<T> = T extends (infer U)[] ? U : never;

interface WorkflowRunProps {
    workflowRun: ElementType<WorkflowRunList>
}

function WorkflowRun({ workflowRun }: WorkflowRunProps) {
    return (
        <div>
            {workflowRun.display_title}
            {workflowRun.run_started_at && format(workflowRun.run_started_at)}
        </div>
    )
}

WorkflowRun.Skeleton = function () {
    return (
        <div>
            <Skeleton h={8} />
        </div>
    )
}

export default WorkflowRun
