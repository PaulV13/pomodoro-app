import { useContext } from 'react'
import ModeContext from '../contexts/ModeContext'

const useModeContext = () => {
	return useContext(ModeContext)
}

export default useModeContext
