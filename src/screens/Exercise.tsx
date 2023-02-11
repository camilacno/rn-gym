import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Text,
  VStack,
  Icon,
  HStack,
  Heading,
  Image,
  Box,
  ScrollView,
} from 'native-base'
import { Feather } from '@expo/vector-icons'

import { AppNavigationRoutesProps } from '@routes/app.routes'

import { Button } from '@components/Button'
import BodyIcon from '@assets/body.svg'
import RepetitionsIcon from '@assets/repetitions.svg'
import SeriesIcon from '@assets/series.svg'

export function Exercise() {
  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }
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
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodyIcon />
            <Text color="gray.100" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView mb={6}>
        <VStack px={8} pt={8} mb={3}>
          <Image
            w="full"
            h={80}
            source={{
              uri: 'https://studiomedinaplus.com.br/wp-content/uploads/2020/04/imagem-remada-unilateral-2138125.jpg',
            }}
            alt="Imagem exercício"
            rounded="lg"
            resizeMode="cover"
          />
        </VStack>

        <Box bg="gray.600" pb={4} px={4} rounded="md" mx={8}>
          <HStack
            alignItems="center"
            justifyContent="space-around"
            mb={6}
            mt={5}
          >
            <HStack>
              <SeriesIcon />
              <Text color="gray.200" ml={2} fontSize="lg">
                3 séries
              </Text>
            </HStack>

            <HStack alignItems="center">
              <RepetitionsIcon />
              <Text color="gray.200" ml={2} fontSize="lg">
                12 repetições
              </Text>
            </HStack>
          </HStack>

          <Button title="Marcar como realizado" />
        </Box>
      </ScrollView>
    </VStack>
  )
}
