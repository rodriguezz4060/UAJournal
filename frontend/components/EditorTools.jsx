import Code from '@editorjs/code'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'
import Paragraph from '@editorjs/paragraph'

export const EDITOR_TOOLS = {
  code: Code,
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a Header',
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  inlineCode: InlineCode,
  list: List,
  quote: Quote,
}
