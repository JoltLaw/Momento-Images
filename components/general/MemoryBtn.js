import { Pressable, Image, StyleSheet } from "react-native";
import globalStyles from "../../assets/styles/GlobalStyles";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../firebase/firebase";
import { useState } from "react";

const MemoryBtn = ({ post, key, onPress }) => {
  const [image, setImage] = useState();
  const getImage = async (uri) => {
    const enteryImage = storageRef(storage, uri);
    const url = await getDownloadURL(enteryImage).then((x) => {
      setImage(x);
    });
  };
  getImage(post.uri);
  return (
    <Pressable key={key} style={styles.btn} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
    </Pressable>
  );
};

export default MemoryBtn;

const styles = StyleSheet.create({
  btn: {
    height: 110,
    marginVertical: 0.5,
    marginHorizontal: 0.5,
    minWidth: "32.2%",
    alignSelf: "center",
    // borderRadius: 8,
    overflow: "hidden",
    backgroundColor: globalStyles.colors.primary,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
