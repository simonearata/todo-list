import React, { useState } from "react";
import "./App.css";
import Board from "./components/board";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryProvider from "./providers/category-provider";
import NoteProvider from "./providers/note-provider";

function App() {
  const [notePopupVisible, setNotePopupVisible] = useState<boolean>(false);
  const utils = { setNotePopupVisible };
  return (
    <div className="App">
      <NoteProvider /* utils={utils} */>
        <CategoryProvider>
          <Board name="ToDoList" />
        </CategoryProvider>
      </NoteProvider>
    </div>
  );
}

export default App;
