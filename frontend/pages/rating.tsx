import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Tabs,
    Tab,
} from '@material-ui/core';

import {MainLayout} from '../layouts/MainLayout';
import {FollowButton} from "../components/FollowButton";


export default function Rating() {
    return (
        <MainLayout>
            <Paper className="pl-20 pt-20 pr-20 mb-20" elevation={0}>
                <Typography variant="h5" className='fw-bold' style={{marginBottom: 6}}>Рейтинг сообщиств и
                    блогов</Typography>
                <Typography style={{fontSize: 15}}>
                    Десять лучших авторов и комментаторов, а также администраторы первых десяти сообществ из рейтинга по
                    итогам месяца бесплатно получают Plus-аккаунт на месяц.
                </Typography>
                <Tabs className="mt-10" value={0} indicatorColor="primary" textColor="primary">
                    <Tab label="Август"/>
                    <Tab label="За 3 месяца"/>
                    <Tab label="За все время"/>
                </Tabs>
            </Paper>
            <Paper elevation={0}>

                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Пользователь</TableCell>
                            <TableCell align="right">Рейтинг</TableCell>
                            <TableCell align="right">Рейтинг</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <span className="mr-15">1</span> Вася путкин
                            </TableCell>
                            <TableCell align="right">540</TableCell>
                            <TableCell align="right">
                                <FollowButton/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </Paper>
        </MainLayout>
    );
}