import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Проверьте, что App.tsx лежит в этой же папке src
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)