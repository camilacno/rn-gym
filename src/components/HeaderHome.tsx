import { TouchableOpacity } from 'react-native'
import { Text, HStack, Heading, VStack, Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from './UserPhoto'

export function HeaderHome() {
  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
      w-full
      justifyContent="space-between"
    >
      <UserPhoto
        size={16}
        source={{ uri: 'https://github.com/camilacno.png' }}
        alt="Imagem do usuário"
      />
      <VStack flex={1}>
        <Text color="gray.00" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md">
          Camila Nepomuceno
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
