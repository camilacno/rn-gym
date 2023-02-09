import { Group } from '@components/Group'
import { HeaderHome } from '@components/HeaderHome'
import { Text, VStack } from 'native-base'

export function Home() {
  return (
    <VStack flex={1}>
      <HeaderHome />
      <Group name="costas" />
    </VStack>
  )
}
