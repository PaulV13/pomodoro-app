import { createContext, useState, useMemo, useCallback } from 'react'

const PomodoroContext = createContext()

export const PomodoroContextProvider = ({ children }) => {
	const [pomodoroTime, setPomodoroTime] = useState({
		maxPomodoro:
			parseInt(window.localStorage.getItem('pomodoro')) * 60 || 25 * 60,
		maxShortBreak:
			parseInt(window.localStorage.getItem('shortBreak')) * 60 || 5 * 60,
		maxLongBreak:
			parseInt(window.localStorage.getItem('longBreak')) * 60 || 15 * 60,
		volume: parseInt(window.localStorage.getItem('volume')) || 10,
	})

	const updatePomodoro = useCallback(
		(valuePomodoro, valueLongBreak, valueShortBreak, sliderValue) => {
			setPomodoroTime({
				maxPomodoro: valuePomodoro * 60,
				maxShortBreak: valueShortBreak * 60,
				maxLongBreak: valueLongBreak * 60,
				volume: sliderValue,
			})
		},
		[]
	)

	const values = useMemo(
		() => ({
			pomodoroTime,
			updatePomodoro,
		}),
		[pomodoroTime, updatePomodoro]
	)

	return (
		<PomodoroContext.Provider value={values}>
			{children}
		</PomodoroContext.Provider>
	)
}

export default PomodoroContext
