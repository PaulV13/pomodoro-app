import { Button } from '@chakra-ui/react'

const ButtonCustom = ({ onClick, text, color, disabled }) => {
	return (
		<Button
			cursor='pointer'
			border='none'
			m='20px'
			px='12px'
			color={color}
			borderRadius='4px'
			boxShadow='#ebebeb 0px 6px 0px'
			fontFamily='ArialRounded'
			fontSize='22px'
			height='55px'
			fontWeight='bold'
			width='200px'
			backgroundColor='white'
			transition='color 0.5s ease-in-out 0s'
			onClick={onClick}
			disabled={disabled}
			_disabled={{
				border: '1px solid #999999',
				color: '#666666',
				backgroundColor: '#cccccc',
				cursor: 'not-allowed',
			}}
			_hover={{
				_disabled: {
					bg: '#cccccc',
				},
			}}
			_focus={{ boxShadow: '#ebebeb 0px 6px 0px' }}
		>
			{text}
		</Button>
	)
}

export default ButtonCustom
