import { useReducer } from 'react'
import { pomodoroReducer, POMODORO_ACTIONS } from '../reducers/pomodoroReducer'

const usePomodoro = () => {
	const [pomodoroSetting, setButtonPomodoroSetting] = useReducer(
		pomodoroReducer,
		{
			disableForm: false,
			disableStop: true,
			disableStart: true,
			disableNext: false,
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

	const stopPomodoro = () => {
		setButtonPomodoroSetting({
			type: POMODORO_ACTIONS.STOP_POMODORO,
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
		stopPomodoro,
		focusForm,
		submitForm,
	}
}

export default usePomodoro
