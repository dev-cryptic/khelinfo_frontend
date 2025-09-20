import { useState } from 'react'
import './App.css'
import { database } from "./firebase";
import "./i18n";
import { Analytics } from '@vercel/analytics/react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Analytics />
    </>
  )
}

export default App
