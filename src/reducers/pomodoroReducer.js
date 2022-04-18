export const POMODORO_ACTIONS = {
	START_POMODORO: 0,
	RESTART_POMODORO: 1,
	PAUSE_POMODORO: 2,
	STOP_POMODORO: 3,
	FOCUS_FORM: 4,
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
		case POMODORO_ACTIONS.RESTART_POMODORO:
			return {
				...state,
				dateStart: action.dateStart,
			}
		case POMODORO_ACTIONS.PAUSE_POMODORO:
			return {
				...state,
				disableForm: false,
				disableNext: true,
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
