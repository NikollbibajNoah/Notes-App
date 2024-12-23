import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import AppLoading from "expo-app-loading";

export default function Page() {
  const [fontsLoaded] = useFonts({
    "NotoSans-Bold": require("./../assets/fonts/NotoSans-Bold.ttf"),
    "NotoSans-Regular": require("./../assets/fonts/NotoSans-Regular.ttf"),
    "NotoSans-Italic": require("./../assets/fonts/NotoSans-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Redirect href="/home" />
}