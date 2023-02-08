import { Button as ButtonNativeBase, IIconButtonProps, Text } from 'native-base'

type ButtonProps = IIconButtonProps & {
  title: string
}
export function Button({ title, ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      bg="green.700"
      rounded="sm"
      _pressed={{ bg: 'green.500' }}
      {...rest}
    >
      <Text color="white" fontFamily="heading" fontSize="sm">
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
