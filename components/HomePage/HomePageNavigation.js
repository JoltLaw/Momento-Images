import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemoryScreen from "../../screens/MemoryScreen";
import UploadNewMemoryScreen from "../../screens/UploadNewMemoryScreen";
import InspectMemory from "../../screens/InspectMemory";

const Stack = createNativeStackNavigator();

const HomePageNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="memories" component={MemoryScreen} />
      <Stack.Screen name="addMemory" component={UploadNewMemoryScreen} />
      <Stack.Screen name="viewMemory" component={InspectMemory} />
    </Stack.Navigator>
  );
};

export default HomePageNavigation;
