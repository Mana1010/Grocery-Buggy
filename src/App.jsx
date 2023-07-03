import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GroceryBuggy from './GroceryBuggy'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GroceryBuggy/>
    </>
  )
}

export default App
