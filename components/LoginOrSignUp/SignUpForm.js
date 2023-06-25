import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import Input from "./Input";
import MomentoBTN from "../general/MomentoBTN";
import LinkButton from "../general/LinkButton";
import globalStyles from "../../assets/styles/GlobalStyles";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const SignUpForm = ({ navigation }) => {
  const [emailValue, setEmailValue] = useState("");
  const [confirmEmailValue, setConfirmEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setconfirmPasswordValue] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setEmailValue("");
      setConfirmEmailValue("");
      setPasswordValue("");
      setConfirmEmailValue("");
      navigation.navigate("HomeScreen");
    } else {
      navigation.navigate("userVarification");
    }
  });

  const emailChangeHandler = (enteredText) => {
    setEmailValue(enteredText);
  };

  const confirmationEmailChangeHandler = (enteredText) => {
    setConfirmEmailValue(enteredText);
  };

  const passwordChangeHandler = (enteredText) => {
    setPasswordValue(enteredText);
  };

  const confirmationPasswordChangeHandler = (enteredText) => {
    setconfirmPasswordValue(enteredText);
  };

  const switchPages = () => {
    navigation.navigate("Login");
  };

  const submitHandler = () => {
    emailIsValid =
      emailValue.includes("@") &&
      emailValue.includes(".com") &&
      emailValue == confirmEmailValue;
    passwordIsValid =
      8 <= passwordValue.trim().length && passwordValue == confirmPasswordValue;

    if (emailIsValid && passwordIsValid) {
      newUserData = {
        email: emailValue,
        password: passwordValue,
      };
      let user;
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          user = userCredential;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorCode, errorMessage, [
            { text: "Okay", onPress: () => {} },
          ]);
        });
    } else {
      if (!emailIsValid && !passwordIsValid) {
        Alert.alert(
          "Invalid Email and Password",
          "Please double check your email and password",
          [{ text: "okay", onPress: () => {} }]
        );
      } else if (!emailIsValid) {
        Alert.alert(
          "Invalid Email",
          "Please double check your email, and confirmation email"
        );
      } else if (!passwordIsValid) {
        Alert.alert(
          "Invalid Password",
          "Please double check your password, and confirmation password"
        );
      }
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <View style={[styles.container]}>
          <Text style={[styles.title]}>Sign Up</Text>
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
            label="Confirm Email"
            type="email-address"
            autoComplete="email"
            inputStyles={styles.input}
            onTextChange={confirmationEmailChangeHandler}
            value={confirmEmailValue}
          />
          <Input
            label="Password"
            password={true}
            inputStyles={styles.input}
            onTextChange={passwordChangeHandler}
            value={passwordValue}
            placeholder="Minimum of 8 characters"
          />
          <Input
            label="Confirm Password"
            password={true}
            inputStyles={styles.input}
            onTextChange={confirmationPasswordChangeHandler}
            value={confirmPasswordValue}
          />
          <View style={styles.btnContainer}>
            <MomentoBTN
              title="Sign up"
              backgroundColor={globalStyles.colors.primary}
              color={globalStyles.colors.backgroundColor}
              onTextChange={confirmationPasswordChangeHandler}
              onPress={submitHandler}
            />
          </View>
          <LinkButton title="Login" onPress={switchPages} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUpForm;

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
