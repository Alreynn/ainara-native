import { ThemeProvider, DarkTheme } from '@react-navigation/native'
import { Stack } from "expo-router";
import '../../global.css'

export default function RootLayout() {
  return (
      <ThemeProvider value={DarkTheme}>
          <Stack>
              <Stack.Screen name="(tabs)" options={{
                  headerShown: false,
                  contentStyle: { backgroundColor: '#000000' },
              }} />
              <Stack.Screen name="Genre" options={{
                  headerTitle: "",
                  presentation: 'card',
                  contentStyle: { backgroundColor: '#000000' },
                  headerTransparent: true,
                  headerBackTitleVisible: false,
                  headerTintColor: 'white',
                  headerStyle: { backgroundColor: '#02061730' }
              }} />
              <Stack.Screen name="Search" options={{
                  headerTitle: "",
                  presentation: 'card',
                  contentStyle: { backgroundColor: '#000000' },
                  headerTransparent: true,
                  headerBackTitleVisible: false,
                  headerTintColor: 'white',
                  headerStyle: { backgroundColor: '#02061730' }
              }} />
              <Stack.Screen name="Details" options={{
                  headerTitle: "",
                  presentation: 'modal',
                  contentStyle: { backgroundColor: '#000000' },
                  headerTransparent: true,
                  headerBackTitleVisible: false,
                  headerTintColor: 'white',
                  headerStyle: { backgroundColor: '#02061730' }
              }} />
              <Stack.Screen name="Watch" options={{
                  headerTitle: "",
                  presentation: 'formSheet',
                  sheetAllowedDetents: [0.5, 1],
                  sheetInitialDetentsIndex: 1,
                  sheetGrabberVisible: true,
                //   contentStyle: { backgroundColor: '#000000' },
                //   headerTransparent: true,
                //   headerBackTitleVisible: false,
                //   headerTintColor: 'white',
              }} />
          </Stack>
        </ThemeProvider>
  )
}
