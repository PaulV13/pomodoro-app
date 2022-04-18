export const TASK_ACTIONS = {
	ADD_TASK: 0,
}

export const taskReducer = (state, action) => {
	switch (action.type) {
		case TASK_ACTIONS.ADD_TASK:
			return [...state, action.task]
	}
}
