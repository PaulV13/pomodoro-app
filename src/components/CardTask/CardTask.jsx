import { Tr, Td } from '@chakra-ui/react'

const CardTask = ({ task }) => {
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
		const date = new Date(dateString)

		const options = {
			timeStyle: 'long',
			dateStyle: 'short',
		}

		const { locale } = Intl.DateTimeFormat().resolvedOptions()

		const dateFormated = Intl.DateTimeFormat(locale, options).format(date)
		return dateFormated
	}

	return (
		<>
			<Tr>
				<Td>{task.name}</Td>
				<Td>{formatHourMinutesSeconds(task.time)}</Td>
				<Td>{dateFormat(task.dateStart.toString())}</Td>
				<Td>{dateFormat(task.dateFin.toString())}</Td>
			</Tr>
		</>
	)
}

export default CardTask
