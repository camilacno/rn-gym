import { useState } from 'react'
import { Center, ScrollView, VStack, Skeleton } from 'native-base'
import { HeaderScreens, UserPhoto } from '@components/index'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <HeaderScreens title="Perfil" />

      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: 'https://github.com/camilacno.png' }}
              alt="Imagem de perfil"
              size={PHOTO_SIZE}
            />
          )}
        </Center>
      </ScrollView>
    </VStack>
  )
}
