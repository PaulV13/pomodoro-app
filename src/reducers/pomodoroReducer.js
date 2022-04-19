export const POMODORO_ACTIONS = {
	START_POMODORO: 0,
	STOP_POMODORO: 1,
	FOCUS_FORM: 2,
}

export const pomodoroReducer = (state, action) => {
	switch (action.type) {
		case POMODORO_ACTIONS.START_POMODORO:
			return {
				...state,
				disableStop: false,
				disableForm: true,
				disableNext: false,
			}
		case POMODORO_ACTIONS.STOP_POMODORO:
			return {
				...state,
				disableForm: false,
			}
		case POMODORO_ACTIONS.FOCUS_FORM:
			return {
				...state,
				disableStart: true,
				disableStop: true,
			}
		case POMODORO_ACTIONS.SUBMIT_FORM:
			return {
				...state,
				disableStart: false,
			}
		default:
			throw new Error('Invalid action')
	}
}
