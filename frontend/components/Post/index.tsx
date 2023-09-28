import React, { useState } from 'react'
import Link from 'next/link'
import { Avatar, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import styles from './Post.module.scss'
import { PostActions } from '../PostActions'
import { Api } from '../../utils/api'
import { ResponseUser } from '../../utils/api/types'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'
import moment from 'moment'

interface PostProps {
  title: string
  id: number
  description: string
  images: string[]
  onRemove: (id: number) => void
  user: ResponseUser
  createdAt: string
}

export const Post: React.FC<PostProps> = ({
  id,
  title,
  description,
  images,
  onRemove,
  user,
  createdAt,
}) => {
  const handleRemove = async () => {
    try {
      await Api().post.remove(id)
      onRemove(id) // Remove the post from the UI
    } catch (err) {
      console.warn('Remove post', err)
    }
  }

  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    router.push(`/write/${id}`)
    handleClose()
  }

  return (
    <Paper elevation={0} classes={{ root: styles.paper }}>
      <div className={styles.postContent}>
        <div className={styles.userInfoContent}>
          <div className={styles.userInfo}>
            <Avatar className={styles.userAvatar}>{user.fullName[0]}</Avatar>
            <b>{user.fullName}</b>

            <div>
              <span>{moment(createdAt).fromNow()}</span>
            </div>
          </div>
          <div className={styles.userInfoControl}>
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
              <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <Typography variant='h5' className={styles.title}>
        <Link href={`/news/${id}`}>{title}</Link>
      </Typography>
      <Typography className={styles.content} dangerouslySetInnerHTML={{ __html: description }} />
      {images.length > 0 && (
        <div className={styles.imagePost}>
          <img src={images[0]} alt='First Image' />
        </div>
      )}
      <PostActions />
    </Paper>
  )
}
