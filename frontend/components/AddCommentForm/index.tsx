import React from 'react'
import styles from './AddCommentForm.module.scss'
import { Api } from '../../utils/api'
import { CommentItem } from '../../utils/api/types'
import { Button, Input } from '@material-ui/core'

interface AddCommentFormProps {
  postId: number
  onSuccessAdd: (obj: CommentItem) => void
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, onSuccessAdd }) => {
  const [clicked, setClicked] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [text, setText] = React.useState('')

  const onAddComment = async () => {
    try {
      setLoading(true)
      const comment = await Api().comment.create({
        postId,
        text,
      })
      onSuccessAdd(comment)
      setClicked(false)
      setText('')
    } catch (err) {
      console.warn('Add comment', err)
      alert('Ошибка при отправке комментария')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.form}>
      <Input
        disabled={isLoading}
        onChange={e => setText(e.target.value)}
        value={text}
        onFocus={() => setClicked(true)}
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        placeholder='Написать комментарий...'
        fullWidth
        multiline
      />
      {clicked && (
        <Button
          disabled={isLoading}
          onClick={onAddComment}
          className={styles.addButton}
          variant='contained'
          color='primary'
        >
          Опубликовать
        </Button>
      )}
    </div>
  )
}
