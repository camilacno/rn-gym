import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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

type FormDataProps = {
  userName?: string
  password_old?: string
  password_new?: string
  password_confirm?: string
}

const signUpSchema = yup.object({
  userName: yup.string(),
  password_old: yup
    .string()
    .min(6, 'Senha deve conter no mínimo 6 caracteres')
    .when('password_new', {
      is: (Field: any) => Field,
      then: (schema) => schema.required('Senha antiga deve ser informada'),
    }),
  password_new: yup.string().min(6, 'Senha deve conter no mínimo 6 caracteres'),
  password_confirm: yup
    .string()
    .oneOf(
      [yup.ref('password_new'), null],
      'A confirmação da senha não confere'
    ),
})

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/camilacno.png')

  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })

  function handleProfileUpdate({
    userName,
    password_old,
    password_new,
    password_confirm,
  }: FormDataProps) {
    console.log(userName, password_old, password_new, password_confirm)
  }

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

      <ScrollView pb={10}>
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

          <Controller
            control={control}
            name="userName"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.userName?.message}
              />
            )}
          />

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

          <Controller
            control={control}
            name="password_old"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_old?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_new"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_new?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme nova senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
