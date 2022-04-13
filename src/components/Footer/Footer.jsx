import { Box, Link, Text } from '@chakra-ui/react'

const Footer = () => {
	return (
		<Box p={6} textAlign='center' background='#555'>
			<Text color='#ccc' fontWeight='bold' p={4} borderRadius='4px'>
				Application created for the{' '}
				<Link
					href='https://twitter.com/MoureDev?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
					isExternal
				>
					@MoureDev
				</Link>{' '}
				challenge.
			</Text>
		</Box>
	)
}

export default Footer
