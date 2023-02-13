import { useForm, Controller } from 'react-hook-form'
import { VStack, Center, Heading, ScrollView, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Input, Button, Header } from '@components/index'

type FormDataProps = {
  userName: string
  email: string
  password: string
  password_confirm: string
}

export function SignUp() {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      password_confirm: '',
    },
  })

  function handleBackToSignIn() {
    navigation.goBack()
  }

  function handleSignUp({
    userName,
    email,
    password,
    password_confirm,
  }: FormDataProps) {
    console.log(userName, email, password, password_confirm)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={10}>
        <Header />

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="userName"
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Nome" onChangeText={onChange} value={value} />
            )}
            rules={{ required: 'Nome é obrigatório' }}
          />

          <Text color="gray.100">{errors.userName?.message}</Text>

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
              />
            )}
            rules={{
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido',
              },
            }}
          />

          <Text color="gray.100">{errors.email?.message}</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{ required: 'Senha é obrigatória' }}
          />

          <Text color="gray.100">{errors.password?.message}</Text>

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme sua senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
            rules={{ required: 'Confirme sua senha' }}
          />
          <Text color="gray.100">{errors.password_confirm?.message}</Text>

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={16}
          onPress={handleBackToSignIn}
        />
      </VStack>
    </ScrollView>
  )
}
