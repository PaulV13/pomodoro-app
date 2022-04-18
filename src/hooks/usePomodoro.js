import { useReducer } from 'react'
import { pomodoroReducer, POMODORO_ACTIONS } from '../reducers/pomodoroReducer'

const usePomodoro = () => {
	const [pomodoroSetting, setButtonPomodoroSetting] = useReducer(
		pomodoroReducer,
		{
			dateStart: undefined,
			disableForm: undefined,
			disableStop: true,
			disableStart: true,
			disableNext: true,
		}
	)

	const startPomodoro = () => {
		setButtonPomodoroSetting({
			type: POMODORO_ACTIONS.START_POMODORO,
		})
	}

	const pausePomodoro = () => {
		setButtonPomodoroSetting({
			type: POMODORO_ACTIONS.PAUSE_POMODORO,
		})
	}

	const restartPomodoro = dateStart => {
		setButtonPomodoroSetting({
			type: POMODORO_ACTIONS.RESTART_POMODORO,
			dateStart,
		})
	}

	const stopPomodoro = () => {
		setButtonPomodoroSetting({
			type: POMODORO_ACTIONS.STOP_POMODORO,
		})
	}

	const nextPomodoro = disableStop => {
		setButtonPomodoroSetting({
			type: POMODORO_ACTIONS.NEXT_POMODORO,
			disableStop,
		})
	}

	const focusForm = () => {
		setButtonPomodoroSetting({
			type: POMODORO_ACTIONS.FOCUS_FORM,
		})
	}

	const submitForm = () => {
		setButtonPomodoroSetting({
			type: POMODORO_ACTIONS.SUBMIT_FORM,
		})
	}

	return {
		pomodoroSetting,
		startPomodoro,
		pausePomodoro,
		restartPomodoro,
		stopPomodoro,
		nextPomodoro,
		focusForm,
		submitForm,
	}
}

export default usePomodoro
