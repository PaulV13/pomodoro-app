export const POMODORO_ACTIONS = {
	START_POMODORO: 0,
	RESTART_POMODORO: 1,
	PAUSE_POMODORO: 2,
	STOP_POMODORO: 3,
	NEXT_POMODORO: 4,
	FOCUS_FORM: 5,
}

export const pomodoroReducer = (state, action) => {
	switch (action.type) {
		case POMODORO_ACTIONS.START_POMODORO:
			return {
				...state,
				disableForm: true,
				disableNext: false,
				disableStop: false,
			}
		case POMODORO_ACTIONS.RESTART_POMODORO:
			return {
				...state,
				disableForm: true,
				disableNext: false,
				disableStop: false,
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
				disableStop: true,
			}
		case POMODORO_ACTIONS.NEXT_POMODORO:
			return {
				...state,
				disableStop: action.disableStop,
			}
		case POMODORO_ACTIONS.FOCUS_FORM:
			return {
				...state,
				disableStart: true,
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
