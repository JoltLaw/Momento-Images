import HomeHeader from "../components/HomePage/HomeHeader";
import AddMemoryBtn from "../components/HomePage/AddMemoryBtn";
import { View, FlatList, StyleSheet, Text } from "react-native";
import MemoryBtn from "../components/general/MemoryBtn";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { MememoriesContext } from "../store/Memories-Context";

function MemoryScreen({ navigation }) {
  const context = useContext(MememoriesContext);

  const openMemory = (item, image) => {
    navigation.navigate("viewMemory", {
      post: item.uri,
      image: image,
      index: item.index,
    });
  };

  const addNewMemoryScreen = () => {
    navigation.navigate("addMemory");
  };

  return (
    <View>
      <HomeHeader navigation={navigation} />
      <AddMemoryBtn onPress={addNewMemoryScreen} />

      {context.memories.length > 0 && (
        <FlatList
          data={context.memories}
          numColumns={3}
          renderItem={(memory) => {
            return (
              <MemoryBtn
                post={memory.item}
                key={memory.index}
                onPress={openMemory.bind(this, {
                  uri: memory.item.uri,
                  index: memory.index,
                })}
              />
            );
          }}
          contentContainerStyle={styles.list}
        />
      )}

      {context.memories == 0 && <Text>No memories saved yet</Text>}
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
