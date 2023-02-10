import { VStack } from 'native-base'
import { HeaderScreens } from '@components/index'
import { HistoryCard } from '@components/HistoryCard'

export function History() {
  return (
    <VStack flex={1}>
      <HeaderScreens title="Histórico de exercícios" />

      <VStack mx={5} mt={10}>
        <HistoryCard />
      </VStack>
    </VStack>
  )
}
