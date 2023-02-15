import { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Text,
  VStack,
  Icon,
  HStack,
  Heading,
  Image,
  Box,
  useToast,
} from 'native-base'
import { Feather } from '@expo/vector-icons'

import { AppNavigationRoutesProps } from '@routes/app.routes'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ExerciseDTO } from '@dtos/ExerciseDTO'

import { Button } from '@components/Button'
import BodyIcon from '@assets/body.svg'
import RepetitionsIcon from '@assets/repetitions.svg'
import SeriesIcon from '@assets/series.svg'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isSendingRegister, setIsSendingRegister] = useState(false)

  const navigation = useNavigation<AppNavigationRoutesProps>()
  const route = useRoute()
  const { exerciseId } = route.params as RouteParamsProps

  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExercise(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício. Tente novamente em alguns minutos.'

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

  async function handleExerciseHistoryRegister() {
    try {
      setIsSendingRegister(true)
      await api.post('/history', { exercise_id: exerciseId })

      toast.show({
        title: 'Parabéns! Exercício registrado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
        width: Dimensions.get('window').width * 0.95,
      })
      navigation.navigate('home')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível registrar o exercício. Tente novamente em alguns minutos.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        width: Dimensions.get('window').width * 0.95,
      })
    } finally {
      setIsSendingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} pt={12} bg="gray.600">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading color="gray.100" fontSize="lg" flexShrink={1} pr={4}>
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodyIcon />
            <Text color="gray.100" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px={8} pt={8} mb={3}>
          <Box rounded="lg" overflow="hidden" mb={3}>
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Demo exercício"
              resizeMode="cover"
              rounded="lg"
            />
          </Box>

          <Box bg="gray.600" pb={4} px={4} rounded="md">
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesIcon />
                <Text color="gray.200" ml={2} fontSize="lg">
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsIcon />
                <Text color="gray.200" ml={2} fontSize="lg">
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button
              title="Marcar como realizado"
              isLoading={isSendingRegister}
              onPress={handleExerciseHistoryRegister}
            />
          </Box>
        </VStack>
      )}
    </VStack>
  )
}
