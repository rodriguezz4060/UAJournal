import React from 'react'
import styles from './PostComments.module.scss'
import { Divider, Paper, Typography, Tabs, Tab } from '@material-ui/core'
import { Comment } from '../Comment/'
import { AddCommentForm } from '../AddCommentForm'
import { Api } from '../../utils/api'
import { CommentItem } from '../../utils/api/types'
import { useAppSelector } from '../../redux/hooks'
import { selectUserData } from '../../redux/slices/user'
import { useComments } from '../../hooks/useComments'

interface PostCommentsProps {
  postId: number
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const userData = useAppSelector(selectUserData)
  const [activeTab, setActiveTab] = React.useState(0)
  const { comments, setComments } = useComments(postId)

  React.useEffect(() => {
    ;(async () => {
      try {
        const arr = await Api().comment.getAll(postId)
        setComments(arr)
      } catch (err) {
        console.warn('Fetch comments', err)
      }
    })()
  }, [])

  const onAddComment = (obj: CommentItem) => {
    setComments(prev => [...prev, obj])
  }

  const onRemoveComment = (id: number) => {
    setComments(prev => prev.filter(obj => obj.id !== id))
  }

  return (
    <Paper elevation={0} className='mt-40 p-30'>
      <div className='container'>
        <Typography variant='h6' className='mb-20'>
          266 комментариев
        </Typography>
        <Tabs
          onChange={(_, newValue) => setActiveTab(newValue)}
          className='mt-20'
          value={activeTab}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label='Популярные' />
          <Tab label='По порядку' />
        </Tabs>
        <Divider />
        {userData && <AddCommentForm onSuccessAdd={onAddComment} postId={postId} />}
        <div className='mb-20' />
        {comments.map(obj => (
          <Comment
            key={obj.id}
            id={obj.id}
            user={obj.user}
            text={obj.text}
            createdAt={obj.createdAt}
            currentUserId={userData?.id}
            onRemove={onRemoveComment}
          />
        ))}
      </div>
    </Paper>
  )
}
