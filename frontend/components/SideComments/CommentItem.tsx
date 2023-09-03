import React from 'react'
import styles from './SideComments.module.scss'
import Link from 'next/link'

interface CommentItemProps {
  user: {
    id: number
    fullname: string
  }
  text: string
  post: {
    id: number
    title: string
  }
}

export const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <img
          src='https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/'
          alt='Avatar'
        />
        <Link href={`/profile/${user.id}`}>
          <b>{user.fullname}</b>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>
      <Link href={`/news/${post.id}`}>
        <span className={styles.postTitle}>{post.title}</span>
      </Link>
    </div>
  )
}
