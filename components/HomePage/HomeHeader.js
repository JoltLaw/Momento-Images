import { View, Text, StyleSheet } from "react-native";
import globalStyles from "../../assets/styles/GlobalStyles";
import OpenMenu from "./OpenMenu";

const HomeHeader = ({ navigation }) => {
  const openDrawerNavi = () => {
    navigation.toggleDrawer();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Momento</Text>
      <OpenMenu onPress={openDrawerNavi} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: globalStyles.colors.primary,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
    color: globalStyles.colors.primary,
    fontSize: 30,
    fontWeight: "bold",
  },
});
