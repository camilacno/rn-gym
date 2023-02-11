import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Center, Text, VStack, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'

import { AppNavigatiorRoutesProps } from '@routes/app.routes'

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
      </VStack>
    </VStack>
  )
}
