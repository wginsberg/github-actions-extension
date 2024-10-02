import { WorkflowRunList } from "@/hooks/useGithubWorkflowRuns";
import { Skeleton } from "@mantine/core";

type ElementType<T> = T extends (infer U)[] ? U : never;

interface WorkflowRunProps {
    workflowRun: ElementType<WorkflowRunList>
}

function WorkflowRun({ workflowRun }: WorkflowRunProps) {
    return (
        <div>
            {workflowRun.display_title}
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
