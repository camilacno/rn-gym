import React, { useState } from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from 'native-base'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import {
  HeaderScreens,
  UserPhoto,
  Input,
  Button,
  Loading,
} from '@components/index'

const PHOTO_SIZE = 33

type FormDataProps = {
  name: string
  email: string
  password: string
  old_password: string
  confirm_password: string
}

const profileSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  old_password: yup
    .string()
    .nullable()
    .min(6, 'Senha deve conter no mínimo 6 caracteres')
    .transform((value) => (!!value ? value : null))
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) => schema.required('Senha antiga deve ser informada'),
    }),
  password: yup
    .string()
    .nullable()
    .min(6, 'Senha deve conter no mínimo 6 caracteres')
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref('password'), null], 'A confirmação da senha não confere')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema.required('Confirmação de senha deve ser informada'),
    }),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/camilacno.png')

  const toast = useToast()
  const { user, updateUserProfile } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)

      const userUpdated = user
      userUpdated.name = data.name

      await api.put('/users', data)
      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Perfil atualizado com sucesso',
        placement: 'top',
        bgColor: 'green.500',
        width: Dimensions.get('window').width * 0.95,
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar o perfil. Tente novamente em alguns minutos.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        width: Dimensions.get('window').width * 0.95,
      })
    } finally {
      setIsUpdating(false)
    }
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
            width: Dimensions.get('window').width * 0.95,
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

      {isUpdating ? (
        <Loading />
      ) : (
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
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  onChangeText={onChange}
                  value={value}
                  isDisabled
                />
              )}
            />
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
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.old_password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme nova senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
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
      )}
    </VStack>
  )
}
