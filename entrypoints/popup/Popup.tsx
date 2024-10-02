import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import Auth from '@/components/auth';
import RepoMultiselect from '@/components/repo-multiselect';
import { Space } from '@mantine/core';
import { STORAGE } from '@/constants';
import { useStorage } from '@plasmohq/storage/hook';
import Empty from './Empty';
import { useGithubWorkflowRuns } from "@/hooks/useGithubWorkflowRuns"
import WorkflowRunFeed from '@/components/workflow-run-feed';

export default function Popup() {
  const [selectedRepos, setSelectedRepos] = useStorage<string[]>(STORAGE.SELECTED_REPOS, [])
  const { githubWorkflowRuns, isWorkflowRunListLoading, githubWorkflowError } = useGithubWorkflowRuns(selectedRepos)

  console.log({ isWorkflowRunListLoading })

  return (
    <div className='p-2'>
      <a href="options.html" target="_blank">Options</a>
      {
        isWorkflowRunListLoading
          ? <WorkflowRunFeed.Skeleton />
          : selectedRepos.length
            ? <WorkflowRunFeed workflowRunList={githubWorkflowRuns} />
            : <Empty />
      }
    </div>
  );
}
