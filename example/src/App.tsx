import React, { useState } from 'react';

import { CodeEditorEditable } from 'react-code-editor-editable';
import 'highlight.js/styles/dracula.css';

const App = () => {
  const [value, setValue] = useState('<div></div>');

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
  );
};

export default App;

/* interface ComponentNameProps {}

interface ComponentNameState {
  value: string;
}

class ComponentName extends React.Component<
  ComponentNameProps,
  ComponentNameState
> {
  constructor(props: ComponentNameProps) {
    super(props);
    this.state = { value: '<div></div>' };
  }

  handleChange = (value: string) => {
    this.setState({ value });
  };

  public render(): JSX.Element {
    return (
      <div className='center'>
        <CodeEditorEditable
          value={this.state.value}
          setValue={this.handleChange}
          editorStyle='nord'
          width='50vw'
          height='50vh'
          language='html'
          inlineNumbers
        />
      </div>
    );
  }
}

export default ComponentName;
 */
