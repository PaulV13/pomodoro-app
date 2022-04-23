import { useState, useEffect } from 'react'

const useTask = () => {
	const [tasks, setTasks] = useState(
		JSON.parse(window.localStorage.getItem('tasks')) || []
	)
	const [task, setTask] = useState('')

	useEffect(() => {
		window.localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const addTasks = t => {
		setTasks([...tasks, t])
	}

	const addTask = task => {
		setTask(task)
	}

	return {
		tasks,
		addTasks,
		task,
		addTask,
	}
}

export default useTask
