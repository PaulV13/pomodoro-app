import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ModeContextProvider } from './contexts/ModeContext'
import { PomodoroContextProvider } from './contexts/PomodoroContext'
import theme from './theme.js'
import './index.css'
import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<ModeContextProvider>
					<PomodoroContextProvider>
						<App />
					</PomodoroContextProvider>
				</ModeContextProvider>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
