import { useState } from 'react'

const useTask = () => {
	const [tasks, setTasks] = useState(
		JSON.parse(window.localStorage.getItem('tasks')) || []
	)

	const addTask = task => {
		setTasks([...tasks, task])
	}

	return {
		tasks,
		addTask,
	}
}

export default useTask
