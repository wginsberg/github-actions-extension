import Auth from "@/components/auth";
import RepoMultiselect from "@/components/repo-multiselect";
import { Space } from "@mantine/core";

export default function Options() {
    return (
        <div className="p-2">
            <RepoMultiselect />
            <Space h="sm" />
            <Auth />
        </div>
    )
}