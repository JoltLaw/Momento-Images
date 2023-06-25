import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useContext } from "react";
import { MememoriesContext } from "../store/Memories-Context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import globalStyles from "../assets/styles/GlobalStyles";
// import { ref as databaseRef, onValue } from "firebase/database";
import { TextInput } from "react-native-gesture-handler";
import LinkButton from "../components/general/LinkButton";
import MomentoBTN from "../components/general/MomentoBTN";

const InspectMemory = ({ navigation, route }) => {
  const context = useContext(MememoriesContext);
  route.params;
  const [caption, setCaption] = useState("");
  const [edit, setEdit] = useState(false);
  const [newCaption, setNewCaption] = useState(null);
  useEffect(() => {
    userId = auth.currentUser.uid;
    setCaption(context.memories[route.params.index].caption);
  }, []);

  const newCaptionChangeHandler = (enteredText) => {
    setNewCaption(enteredText);
  };

  function changeMode() {
    setEdit(!edit);
  }

  function backToHome() {
    navigation.goBack();
  }

  const updatePost = () => {
    if (newCaption && newCaption.trim() != "") {
      setCaption(newCaption);
      context.updateMemory(route.params.index, route.params.post, newCaption);
      setEdit(!edit);
    } else {
      Alert.alert("No Caption", "All photos are required to have a caption", {
        text: "Okay",
        onPress: () => {
          return;
        },
      });
    }
  };

  const deletePostHandler = () => {
    const deleted = context.deleteMemory(route.params.index, route.params.post);
    backToHome();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: route.params.image }} />
          <View style={styles.rowContainer}>
            {!edit && <Text style={styles.content}>{caption}</Text>}
            {edit && (
              <TextInput
                placeholder={caption}
                value={newCaption}
                onChangeText={newCaptionChangeHandler}
                style={[
                  {
                    fontSize: 18,
                    minHeight: 140,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: globalStyles.colors.primary,
                    // textAlign: "left",
                    padding: 8,
                    width: "100%",
                  },
                ]}
                multiline={true}
              />
            )}

            {!edit && (
              <Pressable
                style={({ pressed }) => (pressed ? styles.pressed : "")}
                onPress={changeMode}
              >
                <Ionicons
                  style={{
                    color: globalStyles.colors.darkPrimary,
                    fontSize: 22,
                  }}
                  name="pencil"
                />
              </Pressable>
            )}
          </View>
          <View style={styles.btnContainer}>
            {!edit && (
              <Pressable
                style={({ pressed }) =>
                  pressed
                    ? [styles.pressed, { alignSelf: "center" }]
                    : { alignSelf: "center" }
                }
                onPress={deletePostHandler}
              >
                <Ionicons
                  name="trash-bin-sharp"
                  color={globalStyles.colors.red}
                  size={40}
                />
              </Pressable>
            )}
            {!edit && (
              <LinkButton
                title="Back"
                style={styles.backBtn}
                onPress={backToHome}
              />
            )}
            {edit && (
              <View style={styles.rowContainer}>
                <MomentoBTN
                  title="Cancel"
                  color={globalStyles.colors.backgroundColor}
                  backgroundColor={globalStyles.colors.red}
                  onPress={changeMode}
                />
                <MomentoBTN
                  title="Update"
                  color={globalStyles.colors.backgroundColor}
                  backgroundColor={globalStyles.colors.primary}
                  onPress={updatePost}
                />
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default InspectMemory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
    backgroundColor: globalStyles.colors.primary,
  },
  rowContainer: {
    gap: 7,
    padding: 10,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.5,
  },
  content: {
    width: "85%",
    fontSize: 18,
    minHeight: 140,
  },
  btnContainer: {
    borderTopColor: globalStyles.colors.inputTextColor,
    borderTopWidth: 1,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 30,
    width: "100%",
  },
  backBtn: {
    // alignSelf: "flex-start",
  },
});
