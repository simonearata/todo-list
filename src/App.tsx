import React from "react";
import "./App.css";
import Board from "./components/board";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Board name="ToDoList" />
    </div>
  );
}

export default App;
