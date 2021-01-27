import React, { useState } from 'react'

import { CodeEditorEditable } from 'react-code-editor-editable'
import 'react-code-editor-editable/dist/index.css'

const App = () => {
  const [value, setValue] = useState('<div></div>')

  return (
    <div className='center'>
      <CodeEditorEditable
        value={value}
        setValue={setValue}
        editorStyle='nord'
        width='50vw'
        height='50vh'
        language='html'
        inlineNumbers
      />
    </div>
  )
}

export default App
