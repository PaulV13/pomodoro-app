import useModeContext from './hooks/useModeContext'
import { Route, Routes } from 'react-router-dom'
import { Stack, Container } from '@chakra-ui/react'
import Home from './pages/Home/Home'
import History from './pages/History/History'

function App() {
	const { mode } = useModeContext()

	return (
		<Stack
			background={
				mode.mode === 'modeWork'
					? 'bgWork'
					: mode.mode === 'modeBreak'
					? 'bgBreak'
					: 'bgLongBreak'
			}
			minHeight='100vh'
			display='flex'
			flexDirection='column'
			justifyContent='space-between'
		>
			<Container maxW='container.lg' padding='30px' minHeight='100vh'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='history' element={<History />} />
				</Routes>
			</Container>
		</Stack>
	)
}

export default App
