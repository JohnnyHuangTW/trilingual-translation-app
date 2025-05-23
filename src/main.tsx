import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { scan } from 'react-scan'
import App from './App.tsx'
import './index.css'

import { TempoDevtools } from 'tempo-devtools'
TempoDevtools.init()

const basename = import.meta.env.BASE_URL

scan({
	enabled: process.env.NODE_ENV === 'development',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter basename={basename}>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
)
