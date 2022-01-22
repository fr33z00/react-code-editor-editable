import { highlightBlock } from 'highlight.js';
import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
require('./index.css');

interface CodeEditorProps {
  value: string;
  setValue: any;
  width?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;
  language: 'html' | 'js' | 'css' | string;
  inlineNumbers?: boolean;
  caretColor?: string;
  tabSize?: 1 | 2 | 3 | 4 | 5 | 6;
}

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
  inlineNumbers = true
}: CodeEditorProps): ReactElement => {
  const [lineNumbers, setLineNumbers] = useState(['']);
  const [caretPos, setCaretPos] = useState({start: -1, end: -1});

  const codeBlockRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const countLines = (codeString: string): string[] => {
    return codeString?.split(/\r*\n/);
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    const eventTarget = e.target as Element;
    if (codeBlockRef.current) {
      codeBlockRef.current.scroll(
        eventTarget.scrollLeft,
        eventTarget.scrollTop
      );
      if (inlineNumbers && lineNumbersRef.current) {
        lineNumbersRef.current.scroll(
          eventTarget.scrollLeft,
          eventTarget.scrollTop
        );
      }
    }
  };
  const handleChange = (e: ChangeEvent): void => {
    setValue((e.target as HTMLInputElement).value);
  };

  const setCaretPosition = (ctrl: HTMLTextAreaElement, start: number, end: number): void => {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(start, end);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if ((ctrl as any).createTextRange) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const range = (ctrl as any).createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
    ctrl.selectionStart = start;
    ctrl.selectionEnd = end;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
  var handleKeyDown = function handleKeyDown(e) {
    const myField = textAreaRef.current;
    const myValue = '                                '.substring(0, tabSize);
    if (e.key === 'Tab') {
      e.preventDefault();
      if (myField?.selectionStart || myField?.selectionStart === 0) {
        const startPos = myField.value.substring(0, myField.selectionStart).lastIndexOf('\n') + 1
        const endPos = myField.selectionEnd -
          (myField.selectionStart != myField.selectionEnd && myField.value[myField.selectionEnd-1] == '\n');
        const before = myField.value.substring(0, startPos);
        const selection = myField.value.substring(startPos, endPos);
        const after = myField.value.substring(endPos);
        let newValue;
        if (endPos != startPos) {
          if (e.shiftKey) {
            const r = RegExp('\n' + myValue, 'mg');
            newValue = before +
              selection.substring(selection.substring(0, myValue.length) == myValue ? myValue.length : 0)
                .replace(r, '\n') +
              after;
          }
          else {
            newValue = before + myValue + selection.replace(/\n/mg, '\n' + myValue) + after;
          }
          setCaretPos({start: startPos, end: newValue.length - after.length});
        }
        else if (e.shiftKey) {
          if (myField.value.substring(endPos, endPos + myValue.length) == myValue) {
            newValue = myField.value.substring(0, startPos) + myField.value.substring(endPos + myValue.length);
            setCaretPos({start: startPos, end: startPos});
          }
        }
        else {
          setCaretPos({start: startPos + myValue.length, end: startPos + myValue.length});
          newValue = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos);
        }
        setValue(newValue);
      }
    }
  };

  useLayoutEffect(() => {
    if (caretPos.start !== -1 && textAreaRef.current) {
      setCaretPosition(textAreaRef.current, caretPos.start, caretPos.end);
      setCaretPos({start: -1, end: -1});
    }
  }, [caretPos]);

  useEffect(() => {
    if (codeBlockRef.current) {
      highlightBlock(codeBlockRef.current);
      setLineNumbers(countLines(value));
    }
  }, [value]);

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
          onKeyDown={handleKeyDown}
          style={{
            msScrollbarBaseColor: 'violet',
            scrollbarWidth: 'thin',
            caretColor: caretColor
          }}
        />
      </pre>
    </div>
  );
};
