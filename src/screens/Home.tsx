import { useState } from 'react'
import { FlatList, Heading, HStack, Text, VStack } from 'native-base'

import { ExerciseCard, Group, HeaderHome } from '@components/index'

export function Home() {
  const [groups, setGroups] = useState([
    'costas',
    'biceps',
    'triceps',
    'ombros',
  ])
  const [groupSelected, setGroupSelected] = useState('')

  return (
    <VStack flex={1}>
      <HeaderHome />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            onPress={() => setGroupSelected(item)}
            isActive={groupSelected === item}
          />
        )}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />

      <VStack px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercício
          </Heading>
          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>

        <ExerciseCard />
      </VStack>
    </VStack>
  )
}
