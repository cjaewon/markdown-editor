import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditorPanesContainer from './container/write/EditorPanesContainer';
  
function App() {
  return (
    <div className="App">
      <EditorPanesContainer></EditorPanesContainer>
      <ToastContainer />
    </div>
  );
}

export default App;
