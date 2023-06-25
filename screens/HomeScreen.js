import globalStyles from "../assets/styles/GlobalStyles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OptionsScreen from "./OptionsScreen";
import HomePageNavigation from "../components/HomePage/HomePageNavigation";
import MememoriesContextProvider from "../store/Memories-Context";

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <MememoriesContextProvider>
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
    </MememoriesContextProvider>
  );
};

export default HomeScreen;
