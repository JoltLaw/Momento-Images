import { Pressable, Text, StyleSheet } from "react-native";
import globalStyles from "../../assets/styles/GlobalStyles";

const LinkButton = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : [styles.container]
      }
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: globalStyles.colors.linkColor,
    fontSize: 16,
  },
});
