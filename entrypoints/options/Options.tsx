import Auth from "@/components/auth";
import RepoMultiselect from "@/components/repo-multiselect";
import { Anchor, Space, Title } from "@mantine/core";
import Popup from "../popup/Popup";

export default function Options() {
    return (
        <div className="p-2 pb-4 flex flex-col items-center">
            <div className="max-w-md w-full">
                <Anchor href="popup.html">
                    ← View Github Actions
                </Anchor>
                <Auth />
                <Space h="md" />
                <RepoMultiselect />
            </div>
        </div>
    )
}