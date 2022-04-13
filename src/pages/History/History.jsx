import { useEffect, useState } from 'react'
import {
	Button,
	Link,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	TableContainer,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { MdOutlineArrowBack } from 'react-icons/md'
import CardTask from '../../components/CardTask/CardTask'

const History = () => {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		const tasks = JSON.parse(window.localStorage.getItem('tasks'))
		tasks.sort(function (a, b) {
			const dateA = new Date(a.dateStart + '').getTime()
			const dateB = new Date(b.dateStart + '').getTime()

			return dateB - dateA
		})
		setTasks(tasks)
	}, [])

	return (
		<>
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
			<TableContainer
				bg='white'
				border='2px solid'
				borderColor='gray.200'
				rounded='md'
				variant='simple'
				mt={8}
			>
				<Table>
					<Thead bg='#ccc'>
						<Tr>
							<Th color='brand.900' fontWeight='bold'>
								Task
							</Th>
							<Th color='brand.900' fontWeight='bold'>
								Time
							</Th>
							<Th color='brand.900' fontWeight='bold'>
								Start date
							</Th>
							<Th color='brand.900' fontWeight='bold'>
								End Date
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{tasks.map((task, index) => (
							<CardTask key={index} task={task} />
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	)
}

export default History
