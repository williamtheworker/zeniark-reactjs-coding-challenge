import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/home'
import QuizPage from './pages/quiz'
import ResultsPage from './pages/results'

import './styles/main.scss'

function App() {

  return (
    <BrowserRouter>
      <div className="App" style={{
        backgroundImage: `url(${'/images/bg.png'})`
      }}>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<QuizPage />} path="/quiz" />
          <Route element={<ResultsPage/>} path="/results" />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
