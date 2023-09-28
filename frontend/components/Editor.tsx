import React, { useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Quote from '@editorjs/quote'
import List from '@editorjs/list'
import IncutTool from './EditorTools/incut'
import ImageTool from '@editorjs/image'
import axios from 'axios'

const Paragraph = require('@editorjs/paragraph')
const CodeTool = require('@editorjs/code')

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
          incut: {
            class: IncutTool,
            config: {
              placeholder: 'Текст вырезки',
            },
          },
          code: {
            class: CodeTool,
            config: {
              placeholder: 'Код',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: async file => {
                  // Отправка файла на сервер
                  const formData = new FormData()
                  formData.append('file', file)

                  const response = await fetch('http://localhost:7777/aws', {
                    method: 'POST',
                    body: formData,
                  })

                  if (response.ok) {
                    // Получение URL загруженного изображения
                    const data = await response.json()
                    return {
                      success: 1,
                      file: {
                        url: data.url,
                      },
                    }
                  } else {
                    console.error('Ошибка при загрузке изображения')
                    return {
                      success: 0,
                    }
                  }
                },
              },
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
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

        i18n: {
          messages: {
            toolNames: {
              Code: 'Код',
              Incut: 'Вырезка',
            },
            tools: {
              // Section for passing translations to the external tools classes
              // The first-level keys of this object should be equal of keys ot the 'tools' property of EditorConfig
            },
            blockTunes: {
              // Section allows to translate Block Tunes
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
