import {
	Text,
	CircularProgress,
	CircularProgressLabel,
	Box,
	Flex,
	Input,
	Link,
	Button,
	Alert,
	AlertIcon,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import alarma from '../../assets/telefono.mp3'
import apretarBoton from '../../assets/apretar-boton.mp3'
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.jsx'
import './Pomodoro.css'
import { BsClockHistory } from 'react-icons/bs'

import TimerSetting from '../TimerSetting/TimerSetting'

const Pomodoro = ({ mode, setMode }) => {
	const [pomodoro, setPomodoro] = useState()
	const [shortBreak, setShortBreak] = useState()
	const [longBreak, setLongBreak] = useState()
	const [maxPomodoro, setMaxPomodoro] = useState()
	const [maxShortBreak, setMaxShortBreak] = useState()
	const [maxLongBreak, setMaxLongBreak] = useState()
	const [starting, setStarting] = useState(false)
	const [status, setStatus] = useState('Work')
	const [intervalIdPomodoro, setIntervalIdPomodoro] = useState(null)
	const [intervalIdShort, setIntervalIdShort] = useState(null)
	const [intervalIdLong, setIntervalIdLong] = useState(null)
	const [count, setCount] = useState(1)
	const [restart, setRestart] = useState(false)
	const [task, setTask] = useState('')
	const [tasks, setTasks] = useState([])
	const [time, setTime] = useState(0)
	const [dateStart, setDateStart] = useState()
	const [disableStop, setDisableStop] = useState(true)
	const [disableInput, setDisableInput] = useState()
	const [message, setMessage] = useState('')
	const [volume, setVolume] = useState()

	useEffect(() => {
		setMode('modeWork')
		const localTasks = JSON.parse(window.localStorage.getItem('tasks'))
		const localStoragePomodoro = window.localStorage.getItem('pomodoro')
		const localStorageShortBreak = window.localStorage.getItem('shortBreak')
		const localStorageLongBreak = window.localStorage.getItem('longBreak')
		const localStorageVolume = window.localStorage.getItem('volume')

		if (localTasks !== null) {
			setTasks(localTasks)
		}

		if (localStoragePomodoro !== null) {
			setPomodoro(parseInt(localStoragePomodoro) * 60)
			setMaxPomodoro(parseInt(localStoragePomodoro) * 60)
			setShortBreak(parseInt(localStorageShortBreak) * 60)
			setMaxShortBreak(parseInt(localStorageShortBreak) * 60)
			setLongBreak(parseInt(localStorageLongBreak) * 60)
			setMaxLongBreak(parseInt(localStorageLongBreak) * 60)
			setVolume(parseFloat(localStorageVolume))
		} else {
			setPomodoro(25 * 60)
			setMaxPomodoro(25 * 60)
			setShortBreak(5 * 60)
			setMaxShortBreak(5 * 60)
			setLongBreak(15 * 60)
			setMaxLongBreak(15 * 60)
			setVolume(20)
		}
	}, [])

	useEffect(() => {
		if (pomodoro === 0 || shortBreak === 0 || longBreak === 0) {
			playAlarma()
			handleNext()
		}
	}, [pomodoro, shortBreak, longBreak])

	useEffect(() => {
		window.localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const handleStartOrPause = () => {
		playStart()
		setDisableInput(true)
		setDisableStop(false)
		setStarting(!starting)

		if (!restart) {
			setRestart(true)
			setDateStart(new Date(Date.now()))
		}

		if (!starting) {
			if (status === 'Work') {
				const intervalId = setInterval(() => {
					setPomodoro(pomodoro => pomodoro - 1)
					setTime(time => time + 1)
				}, 1000)
				setIntervalIdPomodoro(intervalId)
				setShortBreak(maxShortBreak)
				setLongBreak(maxLongBreak)
			} else if (status === 'Break') {
				const intervalId = setInterval(() => {
					setShortBreak(shortBreak => shortBreak - 1)
					setTime(time => time + 1)
				}, 1000)
				setIntervalIdShort(intervalId)
				setPomodoro(maxPomodoro)
				setLongBreak(maxLongBreak)
			} else {
				const intervalId = setInterval(() => {
					setLongBreak(longBreak => longBreak - 1)
					setTime(time => time + 1)
				}, 1000)
				setIntervalIdLong(intervalId)
				setPomodoro(maxPomodoro)
				setShortBreak(maxShortBreak)
			}
		} else {
			setDisableInput(false)
			clearInterval(intervalIdPomodoro)
			clearInterval(intervalIdShort)
			clearInterval(intervalIdLong)
		}
	}

	const handleNext = () => {
		playStart()
		if (mode === 'modeBreak') {
			setMode('modeWork')
			setStatus('Work')
			setShortBreak(maxShortBreak)
			setCount(count => count + 1)
		}
		if (mode === 'modeWork') {
			setMode('modeBreak')
			setStatus('Break')
			setPomodoro(maxPomodoro)
			if (count % 4 === 0) {
				setMode('modeLongBreak')
				setStatus('Long break')
			}
		}
		if (mode === 'modeLongBreak') {
			setMode('modeWork')
			setStatus('Work')
			setLongBreak(maxLongBreak)
			setCount(count => count + 1)
		}
		if (starting) {
			if (mode === 'modeBreak') {
				const intervalId = setInterval(() => {
					setPomodoro(pomodoro => pomodoro - 1)
					setTime(time => time + 1)
				}, 1000)
				setIntervalIdPomodoro(intervalId)
				clearInterval(intervalIdShort)
			}

			if (mode === 'modeWork') {
				const intervalId = setInterval(() => {
					setShortBreak(shortBreak => shortBreak - 1)
					setTime(time => time + 1)
				}, 1000)
				setIntervalIdShort(intervalId)
				clearInterval(intervalIdPomodoro)
				if (count % 4 === 0) {
					const intervalId = setInterval(() => {
						setLongBreak(longBreak => longBreak - 1)
						setTime(time => time + 1)
					}, 1000)
					setIntervalIdLong(intervalId)
				}
			}

			if (mode === 'modeLongBreak') {
				const intervalId = setInterval(() => {
					setPomodoro(pomodoro => pomodoro - 1)
					setTime(time => time + 1)
				}, 1000)
				setIntervalIdPomodoro(intervalId)
				clearInterval(intervalIdLong)
			}
		}
	}

	const handleStop = () => {
		playStart()
		setRestart(false)
		setDisableInput(false)
		setDisableStop(true)
		setPomodoro(maxPomodoro)
		setLongBreak(maxLongBreak)
		setShortBreak(maxShortBreak)
		setCount(1)
		clearInterval(intervalIdPomodoro)
		clearInterval(intervalIdShort)
		clearInterval(intervalIdLong)
		setStarting(false)
		const newTask = {
			dateStart: dateStart,
			dateFin: new Date(Date.now()),
			name: task,
			time,
		}
		setTasks(tasks => tasks.concat(newTask))
		setTask('')
		setTime(0)
		setMode('modeWork')
		setStatus('Work')
		setMessage('Task saved in the history!!!!')
		setTimeout(() => {
			setMessage('')
		}, 2000)
	}

	const segundosAMinutos = segundos => {
		let minute = Math.floor(segundos / 60)
		minute = minute < 10 ? '0' + minute : minute
		let second = segundos % 60
		second = second < 10 ? '0' + second : second
		return minute + ':' + second
	}

	const handleChangeTask = e => {
		setTask(e.target.value)
		if (status === 'Work') {
			setPomodoro(pomodoro)
			setTime(0)
		}
		if (status === 'Break') {
			setPomodoro(shortBreak)
			setTime(0)
		}
		if (status === 'Long break') {
			setPomodoro(longBreak)
			setTime(0)
		}
	}

	const playAlarma = () => {
		const audio = document.getElementById('alarma')
		audio.volume = volume / 100
		audio.play()
	}

	const playStart = () => {
		const audio = document.getElementById('playStart')
		audio.volume = volume / 100
		audio.play()
	}

	return (
		<>
			<Flex justifyContent='space-around'>
				<Text
					textAlign='center'
					color='brand.900'
					fontSize='32px'
					fontWeight='bold'
				>
					Pomodoro
				</Text>
				{pomodoro && (
					<TimerSetting
						pomodoro={pomodoro}
						shortBreak={shortBreak}
						longBreak={longBreak}
						setPomodoro={setPomodoro}
						setShortBreak={setShortBreak}
						setLongBreak={setLongBreak}
						setMaxPomodoro={setMaxPomodoro}
						setMaxShortBreak={setMaxShortBreak}
						setMaxLongBreak={setMaxLongBreak}
						setVolume={setVolume}
						volume={volume}
					/>
				)}
			</Flex>

			<Text
				textAlign='center'
				color='brand.900'
				fontSize='20px'
				fontWeight='bold'
			>
				{status}
			</Text>
			<Text
				textAlign='center'
				color='brand.900'
				fontSize='20px'
				fontWeight='bold'
			>
				{count}
			</Text>
			<Box textAlign='center'>
				<CircularProgress
					value={
						mode === 'modeWork'
							? pomodoro
							: mode === 'modeBreak'
							? shortBreak
							: longBreak
					}
					max={
						mode === 'modeWork'
							? maxPomodoro
							: mode === 'modeBreak'
							? maxShortBreak
							: maxLongBreak
					}
					size='190px'
					color={
						mode === 'modeWork'
							? '#8A0808'
							: mode === 'modeBreak'
							? '#086A87'
							: '#0431B4'
					}
					thickness='5px'
				>
					<CircularProgressLabel
						color='white'
						fontSize='48px'
						fontWeight='bold'
						fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
					>
						{status === 'Work'
							? segundosAMinutos(pomodoro)
							: status === 'Break'
							? segundosAMinutos(shortBreak)
							: segundosAMinutos(longBreak)}
					</CircularProgressLabel>
				</CircularProgress>
			</Box>
			<Flex
				direction={{ base: 'column', sm: 'row', md: 'row', lg: 'row' }}
				alignItems='center'
				justifyContent='center'
			>
				<ButtonCustom
					text={starting ? 'Pause' : 'Start'}
					onClick={handleStartOrPause}
					color={
						mode === 'modeWork'
							? '#d95550'
							: mode === 'modeBreak'
							? '#4c9195'
							: '#457ca3'
					}
					disabled={!task}
				/>
				<ButtonCustom
					text='Stop'
					onClick={handleStop}
					color={
						mode === 'modeWork'
							? '#d95550'
							: mode === 'modeBreak'
							? '#4c9195'
							: '#457ca3'
					}
					disabled={disableStop}
				/>
				<ButtonCustom
					text='Next'
					onClick={handleNext}
					color={
						mode === 'modeWork'
							? '#d95550'
							: mode === 'modeBreak'
							? '#4c9195'
							: '#457ca3'
					}
					disabled={false}
				/>
			</Flex>
			<Box textAlign='center'>
				<Input
					w='50%'
					onChange={handleChangeTask}
					value={task}
					disabled={disableInput}
					placeholder='Write a task...'
					_placeholder={{ color: 'brand.900' }}
					color='brand.900'
					mt={4}
				/>
			</Box>
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
			<Flex justifyContent='center' mt={8}>
				{message && (
					<Alert
						colorScheme='brand.900'
						status='success'
						w='350px'
						borderRadius='4px'
						color='white'
					>
						<AlertIcon />
						{message}
					</Alert>
				)}
			</Flex>

			<audio id='alarma' src={alarma} />
			<audio id='playStart' src={apretarBoton} />
		</>
	)
}

export default Pomodoro
