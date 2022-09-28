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
  placeholder?: string;
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
  inlineNumbers = true,
  placeholder = '\n\n'
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
    setValue((e.target as HTMLInputElement).value.replace(/\u200b$/, ''));
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
    const myField = e.currentTarget;
    var myValue = myField.value.replace(/\u200b$/, '');
    const tab = '                                '.substring(0, tabSize);
    if (e.key == 'Backspace' && myField.value.match(/\n\u200b$/)) {
      e.preventDefault();
      setValue(myValue.replace(/\n$/, ''));
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myValue.substring(0, myField.selectionStart).lastIndexOf('\n') + 1;
        if (myField.selectionStart != myField.selectionEnd) {
          let selection = myField.value.substr(myField.selectionStart, myField.selectionEnd);
          const endPos = myField.selectionEnd - (selection.match(/\n$/) ? 1 : 0) - (selection.match(/\n\u200b$/) ? 2 : 0);
          const before = myValue.substring(0, startPos);
          const after = myValue.substring(endPos);
          selection = myValue.substring(startPos, endPos);
          if (e.shiftKey) {
            const spaces = selection.match(/^ +/);
            const newValue = before + selection.replace(RegExp('^' + tab, 'mg'), '') + after;
            setCaretPos({
              start: Math.min(myField.selectionStart, before.length + (spaces ? spaces[0].length - tabSize : 0)),
              end: myField.selectionEnd + newValue.length - myValue.length
            });
            setValue(newValue);
          } else {
            const newValue = selection.replace(/^/mg, tab);
              setCaretPos({
                start: startPos,
                end: myField.selectionEnd + newValue.length - selection.length
              });
            setValue(before + newValue + after);
          }
        } else {
          const before = myValue.substring(0, startPos);
          const after = myValue.substring(startPos);
          if (e.shiftKey) {
            if (after.match(RegExp('^' + tab))) {
              setValue(before + after.substring(tabSize));
              setCaretPos({
                start: Math.max(startPos, myField.selectionStart - tabSize),
                end: Math.max(startPos, myField.selectionStart - tabSize)
              });
            } else {
              setCaretPos({
                start: myField.selectionStart,
                end: myField.selectionStart
              });
            }
          } else {
            setCaretPos({
              start: myField.selectionStart + tabSize,
              end: myField.selectionStart + tabSize
            });
            if (!myValue.substring(startPos, myField.selectionStart).match(/[^ ]/)) {
              setValue(before + tab + after);
            } else {
              setValue(myValue.substring(0, myField.selectionStart) + tab + myValue.substring(myField.selectionStart))
            }
          }
        }
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
          placeholder={placeholder}
        >{`${value.replace(/\n$/, '\n\u200b')}`}</code>
        <textarea
          value={value.replace(/\n$/, '\n\u200b')}
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
