import { useState } from 'react'
import { Heading, VStack, SectionList, Text } from 'native-base'
import { HeaderScreens, HistoryCard } from '@components/index'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '25.01.2023',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '27.01.2023',
      data: ['Puxada frontal'],
    },
  ])

  return (
    <VStack flex={1}>
      <HeaderScreens title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
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
      ></SectionList>
    </VStack>
  )
}
