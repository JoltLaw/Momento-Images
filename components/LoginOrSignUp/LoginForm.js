import Input from "./Input";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MomentoBTN from "../general/MomentoBTN";
import LinkButton from "../general/LinkButton";
import globalStyles from "../../assets/styles/GlobalStyles";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const LoginForm = ({ navigation }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setEmailValue("");
      setpasswordValue("");
      navigation.navigate("HomeScreen");
    } else {
      navigation.navigate("userVarification");
    }
  });

  const emailChangeHandler = (enteredText) => {
    setEmailValue(enteredText);
  };
  const passwordChangeHandler = (enteredText) => {
    setpasswordValue(enteredText);
  };

  const switchPages = () => {
    navigation.navigate("Signup");
  };

  const submitHandler = () => {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <View style={[styles.container]}>
          <Text style={[styles.title]}>Login</Text>
          <Input
            label="Email"
            type="email-address"
            autoComplete="email"
            inputStyles={styles.input}
            onTextChange={emailChangeHandler}
            value={emailValue}
            placeholder="Example@email.com"
          />

          <Input
            label="Password"
            password={true}
            inputStyles={styles.input}
            onTextChange={passwordChangeHandler}
            value={passwordValue}
            placeholder="Minimum of 8 characters"
          />

          <View style={styles.btnContainer}>
            <MomentoBTN
              title="Login"
              backgroundColor={globalStyles.colors.primary}
              color={globalStyles.colors.backgroundColor}
              onPress={submitHandler}
            />
          </View>
          <LinkButton title="Sign up" onPress={switchPages} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
    gap: 20,
  },
  title: {
    color: globalStyles.colors.primary,
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 30,
  },
  input: {
    width: "80%",
  },
  btnContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    maxWidth: "40%",
  },
});
