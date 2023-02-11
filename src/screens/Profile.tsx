import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
} from 'native-base'
import { HeaderScreens, UserPhoto, Input, Button } from '@components/index'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [image, setImage] = useState(null)

  async function handleSelectUserPhoto() {
    await ImagePicker.launchImageLibraryAsync()

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  }

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

          <TouchableOpacity onPress={handleSelectUserPhoto}>
            <Text
              fontSize="md"
              color="green.500"
              mt={2}
              mb={6}
              fontWeight="bold"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" />
          <Input placeholder="E-mail" isDisabled />
        </Center>

        <Center px={10} mt={5} mb={9}>
          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            fontWeight="bold"
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Input placeholder="Senha antiga" secureTextEntry />
          <Input placeholder="Nova senha" secureTextEntry />
          <Input placeholder="Confirme nova senha" secureTextEntry />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}
