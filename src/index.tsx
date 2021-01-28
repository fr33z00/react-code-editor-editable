import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { highlightBlock } from 'highlight.js'
import { CodeEditorProps } from './types/CodeEditor'
require('./index.css')

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

  const codeBlockRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const countLines = (codeString: string): string[] => {
    return codeString?.split(/\r*\n/)
  }

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    const eventTarget = e.target as Element
    if (codeBlockRef.current) {
      codeBlockRef.current.scroll(eventTarget.scrollLeft, eventTarget.scrollTop)
      if (inlineNumbers && lineNumbersRef.current) {
        lineNumbersRef.current.scroll(
          eventTarget.scrollLeft,
          eventTarget.scrollTop
        )
      }
    }
  }
  const handleChange = (e: ChangeEvent): void => {
    setValue((e.target as HTMLInputElement).value)
  }

  const setCaretPosition = (ctrl: HTMLTextAreaElement, pos: number): void => {
    if (ctrl.setSelectionRange) {
      ctrl.focus()
      ctrl.setSelectionRange(pos, pos)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if ((ctrl as any).createTextRange) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const range = (ctrl as any).createTextRange()
      range.collapse(true)
      range.moveEnd('character', pos)
      range.moveStart('character', pos)
      range.select()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const myField = textAreaRef.current
    const myValue = Math.random()
      .toString(32)
      .substring(0, tabSize)
      .replace(/./g, ' ')

    if (e.key === 'Tab') {
      e.preventDefault()
      if (myField?.selectionStart || myField?.selectionStart === 0) {
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
    require(`../node_modules/highlight.js/styles/${editorStyle}.css`)
  }, [editorStyle])

  useLayoutEffect(() => {
    if (caretPos !== 0 && textAreaRef.current) {
      setCaretPosition(textAreaRef.current, caretPos)
      setCaretPos(0)
    }
  }, [caretPos])

  useEffect(() => {
    if (codeBlockRef.current) {
      highlightBlock(codeBlockRef.current)
      setLineNumbers(countLines(value))
    }
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
