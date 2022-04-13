import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Stack, Container } from '@chakra-ui/react'
import Home from './pages/Home/Home.jsx'
import History from './pages/History/History.jsx'

function App() {
	const [mode, setMode] = useState('modeWork')

	return (
		<Stack
			className={mode}
			minHeight='100vh'
			display='flex'
			flexDirection='column'
			justifyContent='space-between'
		>
			<Container maxW='container.lg' padding='30px' minHeight='100vh'>
				<Routes>
					<Route path='/' element={<Home setMode={setMode} mode={mode} />} />
					<Route path='history' element={<History />} />
				</Routes>
			</Container>
		</Stack>
	)
}

export default App
