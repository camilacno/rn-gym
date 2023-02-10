import { Center, Heading } from 'native-base'

type HeaderScreensProps = {
  title: string
}

export function HeaderScreens({ title }: HeaderScreensProps) {
  return (
    <Center bg="gray.600" pb={6} pt={16}>
      <Heading color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  )
}
