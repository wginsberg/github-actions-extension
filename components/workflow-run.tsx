import { WorkflowRunList } from "@/hooks/useGithubWorkflowRuns";
import { Anchor, Flex, Paper, Skeleton, StyleProp, Text } from "@mantine/core";
import { format } from 'timeago.js';

type ElementType<T> = T extends (infer U)[] ? U : never;

interface WorkflowRunProps {
    workflowRun: ElementType<WorkflowRunList>
}

type Status = "completed"
    | "action_required"
    | "cancelled"
    | "failure"
    | "neutral"
    | "skipped"
    | "stale"
    | "success"
    | "timed_out"
    | "in_progress"
    | "queued"
    | "requested"
    | "waiting"
    | "pending"


function WorkflowRun({ workflowRun }: WorkflowRunProps) {
    return (
        <div className="contents">
            <StatusIcon status={(workflowRun.conclusion || workflowRun.status) as Status} />
            <div>
                <div className="px-2 flex flex-col">
                    <Text fw={700}>
                        {workflowRun.name}
                    </Text>
                    <Anchor
                        href={workflowRun.html_url}
                        underline="never"
                        target="_blank"
                        rel="noreferer noopener"
                    >
                        {workflowRun.display_title}
                    </Anchor>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <Anchor
                    href={workflowRun.repository.url}
                    underline="never"
                    target="_blank"
                    rel="noreferer noopener"
                    className=""
                >
                    {workflowRun.repository.owner.login} / {workflowRun.repository.name}
                </Anchor>
                <Text c="dimmed">{workflowRun.run_started_at && format(workflowRun.run_started_at)}</Text>
            </div>
        </div>
    )
}

function StatusIcon({ status }: { status?: Status | null }) {
    if (!status) {
        return (
            <div className="px-1 h-full flex justify-center items-center">
                ?
            </div>
        )
    }
    return (
        <div className="px-1 h-full flex justify-center items-center">
            {status === "success" && "✅"}
            {status === "failure" && "❌"}
        </div>
    )
}

StatusIcon.Skeleton = function () {
    return (
        <div className="flex justify-center items-center">
            <div className="p-2 h-full aspect-square">
                <Skeleton w="100%" h="100%" />
            </div>
        </div>
    )
}

WorkflowRun.Skeleton = function ({ w }: { w: StyleProp<React.CSSProperties['width']> }) {
    return (
        <Paper shadow="md" withBorder display={"contents"}>
            <StatusIcon.Skeleton />
            <span className="p-2"><Skeleton w={w}>&nbsp;</Skeleton></span>
            <span className="p-2"><Skeleton w={w}>&nbsp;</Skeleton></span>
        </Paper>
    )
}

export default WorkflowRun
