import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import Image from 'next/image';
import CommentsIcon from '@mui/icons-material/ModeCommentOutlined';
import RepostIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ShareIcon from '@mui/icons-material/FileUploadOutlined';
import styles from './Post.module.scss';
import {IconButton} from "@mui/material";

export const Post: React.FC = () => {
    return (
        <Paper elevation={0} className="p-20" classes={{root: styles.paper}}>
            <Typography variant="h5" className={styles.title}>
                <a href="#">
                    Кот прилёг отдохнуть в английском парке миниатюр — и стал героем шуток и фотожаб о
                    «гигантском пушистом захватчике»
                </a>
            </Typography>
            <Typography className="mt-10 mb-15">
                Пока одни не могли соотнести размеры животного и окружения, другие начали создавать
                апокалиптические сюжеты с котом в главной роли.
            </Typography>
            <Image
                src="https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/"
                height={500}
                width={600}
            />
                <ul className={styles.acrions}>
                    <li>
                        <IconButton>
                            <CommentsIcon/>
                        </IconButton>
                    </li>
                    <li>
                        <IconButton>
                            <RepostIcon/>
                        </IconButton>
                    </li>
                    <li>
                        <IconButton>
                            <FavoriteIcon/>
                        </IconButton>
                    </li>
                    <li>
                        <IconButton>
                            <ShareIcon/>
                        </IconButton>
                    </li>
                </ul>
        </Paper>
    );
}