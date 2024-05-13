import React from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

const Editor1 = ({ data, mode, onChange }) => {
  const saveJSON = () => {
    // save to localStorage
    localStorage.setItem("json", JSON.stringify(data));
  };
  return (
    <>
      <Editor
        key={`editor1-${mode}`}
        value={data}
        onChange={(updatedJson) => {
          console.log(updatedJson);
          if(onChange) onChange(updatedJson);
        }}
        mode={mode}
        history
        theme="ace/theme/github"
      />
      <button onClick={saveJSON}>Save JSON</button>
    </>
  );
};

export default Editor1;