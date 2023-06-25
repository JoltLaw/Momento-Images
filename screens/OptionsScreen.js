import HomeHeader from "../components/HomePage/HomeHeader";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import globalStyles from "../assets/styles/GlobalStyles";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const OptionsScreen = ({ navigation }) => {
  const signUserOut = () => {
    signOut(auth);
  };
  return (
    <View>
      <HomeHeader navigation={navigation} />
      <View style={styles.logoutBtnContainer}>
        <Pressable
          style={({ pressed }) => {
            return pressed ? styles.logoutPressed : "";
          }}
          onPress={signUserOut}
        >
          <Text style={styles.logoutText}>
            Logout
            <Ionicons name="log-out" size={20} />
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OptionsScreen;

const styles = StyleSheet.create({
  logoutBtnContainer: {
    padding: 10,
    marginTop: 40,
    borderTopWidth: 2,
    borderTopColor: globalStyles.colors.red,
  },
  logoutPressed: {
    opacity: 0.5,
  },
  logoutText: {
    textAlign: "center",
    color: "#fc4c4c",
    fontSize: 20,
  },
});
