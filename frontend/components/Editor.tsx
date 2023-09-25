import React, { useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Quote from '@editorjs/quote'
import List from '@editorjs/list'

interface EditorProps {
  onChange: (blocks: OutputData['blocks']) => void
  initialBlocks?: OutputData['blocks']
}

const Editor: React.FC<EditorProps> = ({ onChange, initialBlocks }) => {
  const editorRef = useRef<EditorJS | null>(null)

  React.useEffect(() => {
    if (!editorRef.current?.isReady) {
      const editor = new EditorJS({
        holder: 'editor',
        minHeight: 0,

        data: {
          blocks: initialBlocks,
        },
        autofocus: true,
        placeholder: 'Введите текст вашей статьи',
        hideToolbar: false,
        tools: {
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered',
            },
          },
        },
        onChange: async () => {
          if (editorRef.current) {
            const savedData = await editorRef.current.save()
            onChange(savedData.blocks)
          }
        },
      })

      editorRef.current = editor
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
      }
    }
  }, [])

  return <div id='editor' ref={editorRef} />
}

export default Editor
