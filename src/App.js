import React from 'react';
import  Header from "./components/Header"
import  Board from "./components/Board"
import './App.css';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

function App() {
  const onDragEnd = (result)=>{
    // console.log(result)
  }

  return (
    <div className="App">
      <Header />
      <DndProvider backend={Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}

export default App;
