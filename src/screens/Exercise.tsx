import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, VStack, Icon, HStack, Heading, Image } from 'native-base'
import { Feather } from '@expo/vector-icons'

import { AppNavigatiorRoutesProps } from '@routes/app.routes'

import BodyIcon from '@assets/body.svg'

export function Exercise() {
  const navigation = useNavigation<AppNavigatiorRoutesProps>()

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

      <VStack p={8}>
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
    </VStack>
  )
}
