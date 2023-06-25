import { createContext, useState } from "react";
import { auth, db, storage } from "../firebase/firebase";
import {
  ref as databaseRef,
  get,
  child,
  onValue,
  set,
} from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { useEffect } from "react";
import { Alert } from "react-native";

export const MememoriesContext = createContext({
  memories: [],
  addMemory: (memory) => {},
  updateMemory: (index, postNumber, caption) => {},
  deleteMemory: (index, postNumber) => {},
});

function MememoriesContextProvider({ children }) {
  const [memories, setMemories] = useState([]);

  const dbRef = databaseRef(db);

  const userId = auth.currentUser.uid;
  useEffect(() => {
    setMemories([]);
    get(child(dbRef, "memories/" + userId)).then((snapshot) => {
      const dataEntries = snapshot.size;
      i = 0;

      while (i < dataEntries) {
        const entery = databaseRef(db, "memories/" + `${userId}/` + i);

        if (entery) {
          onValue(entery, (snapshot) => {
            console.log(snapshot);
            let data = snapshot.val();

            setMemories((prevState) => [data, ...prevState]);
          });
        }

        i++;
      }
    });
  }, []);

  const addMemory = (memory) => {
    setMemories((prevState) => [memory, ...prevState]);
  };

  const updateMemory = (index, postNumber, caption) => {
    let updatedPost = memories[index];
    updatedPost.caption = caption;
    set(databaseRef(db, "memories/" + `${userId}/` + postNumber), updatedPost);

    let updatedArray = memories;
    updatedArray[index] = updatedPost;
    setMemories(updatedArray);
  };

  const deleteMemory = (index, postNumber) => {
    return Alert.alert(
      "Delete Memory",
      "Are you sure you want to delete this memory",
      [
        {
          text: "Delete",
          onPress: () => {
            const imageReference = storageRef(storage, memories[index].uri);
            deleteObject(imageReference);
            const updatedMemories = memories.filter(
              (memory) => memories.indexOf(memory) != index
            );
            set(databaseRef(db, "memories/" + `${userId}/`), {
              ...updatedMemories,
            });
            setMemories(updatedMemories);
            return true;
          },
        },

        {
          text: "Cancel",
          onPress: () => {
            return false;
          },
        },
      ]
    );
  };

  const value = {
    memories,
    addMemory,
    updateMemory,
    deleteMemory,
  };

  return (
    <MememoriesContext.Provider value={value}>
      {children}
    </MememoriesContext.Provider>
  );
}

export default MememoriesContextProvider;
