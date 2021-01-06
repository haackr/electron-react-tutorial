import "./App.css";
import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-dracula";
import styled from "styled-components";
const { ipcRenderer } = window.require("electron");

function App() {
  const [loadedFile, setLoadedFile] = useState("");
  const [directory, setDirectory] = useState("");

  useEffect(() => {
    ipcRenderer.on("new-file", (event, fileContent) => {
      console.log(fileContent);
      setLoadedFile(fileContent);
    });
  }, []);

  useEffect(() => {
    ipcRenderer.on("new-dir", (event, mdFiles, dir) => {
      setDirectory(dir);
    });
  });

  return (
    <div className="App">
      <Header>Journal</Header>
      <Split>
        <CodeWindow>
          <AceEditor
            mode="markdown"
            theme="dracula"
            onChange={(newContent) => {
              setLoadedFile(newContent);
            }}
            name="markdown_editor"
            value={loadedFile}
          />
        </CodeWindow>
        <RenderedWindow>
          <Markdown>{loadedFile}</Markdown>
        </RenderedWindow>
      </Split>
    </div>
  );
}

export default App;

const Header = styled.header`
  background-color: #191324;
  color: #75717c;
  font-size: 0.8rem;
  height: 23px;
  text-align: center;
  position: fixed;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  -webkit-app-region: drag;
`;

const Split = styled.div`
  display: flex;
  height: 100vh;
`;

const CodeWindow = styled.div`
  flex: 1;
  padding-top: 2rem;
  background-color: #191324;
`;

const RenderedWindow = styled.div`
  background-color: #191324;
  width: 35%;
  padding: 20px;
  color: #fff;
  border-left: 1px solid #302b3a;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #82d8d8;
  }
  h1 {
    border-bottom: solid 3px #e54b4b;
    padding-bottom: 3px;
  }
  a {
    color: #e54b4b;
  }
`;
