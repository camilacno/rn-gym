import { Pressable, IPressableProps } from 'native-base'
import { Text } from 'native-base'

type GroupProps = IPressableProps & {
  name: string
  isActive: boolean
}
export function Group({ name, isActive, ...rest }: GroupProps) {
  return (
    <Pressable
      {...rest}
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderColor: 'green.500',
        borderWidth: 1,
      }}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="semibold"
      >
        {name}
      </Text>
    </Pressable>
  )
}
