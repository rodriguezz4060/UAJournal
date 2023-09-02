import React from 'react'
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import MoreIcon from '@mui/icons-material/MoreHorizOutlined'

import styles from './Comment.module.scss'

interface CommentPostProps {
  user: {
    fullname: string
  }
  text: string
}

export const Comment: React.FC<CommentPostProps> = ({ user, text }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <img
          src='https://leonardo.osnova.io/0a8758f4-966c-5e4f-bf7d-c798f83ee4a6/-/scale_crop/64x64/-/format/webp/'
          alt='Avatar'
        />
        <b>Bender Rodriguez</b>
        <span>5 часов</span>
      </div>
      <Typography className={styles.text}>
        После бг3 на многие игры смешно смотреть, но Старфилд не говно, а вот рот Медисона обмазан
        сильно
      </Typography>
      <span className={styles.replyBtn}>Ответить</span>
      <IconButton onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        elevation={2}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Удалить</MenuItem>
        <MenuItem onClick={handleClose}>Редактировать</MenuItem>
      </Menu>
    </div>
  )
}
