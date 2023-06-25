import HomeHeader from "../components/HomePage/HomeHeader";
import AddMemoryBtn from "../components/HomePage/AddMemoryBtn";
import { View, FlatList, StyleSheet, Text } from "react-native";
import MemoryBtn from "../components/general/MemoryBtn";
import { useState, useEffect } from "react";
import { db, auth, storage } from "../firebase/firebase";
import { ref as storageRef, getDownloadURL } from "firebase/storage";
import {
  ref as databaseRef,
  child,
  get,
  query,
  onValue,
} from "firebase/database";

function MemoryScreen({ navigation, route }) {
  // const [userId, setUserId] = useState();
  const [posts, setPosts] = useState([]);
  const [showList, setShowList] = useState(false);
  const [imageNumbers, setImageNumbers] = useState([]);
  const [images, setImages] = useState([]);
  const dbRef = databaseRef(db);

  let i = 0;

  useEffect(() => {
    const userId = auth.currentUser.uid;

    get(child(dbRef, "memories/")).then((snapshot) => {
      setPosts([]);
      const dataEntries = snapshot.size + 1;
      i = 1;

      while (i < dataEntries) {
        const entery = databaseRef(db, "memories/" + userId + i);
        onValue(entery, (snapshot) => {
          let data = snapshot.val();
          // console.log(getImage(`${data.uri}`));
          setPosts((prevState) => [data, ...prevState]);
        });

        i++;
      }

      posts.forEach((post) => {
        setImageNumbers((prevState) => [...prevState, post.uri]);
      });
      setShowList(true);
    });
  }, []);

  const openMemory = (item) => {
    console.log(item.uri);
    navigation.navigate("viewMemory", { post: item.uri });
  };

  const addNewMemoryScreen = () => {
    navigation.navigate("addMemory");
  };

  return (
    <View>
      <HomeHeader navigation={navigation} />
      <AddMemoryBtn onPress={addNewMemoryScreen} />

      {showList && (
        <FlatList
          data={posts}
          numColumns={3}
          renderItem={(memory) => {
            return (
              <MemoryBtn
                post={memory.item}
                key={memory.item.caption}
                onPress={openMemory.bind(this, { uri: memory.item.uri })}
              />
            );
          }}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

export default MemoryScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  list: {
    paddingTop: 2,
    alignSelf: "center",
    alignItems: "center",
    height: "100%",
    alignSelf: "stretch",
  },
  noMemoriesText: {
    color: "#c1c1c1",
    fontSize: 20,
    alignSelf: "center",
    opacity: 0.7,
    margin: "30%",
    paddingTop: 120,
  },
});
