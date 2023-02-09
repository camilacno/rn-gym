import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import { Home, Exercise, History, Profile } from '@screens/index'

const { Navigator, Screen } = createBottomTabNavigator()

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

export type AppNavigatiorRoutesProps = BottomTabNavigationProp<AppRoutes>

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} />
      <Screen name="history" component={History} />
      <Screen name="profile" component={Profile} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}
