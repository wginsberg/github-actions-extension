import { WorkflowRunList } from "@/hooks/useGithubWorkflowRuns";
import { Anchor, Flex, Loader, Paper, Skeleton, StyleProp, Text } from "@mantine/core";
import { format } from 'timeago.js';
import { IconHandStop } from '@tabler/icons-react';


type ElementType<T> = T extends (infer U)[] ? U : never;

interface WorkflowRunProps {
    workflowRun: ElementType<WorkflowRunList>
}

type Status = "completed"
    | "action_required"
    | "in_progress"
    | "queued"
    | "requested"
    | "waiting"
    | "pending"

type Conclusion =
    | "cancelled"
    | "failure"
    | "neutral"
    | "skipped"
    | "stale"
    | "success"
    | "timed_out"
function WorkflowRun({ workflowRun }: WorkflowRunProps) {
    const statusMessage = getFormattedMessage(workflowRun.status as Status, workflowRun.conclusion as Conclusion)

    return (
        <Paper withBorder shadow="sm" mb={8} p={4}>
            <div className="flex">
                <StatusIcon
                    status={workflowRun.status as Status}
                    conclusion={workflowRun.conclusion as Conclusion}
                    className="w-6"
                />
                <div className="grow">
                    <div className="px-2 flex flex-col">
                        <Text fw={700}>
                            {workflowRun.name}
                        </Text>
                        <Anchor
                            href={workflowRun.html_url}
                            underline="never"
                            target="_blank"
                            rel="noreferer noopener"
                            className="self-start"
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
        </Paper>
    )
}

function getFormattedMessage(status?: Status | null, conclusion?: Conclusion | null) {
    const lowercaseMessage = (conclusion || status || "")?.replaceAll("_", " ")
    return `${lowercaseMessage.charAt(0).toUpperCase()}${lowercaseMessage.slice(1)}`
}

interface StatusIconProps {
    status?: Status | null
    conclusion?: Conclusion | null
    className?: string
}

function StatusIcon({ status, conclusion, ...props }: StatusIconProps) {
    const className = ` h-full flex justify-center items-center self-center ${props.className}`

    const title = getFormattedMessage(status, conclusion)

    if (!status) {
        return (
            <div className={className}>
                ?
            </div>
        )
    }

    const icon = conclusion === "success"
        ? "✅"
        : conclusion === "failure"
            ? "❌"
            : conclusion === "cancelled"
                ? <IconHandStop />
                : (status !== "completed")
                    ? <Loader size="xs" />
                    : "❓"

    return (
        <div className={className} title={title}>
            {icon}
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

WorkflowRun.Skeleton = function ({ w1, w2 }: { w1: StyleProp<React.CSSProperties['width']>, w2: StyleProp<React.CSSProperties['width']> }) {
    return (
        <Paper shadow="md" withBorder display={"contents"}>
            <StatusIcon.Skeleton />
            <span className="p-2"><Skeleton w={w1}>&nbsp;</Skeleton></span>
            <span className="p-2"><Skeleton w={w2} className="ml-auto">&nbsp;</Skeleton></span>
        </Paper>
    )
}

export default WorkflowRun
