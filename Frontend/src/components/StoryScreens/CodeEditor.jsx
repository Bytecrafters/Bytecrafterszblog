import React, { useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const CodeEditor = ({ code, onChange }) => {
  const editorRef = useRef(null);

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <div>
      <CodeMirror
        value={code}
        onBeforeChange={handleChange}
        editorDidMount={(editor) => {
          editorRef.current = editor;
        }}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
        }}
      />

    </div>
  );
};

export default CodeEditor;
