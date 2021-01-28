# React code editor

![mockup](https://github.com/DanielPereod/react-code-editor-editable/blob/master/assets/mockup.gif)

## Functionalities

- 191 languages highlighting with [Highlight.js](https://highlightjs.org/).
- 97 themes/styles.
- Scrollable.
- Tab support.
- Optional line numbers on editor.


## Installation

`npm i react-code-editor-editable`
</br>
or
</br>
`yarn add react-code-editor-editable`


## Usage
```JSX
import React, { useState } from 'react'

import { CodeEditorEditable } from 'react-code-editor-editable'
import 'highlight.js/styles/dracula.css';

const App = () => {
  const [value, setValue] = useState('<div></div>')

  return (
    <div className='center'>
      <CodeEditorEditable
        value={value}
        setValue={setValue}
        width='50vw'
        height='50vh'
        language='html'
        inlineNumbers
      />
    </div>
  )
}

export default App
```

## Props

| Name          | Type                               | Description                                                                             | Required |
| ------------- | ---------------------------------- | --------------------------------------------------------------------------------------- | -------- |
| value         | _string_                           | String that contains the code written.                                                  | ✔️       |
| setValue      | _any_ | Function to that sets the the value field.                                              | ✔️       |
| width         | _string_                           | Code editor width.                                                                      | ❌       |
| height        | _string_                           | Code editor height.                                                                     | ❌       |
| padding       | _string_                           | Code editor padding.                                                                    | ❌       |
| borderRadius  | _string_                           | Code editor border radius.                                                              | ❌       |
| language      | _string_                           | See here [highlight.js](https://highlightjs.org/static/demo/) all languages supported . | ✔️       |
| inlineNumbers | _boolean_                          | Shows line numbers.                                                                     | ❌       |
| caretColor    | _string_                           | Changes the caret color.                                                                | ❌       |
| tabSize       | _number_                           | Number of spaces added when Tab is pressed.                                             | ❌       |


## Styles
<details>
<summary>Style names</summary>
</br>
<ul>
<li>a11y-dark</li>
<li>a11y-light</li>
<li>agate</li>
<li>an-old-hope</li>
<li>androidstudio</li>
<li>arduino-light</li>
<li>arta</li>
<li>ascetic</li>
<li>atelier-cave-dark</li>
<li>atelier-cave-light</li>
<li>atelier-dune-dark</li>
<li>atelier-dune-light</li>
<li>atelier-estuary-dark</li>
<li>atelier-estuary-light</li>
<li>atelier-forest-dark</li>
<li>atelier-forest-light</li>
<li>atelier-heath-dark</li>
<li>atelier-heath-light</li>
<li>atelier-lakeside-dark</li>
<li>atelier-lakeside-light</li>
<li>atelier-plateau-dark</li>
<li>atelier-plateau-light</li>
<li>atelier-savanna-dark</li>
<li>atelier-savanna-light</li>
<li>atelier-seaside-dark</li>
<li>atelier-seaside-light</li>
<li>atelier-sulphurpool-dark</li>
<li>atelier-sulphurpool-light</li>
<li>atom-one-dark-reasonable</li>
<li>atom-one-dark</li>
<li>atom-one-light</li>
<li>brown-paper</li>
<li>codepen-embed</li>
<li>color-brewer</li>
<li>darcula</li>
<li>dark</li>
<li>default</li>
<li>docco</li>
<li>dracula</li>
<li>far</li>
<li>foundation</li>
<li>github-gist</li>
<li>github</li>
<li>gml</li>
<li>googlecode</li>
<li>gradient-dark</li>
<li>gradient-light</li>
<li>grayscale</li>
<li>gruvbox-dark</li>
<li>gruvbox-light</li>
<li>hopscotch</li>
<li>hybrid</li>
<li>idea</li>
<li>ir-black</li>
<li>isbl-editor-dark</li>
<li>isbl-editor-light</li>
<li>kimbie.dark</li>
<li>kimbie.light</li>
<li>lightfair</li>
<li>lioshi</li>
<li>magula</li>
<li>mono-blue</li>
<li>monokai-sublime</li>
<li>monokai</li>
<li>night-owl</li>
<li>nnfx-dark</li>
<li>nnfx</li>
<li>nord</li>
<li>obsidian</li>
<li>ocean</li>
<li>paraiso-dark</li>
<li>paraiso-light</li>
<li>pojoaque</li>
<li>purebasic</li>
<li>qtcreator_dark</li>
<li>qtcreator_light</li>
<li>railscasts</li>
<li>rainbow</li>
<li>routeros</li>
<li>school-book</li>
<li>shades-of-purple</li>
<li>solarized-dark</li>
<li>solarized-light</li>
<li>srcery</li>
<li>stackoverflow-dark</li>
<li>stackoverflow-light</li>
<li>sunburst</li>
<li>tomorrow-night-blue</li>
<li>tomorrow-night-bright</li>
<li>tomorrow-night-eighties</li>
<li>tomorrow-night</li>
<li>tomorrow</li>
<li>vs</li>
<li>vs2015</li>
<li>xcode</li>
<li>xt256</li>
<li>zenburn</li>
</ul>
</details>
