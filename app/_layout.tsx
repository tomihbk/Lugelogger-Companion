import { Stack } from 'expo-router';
import tw, { useDeviceContext, useAppColorScheme } from 'twrnc';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: `device`,
  });

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#125' },
      }}
      key={tw.memoBuster}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
