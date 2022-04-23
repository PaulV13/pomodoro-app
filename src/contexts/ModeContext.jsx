import { createContext, useState, useCallback, useMemo } from 'react'

const ModeContext = createContext()

export const ModeContextProvider = ({ children }) => {
	const [mode, setMode] = useState({
		mode: 'modeWork',
		count: 1,
	})

	const toggleMode = useCallback(() => {
		setMode(function (oldMode) {
			if (oldMode.mode === 'modeBreak' || oldMode.mode === 'modeLongBreak') {
				return {
					mode: 'modeWork',
					count: oldMode.count + 1,
				}
			} else {
				if (oldMode.count % 4 === 0) {
					return {
						mode: 'modeLongBreak',
						count: oldMode.count,
					}
				}
				return {
					mode: 'modeBreak',
					count: oldMode.count,
				}
			}
		})
	}, [])

	const resetMode = useCallback(() => {
		setMode(function () {
			return {
				mode: 'modeWork',
				count: 1,
			}
		})
	}, [])

	const values = useMemo(
		() => ({
			mode,
			toggleMode,
			resetMode,
		}),
		[mode, toggleMode, resetMode]
	)

	return <ModeContext.Provider value={values}>{children}</ModeContext.Provider>
}

export default ModeContext
