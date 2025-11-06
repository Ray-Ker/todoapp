import { Fragment, useState } from 'react'
import './App.css'
import Todoapp from "./components/Todoapp.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
      <Todoapp />
  )
}

export default App