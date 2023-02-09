import { Image, IImageProps } from 'native-base'

type UserPhotoProps = IImageProps & {
  size: number
}

export function UserPhoto({ size, ...rest }: UserPhotoProps) {
  return (
    <Image
      {...rest}
      w={size}
      h={size}
      mr={5}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
    />
  )
}
