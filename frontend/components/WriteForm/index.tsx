import React from 'react'
import { Input } from '@material-ui/core'
import styles from './WriteForm.module.scss'
import EditorJS from '@editorjs/editorjs'

interface WriteFormProps {
  title?: string
}

export const WriteForm: React.FC<WriteFormProps> = ({ title }) => {
  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
    })
  }, [])
  return (
    <div>
      <Input classes={{ root: styles.titleField }} placeholder='Заголовок' defaultValue={title} />
      <div id='editor' />
    </div>
  )
}
