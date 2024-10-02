import Auth from "@/components/auth";
import RepoMultiselect from "@/components/repo-multiselect";
import { Space } from "@mantine/core";
import Popup from "../popup/Popup";

export default function Options() {
    return (
        <div className="p-2">
            <Popup />
            <RepoMultiselect />
            <Space h="sm" />
            <Auth />
        </div>
    )
}