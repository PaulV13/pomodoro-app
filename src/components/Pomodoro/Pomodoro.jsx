import { useState, useEffect, useCallback, useRef } from 'react'
import { Box, Flex, HStack, Text, useToast } from '@chakra-ui/react'
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom.jsx'
import useModeContext from '../../hooks/useModeContext'
import CircularProgressCustom from '../CircularProgressCustom/CircularProgressCustom'
import FormPomodoro from '../FormPomodoro/FormPomodoro'
import usePomodoroContext from '../../hooks/usePomodoroContext'
import usePomodoro from '../../hooks/usePomodoro.js'
import useTask from '../../hooks/useTask.js'
import { MdTaskAlt } from 'react-icons/md'

const Pomodoro = () => {
	const { pomodoroTime } = usePomodoroContext()
	const { mode, toggleMode, resetMode } = useModeContext()
	const [pomodoro, setPomodoro] = useState(pomodoroTime.maxPomodoro)
	const [shortBreak, setShortBreak] = useState(pomodoroTime.maxShortBreak)
	const [longBreak, setLongBreak] = useState(pomodoroTime.maxLongBreak)
	const [task, setTask] = useState('')
	const {
		startPomodoro,
		pausePomodoro,
		focusForm,
		stopPomodoro,
		pomodoroSetting,
		submitForm,
	} = usePomodoro()
	const { tasks, addTask } = useTask()
	const toast = useToast()
	const [starting, setStarting] = useState(false)
	const dateStart = useRef(null)
	const time = useRef(0)
	const restart = useRef(false)

	useEffect(() => {
		setPomodoro(pomodoroTime.maxPomodoro)
		setShortBreak(pomodoroTime.maxShortBreak)
		setLongBreak(pomodoroTime.maxLongBreak)
	}, [
		pomodoroTime.maxLongBreak,
		pomodoroTime.maxPomodoro,
		pomodoroTime.maxShortBreak,
	])

	useEffect(() => {
		window.localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (starting) {
				if (mode.mode === 'modeWork') {
					setPomodoro(prevPomodoro => prevPomodoro - 1)
				}
				if (mode.mode === 'modeBreak') {
					setShortBreak(prevShortBreak => prevShortBreak - 1)
				}
				if (mode.mode === 'modeLongBreak') {
					setLongBreak(prevLongBreak => prevLongBreak - 1)
				}
				// setTime(time => time + 1)
				time.current = time.current + 1
			} else {
				clearInterval(intervalId)
			}
		}, 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [mode.mode, pomodoro, starting])
	console.log(pomodoro)
	const playAlarma = useCallback(() => {
		const audio = document.getElementById('alarma')
		audio.volume = pomodoroTime.volume / 100
		audio.play()
	}, [pomodoroTime.volume])

	const playStart = useCallback(() => {
		const audio = document.getElementById('playStart')
		audio.volume = pomodoroTime.volume / 100
		audio.play()
	}, [pomodoroTime.volume])

	const resetPomodoro = useCallback(() => {
		setPomodoro(pomodoroTime.maxPomodoro)
		setShortBreak(pomodoroTime.maxShortBreak)
		setLongBreak(pomodoroTime.maxLongBreak)
	}, [
		pomodoroTime.maxLongBreak,
		pomodoroTime.maxPomodoro,
		pomodoroTime.maxShortBreak,
	])

	const handleNext = useCallback(() => {
		playStart()
		toggleMode()
		resetPomodoro()
	}, [playStart, toggleMode, resetPomodoro])

	useEffect(() => {
		if (pomodoro === 0 || shortBreak === 0 || longBreak === 0) {
			playAlarma()
			handleNext()
		}
	}, [playAlarma, handleNext, pomodoro, shortBreak, longBreak])

	const handleStartOrPause = useCallback(() => {
		playStart()

		if (!starting) {
			// action start pomodoro
			startPomodoro()
			setStarting(true)
			if (!restart.current) {
				// action restart pomodoro
				dateStart.current = new Date(Date.now())
				restart.current = true
			}
		} else {
			// action pause pomodoro
			pausePomodoro()
			setStarting(false)
		}
	}, [playStart, starting, startPomodoro, pausePomodoro])

	const handleStop = useCallback(() => {
		playStart()
		const newTask = {
			dateStart: dateStart.current,
			dateFin: new Date(Date.now()),
			name: task,
			time: time.current,
		}
		addTask(newTask)
		setStarting(false)
		restart.current = false
		stopPomodoro()
		resetPomodoro()
		setTask('')
		time.current = 0
		resetMode()
		toast({
			status: 'success',
			duration: 2000,
			isClosable: true,
			render: () => (
				<Box
					bg='brand.900'
					color='white'
					py={4}
					px={3}
					borderRadius='8px'
					textAlign='center'
				>
					<HStack justifyContent='center'>
						<MdTaskAlt />
						<Text>Task saved in the history!!!!</Text>
					</HStack>
				</Box>
			),
		})
	}, [
		addTask,
		playStart,
		resetMode,
		resetPomodoro,
		stopPomodoro,
		task,
		time,
		toast,
	])

	const handleSubmit = useCallback(
		({ task, oldTask }) => {
			setTask(task)
			submitForm()
			if (oldTask !== task) {
				time.current = 0
				resetPomodoro()
			}
		},
		[resetPomodoro, submitForm]
	)

	const handleFocus = () => {
		focusForm()
	}

	return (
		<Box textAlign='center'>
			<CircularProgressCustom
				pomodoro={pomodoro}
				shortBreak={shortBreak}
				longBreak={longBreak}
			/>
			<Flex
				direction={{ base: 'column', sm: 'row', md: 'row', lg: 'row' }}
				alignItems='center'
				justifyContent='center'
			>
				<ButtonCustom
					text={starting ? 'Pause' : 'Start'}
					onClick={handleStartOrPause}
					disabled={pomodoroSetting.disableStart}
				/>
				<ButtonCustom
					text='Stop'
					onClick={handleStop}
					disabled={pomodoroSetting.disableStop}
				/>
				<ButtonCustom
					text='Next'
					onClick={handleNext}
					disabled={pomodoroSetting.disableNext}
				/>
			</Flex>
			<FormPomodoro
				onSubmit={handleSubmit}
				onFocus={handleFocus}
				disableForm={pomodoroSetting.disableForm}
				task={task}
				setTask={setTask}
			/>
		</Box>
	)
}

export default Pomodoro
