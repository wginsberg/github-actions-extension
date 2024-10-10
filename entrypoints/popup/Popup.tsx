import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import Auth from '@/components/auth';
import RepoMultiselect from '@/components/repo-multiselect';
import { Anchor, Button, Loader, Overlay, Paper, Skeleton, Space, Text } from '@mantine/core';
import { STORAGE } from '@/constants';
import { useStorage } from '@plasmohq/storage/hook';
import Empty from './Empty';
import { useGithubWorkflowRuns } from "@/hooks/useGithubWorkflowRuns"
import WorkflowRunFeed from '@/components/workflow-run-feed';

export default function Popup() {
  const { githubUser, isGithubUserLoading } = useGithubUser()
  const [selectedRepos, setSelectedRepos, { isLoading: isSelectedReposLoading }] = useStorage<string[]>(STORAGE.SELECTED_REPOS, [])
  const { githubWorkflowRuns, isWorkflowRunListLoading, githubWorkflowError, isPaused, unPause } = useGithubWorkflowRuns(selectedRepos)

  if (isSelectedReposLoading || isGithubUserLoading) {
    return (
      <div className="p-2 flex flex-col items-center">
        <div className="max-w-md w-full">
          <Anchor href="options.html">Options →</Anchor>
          <Skeleton w="100%" h={8} />
        </div>
      </div>
    )
  }

  const showSkeleton = selectedRepos.length > 0 && isWorkflowRunListLoading

  return (
    <div className="p-2 flex flex-col items-center">
      <div className="max-w-md w-full">
        <Anchor href="options.html">Options →</Anchor>
        {
          showSkeleton
            ? <WorkflowRunFeed.Skeleton />
            : githubUser
              ? selectedRepos.length
                ? githubWorkflowRuns.length
                  ? <WorkflowRunFeed workflowRunList={githubWorkflowRuns} />
                  : <Empty.NoWorkflowRuns />
                : <Empty />
              : <Empty.NotLoggedIn />
        }
        {
          isPaused && (
            <Overlay className='flex justify-center items-center'>
              <Paper py={24} px={48}>
                <div className='flex flex-col justify-center items-center'>
                  <Text>Still there?</Text>
                  <Space h={8} />
                  <Button onClick={unPause}>Yes</Button>
                </div>
              </Paper>
            </Overlay>
          )
        }
      </div >
    </div>
  );
}
