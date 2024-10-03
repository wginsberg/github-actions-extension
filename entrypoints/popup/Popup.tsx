import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import Auth from '@/components/auth';
import RepoMultiselect from '@/components/repo-multiselect';
import { Button, Overlay, Paper, Space, Text } from '@mantine/core';
import { STORAGE } from '@/constants';
import { useStorage } from '@plasmohq/storage/hook';
import Empty from './Empty';
import { useGithubWorkflowRuns } from "@/hooks/useGithubWorkflowRuns"
import WorkflowRunFeed from '@/components/workflow-run-feed';

export default function Popup() {
  const { githubUser } = useGithubUser()
  const [selectedRepos, setSelectedRepos] = useStorage<string[]>(STORAGE.SELECTED_REPOS, [])
  const { githubWorkflowRuns, isWorkflowRunListLoading, githubWorkflowError, isPaused, unPause } = useGithubWorkflowRuns(selectedRepos)

  const showSkeleton = selectedRepos.length > 0 && isWorkflowRunListLoading

  return (
    <div className='p-2'>
      <a href="options.html" target="_blank">Options</a>
      {
        showSkeleton
          ? <WorkflowRunFeed.Skeleton />
          : githubUser
            ? selectedRepos.length
              ? <WorkflowRunFeed workflowRunList={githubWorkflowRuns} />
              : <Empty />
            : "not logged in"
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
  );
}
