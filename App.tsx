import { View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Home } from '@screens/Home'
import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!fontsLoaded ? <Loading /> : <Home />}
    </View>
  )
}
