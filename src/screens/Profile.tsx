import { Center, ScrollView, VStack } from 'native-base'
import { HeaderScreens, UserPhoto } from '@components/index'

export function Profile() {
  return (
    <VStack flex={1}>
      <HeaderScreens title="Perfil" />

      <ScrollView>
        <Center mt={6} px={10}>
          <UserPhoto
            source={{ uri: 'https://github.com/camilacno.png' }}
            alt="Imagem de perfil"
            size={33}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
