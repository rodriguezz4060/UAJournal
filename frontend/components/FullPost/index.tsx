import React from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { PostActions } from '../PostActions'
import MessageIcon from '@material-ui/icons/TextsmsOutlined'
import UserAddIcon from '@material-ui/icons/PersonAddOutlined'
import QuoteIcon from '@mui/icons-material/FormatQuote'
import styles from './FullPost.module.scss'
import { FullPostProps } from '.'

export const FullPost: React.FC<FullPostProps> = ({ title, blocks, user }) => {
  return (
    <Paper elevation={0} className={styles.paper}>
      <div className={styles.container}>
        <Typography className={styles.title}>{title}</Typography>
        <div className={styles.text}>
          {blocks.map(obj => {
            if (obj.type === 'paragraph') {
              return (
                <div className={styles.figure}>
                  <div className={styles.paragraph}>
                    <Typography key={obj.id} dangerouslySetInnerHTML={{ __html: obj.data.text }} />
                  </div>
                </div>
              )
            }
            if (obj.type === 'quote') {
              return (
                <div className={styles.figure}>
                  <blockquote className={styles.block_quote}>
                    <div className={styles.quote__content}>
                      <QuoteIcon />
                      <div className={styles.quote_text}>{obj.data.text}</div>
                      <div className={styles.quote_author}>{obj.data.caption}</div>
                    </div>
                  </blockquote>
                </div>
              )
            }
            if (obj.type === 'list') {
              return (
                <div className={styles.figure}>
                  <div className={styles.list}>
                    <ul>
                      {obj.data.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            }
            if (obj.type === 'incut') {
              return (
                <div className={styles.figure}>
                  <div className={styles.block_incut}>
                    <div className={styles.content_incut}>
                      <p>{obj.data.code}</p>
                    </div>
                  </div>
                </div>
              )
            }
            if (obj.type === 'code') {
              return (
                <div className={styles.figure}>
                  <div className={styles.block_code}>{obj.data.code}</div>
                </div>
              )
            }
            if (obj.type === 'image') {
              const imageClass = obj.data.file.width < 950 ? styles.image : styles.stretched_image

              return (
                <div className={styles.figure}>
                  <div className={imageClass}>
                    <img src={obj.data.file.url} alt={obj.data.caption} className={imageClass} />
                    <div className={styles.image_caption}>{obj.data.caption}</div>
                  </div>
                </div>
              )
            }
            if (obj.type === 'video') {
              return (
                <div className={styles.figure}>
                  <div className={styles.video}>
                    <video controls>
                      <source src={obj.data.file.url} type='video/mp4' />
                    </video>
                    <div className={styles.video_caption}>{obj.data.caption}</div>
                  </div>
                </div>
              )
            }
            return null
          })}

          <div className={styles.PostActions}>
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
