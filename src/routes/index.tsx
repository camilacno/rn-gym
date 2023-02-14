import { useContext } from 'react'
import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthContext } from '@contexts/AuthContext'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export function Routes() {
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  const contextData = useContext(AuthContext)
  console.log('Usuário logado', contextData)

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {/* <AppRoutes /> */}
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
