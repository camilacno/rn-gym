import { TouchableOpacity } from 'react-native'
import { Text } from 'native-base'

type GroupProps = {
  name: string
}
export function Group({ name }: GroupProps) {
  return (
    <TouchableOpacity>
      <Text
        color="gray.200"
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="semibold"
      >
        {name}
      </Text>
    </TouchableOpacity>
  )
}
