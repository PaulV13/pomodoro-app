import { useState } from 'react'
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	Badge,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Tooltip,
} from '@chakra-ui/react'
import { FiSettings } from 'react-icons/fi'

const TimerSetting = ({
	pomodoro,
	shortBreak,
	longBreak,
	setPomodoro,
	setShortBreak,
	setLongBreak,
	setMaxPomodoro,
	setMaxLongBreak,
	setMaxShortBreak,
	setVolume,
	volume,
}) => {
	const [values, setValues] = useState({
		pomodoro: pomodoro / 60,
		shortBreak: shortBreak / 60,
		longBreak: longBreak / 60,
	})
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [sliderValue, setSliderValue] = useState(volume)
	const [showTooltip, setShowTooltip] = useState(false)

	const handleChange = e => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const { pomodoro, shortBreak, longBreak } = values
		window.localStorage.setItem('pomodoro', pomodoro)
		window.localStorage.setItem('longBreak', longBreak)
		window.localStorage.setItem('shortBreak', shortBreak)
		window.localStorage.setItem('volume', sliderValue)
		setPomodoro(pomodoro * 60)
		setMaxPomodoro(pomodoro * 60)
		setShortBreak(shortBreak * 60)
		setMaxShortBreak(shortBreak * 60)
		setLongBreak(longBreak * 60)
		setMaxLongBreak(longBreak * 60)
		setVolume(sliderValue)
		onClose()
	}

	return (
		<>
			<Button
				onClick={onOpen}
				leftIcon={<FiSettings />}
				color='brand.900'
				variant='link'
				_focus={{
					boxShadow: 'none',
				}}
			>
				Setting
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						Timer Setting{' '}
						<Badge variant='outline' fontSize='11px' color='brand.900'>
							minutes
						</Badge>
					</ModalHeader>
					<ModalCloseButton
						_focus={{
							boxShadow: 'none',
						}}
					/>
					<ModalBody pb={6}>
						<FormControl mt={4}>
							<FormLabel>Pomodoro</FormLabel>
							<Input
								id='pomodoro'
								name='pomodoro'
								defaultValue={values.pomodoro}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Short Break</FormLabel>
							<Input
								id='shortBreak'
								name='shortBreak'
								defaultValue={values.shortBreak}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Long Break</FormLabel>
							<Input
								id='longBreak'
								name='longBreak'
								defaultValue={values.longBreak}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Alert volume</FormLabel>
							<Slider
								id='slider'
								defaultValue={volume}
								min={0}
								max={100}
								name='volume'
								colorScheme='teal'
								onChange={v => setSliderValue(v)}
								onMouseEnter={() => setShowTooltip(true)}
								onMouseLeave={() => setShowTooltip(false)}
							>
								<SliderTrack>
									<SliderFilledTrack />
								</SliderTrack>
								<Tooltip
									hasArrow
									bg='teal.500'
									color='white'
									placement='top'
									isOpen={showTooltip}
									label={`${sliderValue}%`}
								>
									<SliderThumb />
								</Tooltip>
							</Slider>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme='blue'
							background='brand.900'
							color='#eee'
							_hover={{
								background: 'brand.700',
							}}
							_focus={{
								boxShadow: 'none',
							}}
							mr={3}
							onClick={handleSubmit}
							disabled={
								values.pomodoro < 1 ||
								values.shortBreak < 1 ||
								values.longBreak < 1
							}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default TimerSetting
