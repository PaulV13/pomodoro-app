import React, { useState } from 'react'
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
	Badge,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Tooltip,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react'
import { FiSettings } from 'react-icons/fi'
import usePomodoroContext from '../../hooks/usePomodoroContext'

const TimerSetting = () => {
	const { pomodoroTime, updatePomodoro } = usePomodoroContext()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [showTooltip, setShowTooltip] = useState(false)

	const [valuePomodoro, setValuePomodoro] = useState(
		pomodoroTime.maxPomodoro / 60
	)
	const [valueShortBreak, setValueShortBreak] = useState(
		pomodoroTime.maxShortBreak / 60
	)
	const [valueLongBreak, setValueLongBreak] = useState(
		pomodoroTime.maxLongBreak / 60
	)
	const [sliderValue, setSliderValue] = useState(pomodoroTime.volume)

	const handleSubmit = e => {
		e.preventDefault()

		updatePomodoro(valuePomodoro, valueLongBreak, valueShortBreak, sliderValue)

		window.localStorage.setItem('pomodoro', valuePomodoro)
		window.localStorage.setItem('longBreak', valueLongBreak)
		window.localStorage.setItem('shortBreak', valueShortBreak)
		window.localStorage.setItem('volume', sliderValue)

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
							<NumberInput
								value={valuePomodoro}
								min={1}
								onChange={value => setValuePomodoro(value)}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Short Break</FormLabel>
							<NumberInput
								min={1}
								value={valueShortBreak}
								onChange={value => setValueShortBreak(value)}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Long Break</FormLabel>
							<NumberInput
								min={1}
								value={valueLongBreak}
								onChange={value => setValueLongBreak(value)}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Alert volume</FormLabel>
							<Slider
								id='slider'
								defaultValue={pomodoroTime.volume}
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
								valuePomodoro < 1 || valueShortBreak < 1 || valueLongBreak < 1
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

export default React.memo(TimerSetting)
