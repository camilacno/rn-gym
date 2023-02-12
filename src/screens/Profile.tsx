import React, { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from 'native-base'
import { HeaderScreens, UserPhoto, Input, Button } from '@components/index'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/camilacno.png')

  const toast = useToast()

  async function handleSelectUserPhoto() {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        )

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Imagem excede o limite, escolha uma imagem de até 5MB',
            placement: 'top',
            bgColor: 'red.500',
          })
        }
        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
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
              source={{ uri: userPhoto }}
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
