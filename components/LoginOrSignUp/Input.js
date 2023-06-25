import { View, Text, TextInput, StyleSheet } from "react-native";
import globalStyles from "../../assets/styles/GlobalStyles";

const Input = ({
  label,
  type,
  inputStyles,
  autoComplete,
  password = false,
  onTextChange,
  value,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={type}
        secureTextEntry={password}
        autoCapitalize="none"
        autoComplete={autoComplete}
        style={[styles.input, inputStyles]}
        autoCorrect={false}
        onChangeText={onTextChange}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    color: globalStyles.colors.darkPrimary,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: globalStyles.colors.primary,
    backgroundColor: globalStyles.colors.fadedPrimary,
    color: globalStyles.colors.inputTextColor,
    borderRadius: 8,
    fontSize: 18,
    padding: 6,
  },
});
