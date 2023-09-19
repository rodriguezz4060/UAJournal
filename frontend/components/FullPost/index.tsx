import React from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import styles from './FullPost.module.scss'
import { PostActions } from '../PostActions'
import MessageIcon from '@mui/icons-material/SmsOutlined'
import UserAddIcon from '@mui/icons-material/PersonAddOutlined'
import { OutputData } from '@editorjs/editorjs'

interface FullPostProps {
  title: string
  blocks: OutputData['blocks']
}

export const FullPost: React.FC<FullPostProps> = ({ title, blocks }) => {
  return (
    <div>
      <Paper elevation={0} className={styles.paper}>
        <div className='container'>
          <Typography variant='h4' className={styles.title}>
            {title}
          </Typography>
          <div className={styles.text}>
            {blocks.map(obj => (
              <Typography key={obj.id} dangerouslySetInnerHTML={{ __html: obj.data.text }} />
            ))}
            <div style={{ width: 250, marginLeft: -14 }}>
              <PostActions />
            </div>
            <div className='d-flex justify-between align-center mt-30 mb-30'>
              <div className={styles.userInfo}>
                <img
                  src='https://leonardo.osnova.io/0a8758f4-966c-5e4f-bf7d-c798f83ee4a6/-/scale_crop/64x64/-/format/webp/'
                  alt='Avatar'
                />
                <b>Bender Rodriguez</b>
                <span>+506</span>
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
    </div>
  )
}
