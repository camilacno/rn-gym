import { Image, Text, Center } from 'native-base'
import LogoSvg from '../assets/logo.svg'
import BackgroundImg from '@assets/background.png'

export function Header() {
  return (
    <>
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="sm">
          Treine sua mente e seu corpo
        </Text>
      </Center>
    </>
  )
}
