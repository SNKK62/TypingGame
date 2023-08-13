import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Test from './test';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
