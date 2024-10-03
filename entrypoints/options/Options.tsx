import Auth from "@/components/auth";
import RepoMultiselect from "@/components/repo-multiselect";
import { Space, Title } from "@mantine/core";
import Popup from "../popup/Popup";

export default function Options() {
    return (
        <div className="p-2 flex flex-col items-center">
            <div className="max-w-md w-full">
                <Title order={1}>
                    View Github Actions
                </Title>
                <Space h="lg" />
                <Auth />
                <Space h="md" />
                <RepoMultiselect />
            </div>
        </div>
    )
}