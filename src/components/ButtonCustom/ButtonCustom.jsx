import React from 'react'
import { Button } from '@chakra-ui/react'
import useModeContext from '../../hooks/useModeContext'

const ButtonCustom = ({ onClick, text, disabled }) => {
	const { mode } = useModeContext()

	const handleClick = () => {
		onClick()
	}

	return (
		<Button
			cursor='pointer'
			border='none'
			m='20px'
			px='12px'
			color={
				mode.mode === 'modeWork'
					? 'bgWork'
					: mode.mode === 'modeBreak'
					? 'bgBreak'
					: 'bgLongBreak'
			}
			borderRadius='4px'
			fontFamily='ArialRounded'
			fontSize='22px'
			height='55px'
			fontWeight='bold'
			width='200px'
			backgroundColor='white'
			transition='color 0.5s ease-in-out 0s'
			onClick={handleClick}
			disabled={disabled}
			_disabled={{
				border: '1px solid #999999',
				color: '#666666',
				backgroundColor: '#cccccc',
				cursor: 'not-allowed',
			}}
			_hover={{}}
			_focus={{}}
			_active={{}}
		>
			{text}
		</Button>
	)
}

export default React.memo(ButtonCustom)
