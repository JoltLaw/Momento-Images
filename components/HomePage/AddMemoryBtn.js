import LinkButton from "../general/LinkButton";
import globalStyles from "../../assets/styles/GlobalStyles";
import { View, StyleSheet } from "react-native";

const AddMemoryBtn = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <LinkButton style={styles.text} title="Add+" onPress={onPress} />
    </View>
  );
};

export default AddMemoryBtn;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    alignItems: "flex-end",
    padding: 12,
    borderBottomColor: globalStyles.colors.primary,
    borderBottomWidth: 1,
  },
  text: {
    marginRight: 12,
  },
});
