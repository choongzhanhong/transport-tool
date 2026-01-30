import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<h1>Transport Tool</h1>
		<hr></hr>
		<App />
		
		<hr></hr>
		<footer>A work in progress</footer>
	</StrictMode>,
)
