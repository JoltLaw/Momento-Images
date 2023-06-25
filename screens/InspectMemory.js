import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db, storage } from "../firebase/firebase";
import { useEffect, useState } from "react";
import globalStyles from "../assets/styles/GlobalStyles";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, onValue } from "firebase/database";

const InspectMemory = ({ navigation, route }) => {
  const dbRef = databaseRef(db);
  const [caption, setCaption] = useState("");
  const { editMode, setEditMode } = useState(false);
  const [image, setImage] = useState();
  useEffect(() => {
    const getImage = async (i) => {
      const imageName = "" + i;
      const enteryImage = storageRef(storage, imageName);
      await getDownloadURL(enteryImage).then((x) => {
        setImage(x);
      });
    };
    userId = auth.currentUser.uid;
    const captionQuery = databaseRef(
      db,
      "memories/" + userId + route.params.post
    );
    onValue(captionQuery, (snapshot) => {
      const data = snapshot.val();
      setCaption(data.caption);
      getImage(data.uri);
    });
  }, []);

  const changeMode = () => {
    // setEditMode(true);
  };

  return (
    <View>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.rowContainer}>
        <Text style={styles.content}>{caption}</Text>
        <Pressable
          style={({ pressed }) => (pressed ? styles.pressed : "")}
          onPress={changeMode()}
        >
          <Ionicons
            style={{ color: globalStyles.colors.darkPrimary, fontSize: 22 }}
            name="pencil"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default InspectMemory;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
    backgroundColor: globalStyles.colors.primary,
  },
  rowContainer: {
    padding: 10,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: globalStyles.colors.inputTextColor,
  },
  pressed: {
    opacity: 0.5,
  },
  content: {
    width: "85%",
    fontSize: 18,
  },
});
