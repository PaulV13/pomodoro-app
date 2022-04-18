import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	colors: {
		brand: {
			900: '#1a365d',
			800: '#153e75',
			700: '#2a69ac',
		},
		colorProgressWork: '#8A2908',
		colorProgressBreak: '#0B3861',
		colorProgressLongBreak: '#0B3861',
		bgWork: '#FA8258',
		bgBreak: '#00BFFF',
		bgLongBreak: '#0080FF',
	},
})

export default theme
