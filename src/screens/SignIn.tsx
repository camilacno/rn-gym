import { VStack, Text, Center, Heading, ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { AuthNavigatorRoutesPropos } from '@routes/auth.routes'
import { Input, Button, Header } from '@components/index'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesPropos>()

  function handleCreateNewAccount() {
    navigation.navigate('signUp')
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
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
          <Button title="Acessar" />
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
