import React from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import { useRef } from 'react'

interface EditorProps {
  onChange: (blocks: OutputData['blocks']) => void
  initialBlocks?: OutputData['blocks']
}

const Editor: React.FC<EditorProps> = ({ onChange, initialBlocks }) => {
  const ref = useRef<null | EditorJS>(null)
  React.useEffect(() => {
    if (!ref.current?.isReady) {
      const editor = new EditorJS({
        holder: 'editor',
        data: {
          blocks: initialBlocks,
        },
        placeholder: 'Введите текст вашей статьи',
        hideToolbar: false,
        async onChange() {
          const { blocks } = await editor.save()
          onChange(blocks)
        },
      })
      ref.current = editor
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])
  return <div id={'editor'} ref={ref} />
}

export default Editor
