import { STORAGE } from '@/constants';
import { useGithubUser } from '@/hooks/useGithubUser';
import { Alert, Anchor, Button, Loader, Space, TextInput, Title } from '@mantine/core';
import { useStorage } from "@plasmohq/storage/hook";
import { IconInfoCircle, IconExternalLink } from '@tabler/icons-react';

export default function Auth() {
    const [personalAccessToken, setPersonalAccessToken] = useStorage<string>(STORAGE.GITHUB_PERSONAL_ACCESS_TOKEN)
    const [selectedRepos, setSelectedRepos] = useStorage<string[]>(STORAGE.SELECTED_REPOS)
    const { githubUser, isGithubUserLoading, githubUserError } = useGithubUser()

    const logout = useCallback(() => {
        if (!githubUser) return
        const confirmation = confirm(`Are you sure you want to logout as ${githubUser.login}?`)
        if (!confirmation) return

        setPersonalAccessToken("")
        setSelectedRepos([])
    }, [githubUser])

    const login = useCallback((token: string) => {
        setPersonalAccessToken(token)
        setSelectedRepos([])
    }, [])

    return (
        <div className=''>
            <Title order={2}>Settings</Title>
            <Space h="sm" />
            {
                !githubUser &&
                <>
                    <Alert title="Github token required" icon={(<IconInfoCircle />)} color="yellow">
                        <p>This browser extension requires a personal access token for Github. Don't worry - only minimal read-access to your account is needed.</p>
                        <ul className='list-disc'>
                            <li>
                                <Space h={4} />
                                <Anchor size='sm' target='_blank' rel='noreferer noopener' href="https://github.com/settings/tokens?type=beta">
                                    Create a Github personal access token&nbsp;<IconExternalLink className='inline' size="1rem" />
                                </Anchor>
                            </li>
                            <li>
                                <Space h={4} />
                                You can read more about tokens&nbsp;
                                <Anchor size='sm' target='_blank' rel='noreferer noopener' href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token">
                                    here
                                </Anchor>
                                .
                            </li>
                        </ul>
                    </Alert>
                    <Space h={8} />
                </>
            }
            <TextInput
                label="Github personal access token"
                value={personalAccessToken || ""}
                onChange={e => login(e.target.value)}
                error={githubUserError && (githubUserError["status"] === 401 ? "Bad token" : "Encountered an unexpected error while validating token")}
                minLength={1}
            />
            {
                personalAccessToken &&
                <Button
                    className='mt-2'
                    onClick={logout}
                    disabled={!githubUser}
                    color="red"
                >
                    {
                        githubUser
                            ? `Logout ${githubUser.login}`
                            : isGithubUserLoading
                                ? <Loader size="sm" />
                                : "Logout"
                    }
                </Button>
            }
        </div>
    )
}
