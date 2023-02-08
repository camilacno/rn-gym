import { VStack, Center, Heading, ScrollView } from 'native-base'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Header } from '@components/Header'

export function SignUp() {
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

        <Button title="Voltar para o login" variant="outline" mt={16} />
      </VStack>
    </ScrollView>
  )
}
