import { useState, useEffect } from 'react'

const useTask = () => {
	const [tasks, setTasks] = useState(
		JSON.parse(window.localStorage.getItem('tasks')) || []
	)
	const [nameTask, setNameTask] = useState('')

	useEffect(() => {
		window.localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const addTasks = t => {
		setTasks([...tasks, t])
	}

	const addNameTask = task => {
		setNameTask(task)
	}

	return {
		tasks,
		addTasks,
		nameTask,
		addNameTask,
	}
}

export default useTask
