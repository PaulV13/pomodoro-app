import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import useModeContext from '../../hooks/useModeContext'
import usePomodoroContext from '../../hooks/usePomodoroContext'

const CircularProgressCustom = ({ pomodoro, shortBreak, longBreak }) => {
	const { mode } = useModeContext()
	const { pomodoroTime } = usePomodoroContext()

	const segundosAMinutos = segundos => {
		let minute = Math.floor(segundos / 60)
		minute = minute < 10 ? '0' + minute : minute
		let second = segundos % 60
		second = second < 10 ? '0' + second : second
		return minute + ':' + second
	}

	return (
		<CircularProgress
			value={
				mode.mode === 'modeWork'
					? pomodoro
					: mode.mode === 'modeBreak'
					? shortBreak
					: longBreak
			}
			max={
				mode.mode === 'modeWork'
					? pomodoroTime.maxPomodoro
					: mode.mode === 'modeBreak'
					? pomodoroTime.maxShortBreak
					: pomodoroTime.maxLongBreak
			}
			size='190px'
			color={
				mode.mode === 'modeWork'
					? 'colorProgressWork'
					: mode.mode === 'modeBreak'
					? 'colorProgressBreak'
					: 'colorProgressLongBreak'
			}
			thickness='5px'
		>
			<CircularProgressLabel
				color='white'
				fontSize='48px'
				fontWeight='bold'
				fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
			>
				{mode.mode === 'modeWork'
					? segundosAMinutos(pomodoro)
					: mode.mode === 'modeBreak'
					? segundosAMinutos(shortBreak)
					: segundosAMinutos(longBreak)}
			</CircularProgressLabel>
		</CircularProgress>
	)
}

export default CircularProgressCustom
