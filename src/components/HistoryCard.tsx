import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Heading, HStack, Text, VStack } from 'native-base'

type HistoryCardProps = TouchableOpacityProps & {}

export function HistoryCard({ ...rest }: HistoryCardProps) {
  return (
    <HStack
      w-full
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr={5} flex={1}>
        <Heading
          fontSize="md"
          color="white"
          fontFamily="heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          Costas
        </Heading>

        <Text fontSize="lg" color="gray.100" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        08:32
      </Text>
    </HStack>
  )
}
