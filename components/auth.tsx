import { STORAGE } from '@/constants';
import { useGithubUser } from '@/hooks/useGithubUser';
import { Button, Loader, Space, TextInput, Title } from '@mantine/core';
import { useStorage } from "@plasmohq/storage/hook";

export default function Auth() {
    const [personalAccessToken, setPersonalAccessToken] = useStorage<string>(STORAGE.GITHUB_PERSONAL_ACCESS_TOKEN)
    const { githubUser, isGithubUserLoading, githubUserError } = useGithubUser()
    return (
        <div className=''>
            <Title order={2}>Settings</Title>
            <Space h="sm" />
            <TextInput
                label="Github personal access token"
                value={personalAccessToken || ""}
                onChange={e => setPersonalAccessToken(e.target.value)}
                error={githubUserError && "Bad token"}
                minLength={1}
            />
            <Button
                className='mt-2'
                onClick={() => setPersonalAccessToken("")}
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
        </div>
    )
}
