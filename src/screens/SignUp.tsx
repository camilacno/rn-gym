import { VStack, Center, Heading, ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Input, Button, Header } from '@components/index'

export function SignUp() {
  const navigation = useNavigation()

  function handleBackToSignIn() {
    navigation.goBack()
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
          <Input placeholder="Nome" />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
          <Input placeholder="Confirme sua senha" secureTextEntry />
          <Button title="Criar e acessar" />
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
