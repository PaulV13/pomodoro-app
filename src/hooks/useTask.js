import { useReducer } from 'react'
import { taskReducer, TASK_ACTIONS } from '../reducers/taskReducer'

const useTask = () => {
	const [tasks, setTasks] = useReducer(
		taskReducer,
		JSON.parse(window.localStorage.getItem('tasks')) || []
	)

	const addTask = task => {
		setTasks({
			type: TASK_ACTIONS.ADD_TASK,
			task,
		})
	}

	return {
		tasks,
		addTask,
	}
}

export default useTask
