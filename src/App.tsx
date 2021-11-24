import React from "react";
import "./App.css";
import Board from "./components/board";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoryProvider from "./providers/category-provider";
import NoteProvider from "./providers/note-provider";

function App() {
  return (
    <div className="App">
      <NoteProvider>
        <CategoryProvider>
          <Board name="ToDoList" />
        </CategoryProvider>
      </NoteProvider>
    </div>
  );
}

export default App;
