import { Link as RouterLink } from 'react-router-dom'
import useModeContext from '../../hooks/useModeContext'
import Pomodoro from '../../components/Pomodoro/Pomodoro'
import TimerSetting from '../../components/TimerSetting/TimerSetting'
import { Box, Button, Flex, Text, Link } from '@chakra-ui/react'
import { BsClockHistory } from 'react-icons/bs'

function Home() {
	const { mode } = useModeContext()

	return (
		<Box>
			<Flex justifyContent='space-around'>
				<Text
					textAlign='center'
					color='brand.900'
					fontSize='32px'
					fontWeight='bold'
				>
					Pomodoro
				</Text>
				<TimerSetting />
			</Flex>
			<Text
				textAlign='center'
				color='brand.900'
				fontSize='20px'
				fontWeight='bold'
			>
				{mode.mode === 'modeWork'
					? 'Work'
					: mode.mode === 'modeBreak'
					? 'Break'
					: 'Long Break'}
			</Text>
			<Text
				textAlign='center'
				color='brand.900'
				fontSize='20px'
				fontWeight='bold'
			>
				{mode.count}
			</Text>
			<Pomodoro />
			<Link as={RouterLink} to='/history' color='brand.900'>
				<Button
					leftIcon={<BsClockHistory />}
					color='brand.900'
					variant='link'
					_focus={{
						boxShadow: 'none',
					}}
				>
					History
				</Button>
			</Link>
		</Box>
	)
}

export default Home
