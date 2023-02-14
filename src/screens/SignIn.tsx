import { VStack, Text, Center, Heading, ScrollView } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from '@hooks/useAuth'
import { AuthNavigatorRoutesPropos } from '@routes/auth.routes'
import { Input, Button, Header } from '@components/index'

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve conter no mínimo 6 caracteres'),
})

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesPropos>()

  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  function handleCreateNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignUp({ email, password }: FormDataProps) {
    signIn(email, password)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Header />

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignUp)} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleCreateNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
