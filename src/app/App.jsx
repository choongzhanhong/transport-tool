import { useState } from 'react'
import Calendar from "../components/Calendar/Calendar";

function App() {
    const [count, setCount] = useState(0)

  return (
    <>
    <br></br>
	
	<Calendar year={2026} month={0}></Calendar>
	
	<br></br>
    <div className="card">
    <button onClick={() => setCount((count) => count + 1)}>
		count is {count}
    </button>
    <p>
		Edit <code>src/App.jsx</code> and save to test HMR
    </p>
	</div>
	<p className="read-the-docs">
		Click on the Vite and React logos to learn more
	</p>
    </>
  )
}

export default App
