import React, { useState } from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'

const FormPomodoro = ({
	onSubmit,
	onFocus,
	disableForm,
	nameTask,
	addNameTask,
}) => {
	const [oldTask, setOldTask] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit({ nameTask, oldTask })
	}

	const handleChangeTask = e => {
		addNameTask(e.target.value)
	}

	const handleFocus = e => {
		setOldTask(e.target.value)
		onFocus()
	}

	return (
		<form onSubmit={handleSubmit}>
			<Flex justifyContent='center' alignItems='center' my={4}>
				<Input
					w='50%'
					onChange={handleChangeTask}
					onFocus={handleFocus}
					value={nameTask}
					disabled={disableForm}
					placeholder='Write a task...'
					_placeholder={{ color: 'gray.400' }}
					color='brand.900'
					bg='white'
				/>
				<Button
					type='submit'
					colorScheme='blue'
					background='brand.900'
					color='#eee'
					ml={2}
					_hover={{}}
					_focus={{
						boxShadow: 'none',
					}}
					disabled={nameTask === '' ? true : disableForm}
				>
					Save
				</Button>
			</Flex>
		</form>
	)
}

export default React.memo(FormPomodoro)
