import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import globalStyles from "../../assets/styles/GlobalStyles";

const OpenMenu = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : [styles.container]
      }
    >
      <Ionicons style={styles.icon} name="menu" size={40} />
    </Pressable>
  );
};

export default OpenMenu;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 8,
  },
  pressed: {
    opacity: 0.4,
  },
  icon: {
    color: globalStyles.colors.primary,
  },
});
