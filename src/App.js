import React from 'react';
import  Header from "./components/Header"
import  Board from "./components/Board"
import './App.css';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from "react-dnd-touch-backend";
import MultiBackend, { TouchTransition, MouseTransition } from "react-dnd-multi-backend";

const CustomHTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition
      // by default, will dispatch a duplicate `mousedown` event when this backend is activated
    },
    {
      backend: TouchBackend,
      // Note that you can call your backends with options
      options: { enableMouseEvents: true },
      transition: TouchTransition,
      // will not dispatch a duplicate `touchstart` event when this backend is activated
      skipDispatchOnTransition: true
    }
  ]
};

function App() {
  
  return (
    <div className="App">
      <Header />
      <DndProvider backend={MultiBackend} options={CustomHTML5toTouch}>
        <Board />
      </DndProvider>
    </div>
  );
}

export default App;
