import React, { useEffect, useState } from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import Ajv from 'ajv';
import ace from 'brace';
const ajv = new Ajv({ allErrors: true, verbose: true });
// TODO: Ideally load this on demand
import 'brace/theme/monokai';
import 'brace/theme/github';
const themes = ['github', 'monokai', 'dracula'];

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        alias: {
          type: 'string'
        },
        components: {
          type: 'array'
        }
    },
    required: ['id', 'alias']
};

const Editor1 = ({ data, mode, onChange }) => {
  const [theme, setTheme] = useState(themes[1]);
  const saveJSON = () => {
    // save to localStorage
    localStorage.setItem("json", JSON.stringify(data));
  };
  console.log('theme', theme)
  useEffect(() => {
    // FIXME: theme change import not working
    async function loadTheme() {
      /* @vite-ignore */
      await import(`brace/theme/${theme}`);
    }
    // loadTheme();
  }, [theme])
  return (
    <>
      <Editor
        // This key is vital to re-rendering the editor on change
        key={`editor1-${mode}-${theme}`}
        value={data}
        onChange={(updatedJson) => {
          console.log(updatedJson);
          if(onChange) onChange(updatedJson);
        }}
        onError={(error) => console.table("error", error)}
        mode={mode}
        history
        theme={`ace/theme/${theme}`}
        allowedModes={Editor.modes.allValues}
        ajv={ajv}
        schema={schema}
        ace={ace}
      />
      <select onChange={e => setTheme(e.target.value)}>
        {themes.map(theme => (
          <option value={theme} key={theme}>{theme}</option>
        ))}
      </select>
      <br />
      <button onClick={saveJSON}>Save JSON</button>
    </>
  );
};

export default Editor1;
