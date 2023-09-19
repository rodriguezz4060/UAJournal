import React, { CSSProperties } from 'react'
import { IconButton } from '@mui/material'
import CommentsIcon from '@mui/icons-material/ModeCommentOutlined'
import RepostIcon from '@mui/icons-material/RepeatOutlined'
import FavoriteIcon from '@mui/icons-material/BookmarkBorderOutlined'
import ShareIcon from '@mui/icons-material/FileUploadOutlined'

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
      <li>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </li>
    </ul>
  )
}
