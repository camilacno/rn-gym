import { useCallback, useState } from 'react'
import { Dimensions } from 'react-native'
import { Heading, VStack, SectionList, Text, useToast } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'

import { HeaderScreens, HistoryCard, Loading } from '@components/index'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)
      const { data } = await api.get('history')
      setExercises(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar o histórico. Tente novamente em alguns minutos.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        width: Dimensions.get('window').width * 0.95,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )

  return (
    <VStack flex={1}>
      <HeaderScreens title="Histórico de exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard />}
          renderSectionHeader={({ section }) => (
            <Heading color="gray.200" fontSize="md" mb={3} mt={10}>
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados. {'\n'} Que tal se movimentar hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  )
}
