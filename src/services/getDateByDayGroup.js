const getDateByDayGroup = tasks => {
	const fechas = tasks.map(task => {
		return {
			name: task.name,
			dateStart: new Date(task.dateStart),
			dateFin: new Date(task.dateFin),
			time: task.time,
			day: new Date(task.dateFin).getDate(),
		}
	})

	const array = Object.values(
		fechas.reduce(
			(h, a) =>
				Object.assign(h, {
					[a.day]: (h[a.day] || [])
						.concat(a)
						.sort((a, b) => b.dateFin - a.dateFin),
				}),
			{}
		)
	)

	return array.reverse()
}

export default getDateByDayGroup
