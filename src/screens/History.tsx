import { useState } from 'react'
import { Heading, VStack, SectionList } from 'native-base'
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
      ></SectionList>
    </VStack>
  )
}
