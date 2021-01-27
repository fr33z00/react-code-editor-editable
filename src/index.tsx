import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { highlightBlock } from 'highlight.js'
import './scss/CodeEditor.scss'
import { CodeEditorProps } from './types/CodeEditor'

export const CodeEditorEditable = ({
  width = '500px',
  height = '500px',
  padding = '0',
  borderRadius = '0',
  value,
  setValue,
  language,
  caretColor = 'red',
  tabSize = 2,
  inlineNumbers = true,
  editorStyle = 'atelier-dune-light'
}: CodeEditorProps): ReactElement => {
  const [lineNumbers, setLineNumbers] = useState([''])
  const [caretPos, setCaretPos] = useState(0)

  const codeBlockRef = useRef<any>(null)
  const textAreaRef = useRef<any>(null)
  const lineNumbersRef = useRef<any>(null)

  const countLines = (codeString: string): string[] => {
    return codeString?.split(/\r*\n/)
  }

  const handleScroll = (e: any) => {
    codeBlockRef.current!.scroll(e.target.scrollLeft, e.target.scrollTop)
    if (inlineNumbers) {
      lineNumbersRef.current!.scroll(e.target.scrollLeft, e.target.scrollTop)
    }
  }
  const handleChange = (e: ChangeEvent) => {
    setValue((e.target as HTMLInputElement).value)
  }

  const setCaretPosition = (ctrl: any, pos: any) => {
    if (ctrl.setSelectionRange) {
      ctrl.focus()
      ctrl.setSelectionRange(pos, pos)
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange()
      range.collapse(true)
      range.moveEnd('character', pos)
      range.moveStart('character', pos)
      range.select()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const myField = textAreaRef.current
    const myValue = Math.random()
      .toString(32)
      .substring(0, tabSize)
      .replace(/./g, ' ')

    if (e.key === 'Tab') {
      e.preventDefault()
      if (myField.selectionStart || myField.selectionStart === '0') {
        const startPos = myField.selectionStart
        const endPos = myField.selectionEnd
        setCaretPos(startPos + myValue.length)

        const newValue =
          myField.value.substring(0, startPos) +
          myValue +
          myField.value.substring(endPos, myField.value.length)

        setValue(newValue)
      }
    }
  }

  useEffect(() => {
    require(`./scss/styles/${editorStyle}.css`)
  }, [editorStyle])

  useLayoutEffect(() => {
    if (caretPos !== 0) {
      setCaretPosition(textAreaRef.current, caretPos)
      setCaretPos(0)
    }
  }, [caretPos])

  useEffect(() => {
    highlightBlock(codeBlockRef.current)
    setLineNumbers(countLines(value))
  }, [value])

  return (
    <div
      className='hljs container-code-editor__qxcy'
      style={{ width, height, padding, borderRadius }}
    >
      {inlineNumbers && (
        <div className='hljs line-numbers__qxcy' ref={lineNumbersRef}>
          {lineNumbers?.map((__val, key) => (
            <div className='line-numbers__number__qxcy' key={key}>
              {key + 1}
            </div>
          ))}
        </div>
      )}
      <pre className='code-editor__qxcy'>
        <code
          ref={codeBlockRef}
          className={`code-editor__hlcode__qxcy language-${language}`}
        >
          {`${value}\n\r`}
        </code>
        <textarea
          value={value}
          spellCheck='false'
          ref={textAreaRef}
          className='hljs code-editor__textarea__qxcy'
          onScroll={handleScroll}
          onChange={handleChange}
          maxLength={3000}
          onKeyDown={handleKeyDown}
          style={{
            msScrollbarBaseColor: 'violet',
            scrollbarWidth: 'thin',
            caretColor: caretColor
          }}
        />
      </pre>
    </div>
  )
}
