import { useState } from 'react'
import './App.css'
import ImageUpload from './ImageUpload';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Select file to upload</h1>
      <div>
        <ImageUpload />
      </div>
      
    </>
  )
}

export default App
