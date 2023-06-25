import {
  View,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as Imagepicker from "expo-image-picker";
import LinkButton from "../components/general/LinkButton";
import { useState, useEffect } from "react";
import globalStyles from "../assets/styles/GlobalStyles";
import MomentoBTN from "../components/general/MomentoBTN";
import { storage, auth, db } from "../firebase/firebase";
import { ref as dbRef, onValue, set } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import { MememoriesContext } from "../store/Memories-Context";

const UploadNewMemoryScreen = ({ navigation }) => {
  const context = useContext(MememoriesContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [memoryNumber, setMemoryNumber] = useState();
  const user = auth.currentUser;
  const query = dbRef(db, "memories/" + `${user.uid}/`);

  useEffect(() => {
    onValue(query, (snapshot) => {
      const data = snapshot;
      setMemoryNumber(data.size.toString());
    });
  }, []);

  const pickPhoto = async () => {
    let resault = await Imagepicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!resault.canceled) {
      setSelectedImage(resault.assets[0].uri);
    } else {
    }
  };

  const captionChangeHandler = (enteredText) => {
    setCaption(enteredText);
  };

  const cancelHandler = ({}) => {
    setSelectedImage(null);
    setCaption("");
    navigation.goBack();
  };

  const postHandler = async () => {
    const respone = await fetch(selectedImage);
    const blob = await respone.blob();
    const imageRef = storageRef(storage, `${user.uid}${memoryNumber}`);
    imageRef.name = memoryNumber;

    uploadBytes(imageRef, blob).then((snapshot) => {
      const newMemory = {
        caption: caption,
        uri: snapshot.metadata.fullPath,
        userID: user.uid,
      };
      set(dbRef(db, "memories/" + `${user.uid}/` + memoryNumber), newMemory);
      context.addMemory(newMemory);
    });

    setSelectedImage("");
    setCaption("");

    navigation.goBack();
  };

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <View style={styles.inputsContainer}>
            <LinkButton title="Select a Picture" onPress={pickPhoto} />
            <TextInput
              style={styles.input}
              multiline={true}
              value={caption}
              maxLength={400}
              onChangeText={captionChangeHandler}
              placeholder="Caption..."
            />
          </View>
          <View style={styles.btnContainer}>
            <MomentoBTN
              title="Cancel"
              backgroundColor={globalStyles.colors.red}
              color={globalStyles.colors.backgroundColor}
              onPress={cancelHandler.bind(this, navigation)}
            />

            <MomentoBTN
              title="Post"
              backgroundColor={globalStyles.colors.primary}
              color={globalStyles.colors.backgroundColor}
              onPress={postHandler.bind(this, navigation)}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default UploadNewMemoryScreen;

const styles = StyleSheet.create({
  image: {
    backgroundColor: globalStyles.colors.primary,
    width: "100%",
    height: 350,
    marginBottom: 20,
  },

  inputsContainer: {
    gap: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: globalStyles.colors.primary,
    backgroundColor: "#efefef",
    borderRadius: 8,
    minHeight: 170,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    padding: 8,
  },

  btnContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    gap: 140,
    width: "90%",
  },
});
