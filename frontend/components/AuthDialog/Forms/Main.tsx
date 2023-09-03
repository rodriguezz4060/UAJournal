import {Button} from "@material-ui/core";
import MailIcon from "@mui/icons-material/MailOutline";
import AppleIcon from "@mui/icons-material/Apple";
import styles from "../AuthDialog.module.scss";
import React from "react";

interface MainFormProps {
    onOpenLogin: () => void;
}

export const MainForm: React.FC<MainFormProps> = ({onOpenLogin}) => {
    return (
        <>
            <div>
                <Button
                    onClick={onOpenLogin}
                    className='mb-10'
                    variant='contained'
                    fullWidth
                >
                    <MailIcon/>
                    Через почту
                </Button>
                <Button className='mb-10' variant='contained' fullWidth>
                    <img
                        src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
                        alt='Google'
                    />
                    Google
                </Button>
                <Button className='mb-10' variant='contained' fullWidth>
                    <AppleIcon/>
                    Apple
                </Button>
            </div>
            <div className={styles.miniButtons}>
                <Button className='mb-10' variant='contained' fullWidth>
                    <MailIcon/>
                </Button>
                <Button className='mb-10' variant='contained' fullWidth>
                    <img
                        src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
                        alt='Google'
                    />
                </Button>
                <Button className='mb-10' variant='contained' fullWidth>
                    <AppleIcon/>
                </Button>
            </div>
        </>
    )
};