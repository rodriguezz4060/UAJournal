import React, { CSSProperties } from 'react'
import { IconButton } from '@material-ui/core'
import CommentsIcon from '@material-ui/icons/ModeCommentOutlined'
import RepostIcon from '@material-ui/icons/RepeatOutlined'
import FavoriteIcon from '@material-ui/icons/BookmarkBorderOutlined'

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  listStyle: 'none',
  padding: '0',
  margin: '0',
  position: 'relative',
  top: '5',
}

export const PostActions: React.FC = () => {
  return (
    <ul style={styles}>
      <li>
        <IconButton>
          <CommentsIcon />
        </IconButton>
      </li>
      <li>
        <IconButton>
          <RepostIcon />
        </IconButton>
      </li>
      <li>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </li>
    </ul>
  )
}
