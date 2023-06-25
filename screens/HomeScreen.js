import globalStyles from "../assets/styles/GlobalStyles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OptionsScreen from "./OptionsScreen";
import HomePageNavigation from "../components/HomePage/HomePageNavigation";
import InspectMemory from "./InspectMemory";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerActiveTintColor: globalStyles.colors.darkPrimary,
      }}
    >
      <Drawer.Screen name="Memory Screen" component={HomePageNavigation} />
      <Drawer.Screen name="Options" component={OptionsScreen} />
    </Drawer.Navigator>
  );
};

export default HomeScreen;
