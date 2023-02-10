import { useState } from 'react'
import { FlatList, VStack } from 'native-base'

import { Group } from '@components/Group'
import { HeaderHome } from '@components/HeaderHome'

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
    </VStack>
  )
}
