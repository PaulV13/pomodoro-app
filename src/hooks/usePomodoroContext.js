import { useContext } from 'react'
import PomodoroContext from '../contexts/PomodoroContext'

const usePomodoroContext = () => {
	return useContext(PomodoroContext)
}

export default usePomodoroContext
