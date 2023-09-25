import React from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { PostActions } from '../PostActions'
import MessageIcon from '@material-ui/icons/TextsmsOutlined'
import UserAddIcon from '@material-ui/icons/PersonAddOutlined'

import styles from './FullPost.module.scss'
import { OutputData } from '@editorjs/editorjs'
import { ResponseUser } from '../../utils/api/types'

interface FullPostProps {
  title: string
  blocks: OutputData['blocks']
  user: ResponseUser
}

export const FullPost: React.FC<FullPostProps> = ({ title, blocks, user }) => {
  return (
    <Paper elevation={0} className={styles.paper}>
      <div className='container'>
        <Typography className={styles.title}>{title}</Typography>
        <div className={styles.text}>
          {blocks.map(obj => {
            if (obj.type === 'paragraph') {
              return <Typography key={obj.id} dangerouslySetInnerHTML={{ __html: obj.data.text }} />
            } else if (obj.type === 'quote') {
              return <blockquote>{obj.data.text}</blockquote>
            } else if (obj.type === 'list') {
              return (
                <ul>
                  {obj.data.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )
            } else {
              return null
            }
          })}

          <div style={{ width: 250, marginLeft: -14 }}>
            <PostActions />
          </div>
          <div className='d-flex justify-between align-center mt-30 mb-30'>
            <div className={styles.userInfo}>
              <img
                src='https://leonardo.osnova.io/104b03b4-5173-fd9f-2af9-b458dddc4a23/-/scale_crop/108x108/-/format/webp/'
                alt='Avatar'
              />
              <b>{user.fullName}</b>
              <span>+{user.commentsCount * 2}</span>
            </div>
            <div>
              <Button variant='contained' className='mr-15'>
                <MessageIcon />
              </Button>
              <Button variant='contained'>
                <UserAddIcon />
                <b className='ml-10'>Подписаться</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}
