import { View, Text, StyleSheet } from "react-native";
import MomentoBTN from "../components/general/MomentoBTN";
import globalStyles from "../assets/styles/GlobalStyles";
import SignUpForm from "../components/LoginOrSignUp/SignUpForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "../components/LoginOrSignUp/LoginForm";
const Stack = createNativeStackNavigator();

const LoginOrSignUp = () => {
  // building Applications initial interface
  const OptionSelect = ({ navigation }) => {
    const signUpSelectedHandler = (navigation) => {
      navigation.navigate("Signup");
    };

    const loginSelectedHandler = (navigation) => {
      navigation.navigate("Login");
    };

    // JSX that is returned
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Momento</Text>
        </View>
        <View style={styles.rowContainer}>
          <MomentoBTN
            title={"Sign Up"}
            onPress={signUpSelectedHandler.bind(this, navigation)}
          />
          <MomentoBTN
            title={"Log in"}
            backgroundColor={globalStyles.colors.primary}
            color={globalStyles.colors.backgroundColor}
            onPress={loginSelectedHandler.bind(this, navigation)}
          />
        </View>
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login or Signup" component={OptionSelect} />
      <Stack.Screen name="Signup" component={SignUpForm} />
      <Stack.Screen name="Login" component={LoginForm} />
    </Stack.Navigator>
  );
};

export default LoginOrSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    marginTop: 40,
    flexDirection: "row",
    padding: 8,
    gap: 8,
  },
  titleContainer: {
    marginTop: 200,
  },
  titleText: {
    color: globalStyles.colors.primary,
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
});
