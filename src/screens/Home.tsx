import { Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'

import { AppNavigationRoutesProps } from '@routes/app.routes'
import { HomeHeader, ExerciseCard, Group } from '@components/index'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

export function Home() {
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
    '1',
    '2',
    '3',
  ])
  const [groupSelected, setGroupSelected] = useState('Costas')

  const navigation = useNavigation<AppNavigationRoutesProps>()

  const toast = useToast()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get('/groups')
      setGroups(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares. Tente novamente em alguns minutos.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        width: Dimensions.get('window').width * 0.95,
      })
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack px={8} flex={1}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  )
}
