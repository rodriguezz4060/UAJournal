import React, { useState } from 'react'
import Link from 'next/link'
import { Avatar, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core'

import styles from './Post.module.scss'
import { PostActions } from '../PostActions'
import { Api } from '../../utils/api'
import { ResponseUser } from '../../utils/api/types'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'

interface PostProps {
  title: string
  id: number
  description: string
  imageUrl?: string
  onRemove: (id: number) => void
  user: ResponseUser
}

export const Post: React.FC<PostProps> = ({ id, title, description, imageUrl, onRemove, user }) => {
  const handleRemove = async () => {
    try {
      await Api().post.remove(id)
      onRemove(id) // Remove the post from the UI
    } catch (err) {
      console.warn('Remove post', err)
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Paper elevation={0} className='p-20' classes={{ root: styles.paper }}>
      <div>
        <div className='d-flex justify-between align-center'>
          <div className={styles.userInfo}>
            <Avatar className={styles.userAvatar}>{user.fullName[0]}</Avatar>
            <b>{user.fullName}</b>
          </div>
          <div>
            <IconButton onClick={handleClick}>
              <MoreIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              elevation={2}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem onClick={handleRemove}>Удалить</MenuItem>
              <MenuItem onClick={handleClose}>Редактировать</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <Typography variant='h5' className={styles.title}>
        <Link href={`/news/${id}`}>{title}</Link>
      </Typography>
      <Typography className={styles.content} dangerouslySetInnerHTML={{ __html: description }} />
      {imageUrl && (
        <img
          src='https://leonardo.osnova.io/a21ca5a9-d95b-560d-9a6f-9fa87eff7fcd/-/preview/600/-/format/webp/'
          height={500}
          width={600}
          alt={title}
        />
      )}
      <PostActions />
    </Paper>
  )
}
