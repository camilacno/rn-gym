import { Button as ButtonNativeBase, IIconButtonProps, Text } from 'native-base'

type ButtonProps = IIconButtonProps & {
  title: string
  variant?: 'solid' | 'outline'
}
export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      bg={variant === 'outline' ? 'transparent' : 'green.700'}
      borderColor="green.500"
      borderWidth={variant === 'outline' ? 1 : 0}
      rounded="sm"
      _pressed={{ bg: variant === 'outline' ? 'gray.500' : 'green.500' }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
