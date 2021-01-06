import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
const { ipcRenderer } = window.require("electron");

function App() {
  const [loadedFile, setLoadedFile] = useState("");

  useEffect(() => {
    ipcRenderer.on("new file", (event, fileContent) => {
      console.log(fileContent);
      setLoadedFile(fileContent);
    });
  }, []);

  return (
    <div className="App">
      <Markdown>{loadedFile}</Markdown>
    </div>
  );
}

export default App;
