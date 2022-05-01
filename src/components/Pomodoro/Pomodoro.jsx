import { useState, useEffect, useCallback, useRef, useReducer } from 'react'
import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import usePomodoroContext from '../../hooks/usePomodoroContext'
import useModeContext from '../../hooks/useModeContext'
import useTask from '../../hooks/useTask'
import CircularProgressCustom from '../CircularProgressCustom/CircularProgressCustom'
import FormPomodoro from '../FormPomodoro/FormPomodoro'
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom'
import { GiConfirmed } from 'react-icons/gi'
import {
	pomodoroReducer,
	POMODORO_ACTIONS,
} from '../../reducers/pomodoroReducer'
import alarmaSound from '../../assets/telefono.mp3'
import apretarBotonSound from '../../assets/apretar-boton.mp3'

const Pomodoro = () => {
	const { pomodoroTime } = usePomodoroContext()
	const { mode, toggleMode, resetMode } = useModeContext()
	const { nameTask, addNameTask, addTasks } = useTask()
	const toast = useToast()
	const dateStart = useRef(null)
	const time = useRef(0)
	const restart = useRef(false)
	const alarma = useRef()
	const apretarBoton = useRef()
	const [pomodoro, setPomodoro] = useState(pomodoroTime.maxPomodoro)
	const [shortBreak, setShortBreak] = useState(pomodoroTime.maxShortBreak)
	const [longBreak, setLongBreak] = useState(pomodoroTime.maxLongBreak)
	const [disableElement, setDisableElement] = useReducer(pomodoroReducer, {
		disableForm: false,
		disableStop: true,
		disableStart: true,
		starting: false,
	})

	const resetPomodoro = useCallback(() => {
		if (mode.mode === 'modeWork') {
			setPomodoro(pomodoroTime.maxPomodoro)
		} else if (mode.mode === 'modeBreak') {
			setShortBreak(pomodoroTime.maxShortBreak)
		} else if (mode.mode === 'modeLongBreak') {
			setLongBreak(pomodoroTime.maxLongBreak)
		}
	}, [
		mode.mode,
		pomodoroTime.maxLongBreak,
		pomodoroTime.maxPomodoro,
		pomodoroTime.maxShortBreak,
	])

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (disableElement.starting) {
				if (mode.mode === 'modeWork') {
					setPomodoro(prevPomodoro => prevPomodoro - 1)
				} else if (mode.mode === 'modeBreak') {
					setShortBreak(prevPomodoro => prevPomodoro - 1)
				} else if (mode.mode === 'longBreak') {
					setLongBreak(prevPomodoro => prevPomodoro - 1)
				}
				time.current = time.current + 1
			} else {
				clearInterval(intervalId)
			}
		}, 1000)
		return () => clearInterval(intervalId)
	}, [disableElement.starting, mode.mode, pomodoroTime])

	useEffect(() => {
		resetPomodoro()
	}, [resetPomodoro])

	const soundAlarma = useCallback(() => {
		alarma.current.volume = pomodoroTime.volume / 100
		alarma.current.play()
	}, [pomodoroTime.volume])

	const soundButton = useCallback(() => {
		apretarBoton.current.volume = pomodoroTime.volume / 100
		apretarBoton.current.play()
	}, [pomodoroTime.volume])

	const handleNext = useCallback(() => {
		soundButton()
		resetPomodoro()
		toggleMode()
	}, [soundButton, resetPomodoro, toggleMode])

	useEffect(() => {
		if (pomodoro === 0 || shortBreak === 0 || longBreak === 0) {
			soundAlarma()
			handleNext()
		}
	}, [handleNext, longBreak, pomodoro, shortBreak, soundAlarma])

	const handleStartOrPause = () => {
		soundButton()
		if (!restart.current) {
			dateStart.current = new Date(Date.now())
			restart.current = true
		}
		if (!disableElement.starting) {
			setDisableElement({
				type: POMODORO_ACTIONS.START_POMODORO,
			})
		} else {
			setDisableElement({
				type: POMODORO_ACTIONS.PAUSE_POMODORO,
			})
		}
	}

	const handleStop = () => {
		soundButton()
		const newTask = {
			dateStart: dateStart.current,
			dateFin: new Date(Date.now()),
			name: nameTask,
			time: time.current,
		}
		addTasks(newTask)
		resetMode()
		time.current = 0
		restart.current = false
		addNameTask('')
		setDisableElement({
			type: POMODORO_ACTIONS.STOP_POMODORO,
			pomodoroTime,
		})
		resetPomodoro()
		toast({
			position: 'bottom',
			duration: 1000,
			render: () => (
				<Flex
					alignItems='center'
					justifyContent='center'
					color='brand.900'
					py={2}
					bg='white'
					borderRadius='8px'
					border='1px solid'
					borderColor='brand.900'
					mb='30px'
				>
					<GiConfirmed />
					<Text ml={4} fontWeight='bold'>
						Task saved in the history!!!
					</Text>
				</Flex>
			),
		})
	}

	const handleSubmit = ({ nameTask, oldTask }) => {
		if (nameTask !== oldTask) {
			addNameTask(nameTask)
			resetPomodoro()
		}
		setDisableElement({
			type: POMODORO_ACTIONS.SUBMIT_FORM,
		})
	}

	const handleFocus = () => {
		setDisableElement({
			type: POMODORO_ACTIONS.FOCUS_FORM,
		})
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
					text={disableElement.starting ? 'Pause' : 'Start'}
					onClick={handleStartOrPause}
					disabled={disableElement.disableStart}
				/>
				<ButtonCustom
					text='Stop'
					onClick={handleStop}
					disabled={disableElement.disableStop}
				/>
				<ButtonCustom text='Next' onClick={handleNext} disabled={false} />
			</Flex>
			<FormPomodoro
				onSubmit={handleSubmit}
				onFocus={handleFocus}
				disableForm={disableElement.disableForm}
				nameTask={nameTask}
				addNameTask={addNameTask}
			/>
			<audio src={alarmaSound} ref={alarma} />
			<audio src={apretarBotonSound} ref={apretarBoton} />
		</Box>
	)
}

export default Pomodoro
