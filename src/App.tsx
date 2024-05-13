import { useEffect, useState } from "react";
import Editor1 from "./Editor";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import * as Diff from 'diff';

const defaultJSONData = {
    name: 'John',
    age: 30,
    city: 'New York'
  };
const _temp = localStorage.getItem("json");
const localStorageValue = _temp && JSON.parse(_temp);
const initialJSONData = localStorageValue || defaultJSONData;

const mode = 'code';

const newStyles = {
    variables: {
      light: {
        codeFoldGutterBackground: "#6F767E",
        codeFoldBackground: "#E2E4E5",
      },
    },
  };

function App() {
  const [jsonData, setJsonData] = useState(initialJSONData);
  const [showDiff, setShowDiff] = useState(false);

  useEffect(() => {
    const diff = Diff.diffWords(JSON.stringify(initialJSONData, undefined, 4), JSON.stringify(jsonData, undefined, 4))
    console.log('diff', diff);
    // .forEach(part => {
    //   console.log(part);
    // })
  }, [initialJSONData, jsonData])

  const toggleDiff = () => {
    setShowDiff(!showDiff);
  }
  return (
   <main>
    <h1>Welcome to JSON editor</h1>
    <Editor1 data={jsonData} mode={mode} onChange={newJsonData => setJsonData(newJsonData)}/>
    <br />
    <button onClick={toggleDiff}>{`${showDiff ? 'Hide' : 'Show'} diff`} </button>
    <br />
     {showDiff && <ReactDiffViewer
        oldValue={JSON.stringify(initialJSONData, undefined, 4)}
        newValue={JSON.stringify(jsonData, undefined, 4)}
        splitView={true}
        compareMethod={DiffMethod.WORDS}
        styles={newStyles}
        leftTitle="Version A"
        rightTitle="Version B"
        hideLineNumbers={false}
        showDiffOnly={true}
        // renderContent={highlightSyntax}
      />}
   </main>
  )
}

export default App
