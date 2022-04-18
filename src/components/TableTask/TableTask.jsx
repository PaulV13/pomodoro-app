import {
	Tr,
	Td,
	Tbody,
	TableContainer,
	Thead,
	Th,
	Table,
} from '@chakra-ui/react'
import { format } from 'date-fns'

const TableTask = ({ task }) => {
	const formatHourMinutesSeconds = seconds => {
		let secondTime = parseInt(seconds)
		let minuteTime = 0
		let hourTime = 0
		let result = ''

		if (secondTime > 60) {
			minuteTime = parseInt(secondTime / 60)
			secondTime = parseInt(secondTime % 60)
			if (minuteTime > 60) {
				hourTime = parseInt(minuteTime / 60)
				minuteTime = parseInt(minuteTime % 60)
			}
		}

		if (secondTime < 10) {
			result = '0' + parseInt(secondTime)
		} else {
			result = '' + parseInt(secondTime)
		}

		if (minuteTime < 10) {
			result = '0' + parseInt(minuteTime) + ':' + result
		} else {
			result = parseInt(minuteTime) + ':' + result
		}

		if (hourTime < 10) {
			result = '0' + parseInt(hourTime) + ':' + result
		} else {
			result = parseInt(hourTime) + ':' + result
		}

		return result
	}

	const dateFormat = dateString => {
		const formatDate = format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss')
		return formatDate
	}

	return (
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
					{task.map((t, index) => (
						<Tr key={index}>
							<Td>{t.name}</Td>
							<Td>{formatHourMinutesSeconds(t.time)}</Td>
							<Td>{dateFormat(t.dateStart.toString())}</Td>
							<Td>{dateFormat(t.dateFin.toString())}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default TableTask
