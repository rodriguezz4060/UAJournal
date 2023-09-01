import {MainLayout} from '../../layouts/MainLayout';
import {Paper, Typography} from "@material-ui/core";
import {FullPost} from "../../components/FullPost";

export default function Home() {
    return (
        <MainLayout contentFullWidth>
            <FullPost/>
        </MainLayout>
    );
}