import { Pressable, Text, StyleSheet } from "react-native";

const MomentoBTN = ({
  title,
  backgroundColor = "#f2f2f2",
  color = "#1f1f1f",
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.container, { backgroundColor }, styles.pressed]
          : [styles.container, { backgroundColor }]
      }
      onPress={onPress}
    >
      <Text style={[styles.text, { color }]}>{title}</Text>
    </Pressable>
  );
};

export default MomentoBTN;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
