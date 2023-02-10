import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'

type ExerciseCardProps = TouchableOpacityProps & {}

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: 'https://studiomedinaplus.com.br/wp-content/uploads/2020/04/imagem-remada-unilateral-2138125.jpg',
          }}
          alt="Imagem exercício"
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading color="white" fontSize="lg" fontFamily="heading">
            Remada unilateral
          </Heading>
          <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
