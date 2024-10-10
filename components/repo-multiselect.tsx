import { MAX_SELECTED_REPOS, STORAGE } from "@/constants"
import { useGithubRepos } from "@/hooks/useGithubRepos"
import { useGithubUser } from "@/hooks/useGithubUser"
import { MultiSelect, MultiSelectProps, Title } from "@mantine/core"
import { useStorage } from "@plasmohq/storage/hook"

export default function RepoMultiselect() {
    const { githubUser } = useGithubUser()
    const { githubRepos, isRepoListLoading, githubRepoError } = useGithubRepos()
    const [selectedRepos, setSelectedRepos] = useStorage<string[]>(STORAGE.SELECTED_REPOS, [])

    const includesPrivateRepos = githubRepos.find(repo => repo.private) !== undefined

    const handleRepoSelectionChange: MultiSelectProps["onChange"] = useCallback((selections: string[]) => {
        setSelectedRepos(selections)
    }, [])

    const repoData = githubRepos
        .map(({ owner, name }) => `${owner.login}/${name}`)

    const label = githubUser
        ? `Select up to ${MAX_SELECTED_REPOS} repositories to watch`
        : "Login to load your repositories"

    const placeholder = githubUser
        ? isRepoListLoading
            ? "loading..."
            : `${repoData.length} repositories`
        : ""

    const nothingFoundMessage = includesPrivateRepos
        ? "No matching repos found. "
        : (
            <>
                <p>No matching repos found.</p>
                <p>If you are looking for a private repo make sure that your auth token has the "repo" scope checked.</p>
            </>
        )

    return (
        <div className="w-full" id="repoSelect">
            <MultiSelect
                label={label}
                placeholder={placeholder}
                data={repoData}
                maxValues={MAX_SELECTED_REPOS}
                onChange={handleRepoSelectionChange}
                value={selectedRepos}
                clearable
                searchable
                disabled={!githubUser}
                nothingFoundMessage={nothingFoundMessage}
            />
        </div>
    )
}
