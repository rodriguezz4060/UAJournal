import React from "react"
import { Button } from "@material-ui/core"
import styles from './LeftMenu.module.scss'
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import MessageIcon from '@mui/icons-material/SmsOutlined';
import TrandingIcon from '@mui/icons-material/TrendingUpOutlined';
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';

export const LeftMenu: React.FC = () => {
    return (
     <div className={styles.menu}>
     <ul>
        <li>
            <Button> 
                <FireIcon />
                Популярное
            </Button>
            </li>
            <li>
            <Button> 
                <MessageIcon />
                Сообщения
            </Button>
            </li>
            <li>
            <Button> 
                <TrandingIcon />
                Рейтинг
            </Button>
            </li>
            <li>
            <Button> 
                <ListIcon />
                Рейтинг
            </Button>
        </li>
    </ul>
     </div>
)
}
