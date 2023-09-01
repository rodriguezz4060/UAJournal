import React from "react"
import {Button, Paper, IconButton, Avatar} from "@material-ui/core"
import styles from './Header.module.scss'
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import CreateIcon from '@mui/icons-material/CreateOutlined';
import MessageIcon from '@mui/icons-material/SmsOutlined';
import NotificationIcon from '@mui/icons-material/NotificationsOutlined';
import Menu from '@mui/icons-material/MenuOutlined';
import ArrowBottom from '@mui/icons-material/KeyboardArrowDownOutlined';
import logo from "/pages/static/img/logo.svg"
import Image from "next/image";


export const Header: React.FC = () => {
    return (
        <Paper classes={{root: styles.root}} elevation={0}>
            <div className="d-flex align-center">
                <IconButton>
                    <Menu/>
                </IconButton>
                <Link href="/">
                    <Image className={styles.logo} src={logo}/>
                </Link>
                <div className={styles.searchBlock}>
                    <SearchIcon/>
                    <input placeholder="Поиск"/>
                </div>

                <Button variant="contained" className={styles.penBottom}>
                    <CreateIcon/> Написать
                </Button>
            </div>

            <div className="d-flex align-center">
                <IconButton>
                    <MessageIcon/>
                </IconButton>
                <IconButton>
                    <NotificationIcon/>
                </IconButton>
                <Link href="/profile/1" className="d-flex align-center">

                    <Avatar
                        className={styles.avatar}
                        alt="Remy Sharp"
                        src="https://leonardo.osnova.io/84acaa93-a48a-5e08-ba4f-79be1c92a724/-/scale_crop/108x108/-/format/webp/"/>

                    <ArrowBottom/>

                </Link>
            </div>
        </Paper>
    )
}
