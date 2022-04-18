import { useEffect, useState } from 'react'
import { Box, Button, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { MdOutlineArrowBack } from 'react-icons/md'
import getDateByDayGroup from '../../services/getDateByDayGroup'
import TableTask from '../../components/TableTask/TableTask'
import useTask from '../../hooks/useTask'

const History = () => {
	const { tasks } = useTask()
	const [tasksGroups, setTasksGroups] = useState([])

	useEffect(() => {
		const tasksGroups = getDateByDayGroup(tasks)
		setTasksGroups(tasksGroups)
	}, [tasks])

	return (
		<Box>
			<Link as={RouterLink} to='/'>
				<Button
					leftIcon={<MdOutlineArrowBack />}
					color='brand.900'
					variant='link'
					_focus={{
						boxShadow: 'none',
					}}
				>
					Back
				</Button>
			</Link>
			{tasksGroups.map((task, index) => (
				<TableTask key={index} task={task} />
			))}
		</Box>
	)
}

export default History
