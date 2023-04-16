import React, { useState, useEffect, useLayoutEffect } from "react";
import firebase from "firebase/app";

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
// import Button from "../components/UI/Button";
import Button from "../components/ManageContacts/Button";
import IconButton from "../components/UI/IconButton";
import Input from "../components/Auth/Input";
import UserItem from "../components/UsersOutput/UserItem";
import { Colors } from "../constants/styles";
const AdminScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isPassive, setIsPassive] = useState(false);
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://bikeapp-780bf-default-rtdb.firebaseio.com/users.json"
      );
      const data = response.data;

      const userList = [];
      for (const key in data) {
        userList.push({ id: key, ...data[key] });
      }
      setUsers(userList);

      console.log("userList", userList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isToggled]);

  const updateUserIsPassive = (userId) => {
    // Kullanıcının mevcut "isPassive" değerini buluyoruz
    const currentUser = users.find((user) => user.id === userId);
    const newIsPassiveValue = !currentUser.isPassive; // Mevcut değerin tersini alıyoruz

    // Kullanıcının veritabanındaki bilgilerini güncelliyoruz
    axios
      .patch(
        `https://bikeapp-780bf-default-rtdb.firebaseio.com/users/${userId}.json`,
        {
          isPassive: newIsPassiveValue,
        }
      )
      .then(() => {
        // Kullanıcının "isPassive" özelliğini güncelliyoruz
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, isPassive: newIsPassiveValue };
          }
          return user;
        });
        setUsers(updatedUsers);
        setIsPassive(true);
      })
      .catch((error) => console.log(error));
  };

  const deleteUserHandler = async (userId) => {
    axios
      .delete(
        `https://bikeapp-780bf-default-rtdb.firebaseio.com/users/${userId}.json`
      )
      .then(() => {
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        //  deleteUser(userId);
        Alert.alert("Success", "User has been deleted!");
      })
      .catch((error) => console.log(error));
  };

  console.log("usss", users);
  const renderUser = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: 100,
          padding: 10,
          backgroundColor: item.isPassive
            ? Colors.primary801
            : Colors.primary800,
          margin: 5,
        }}
        onPress={() => {
          // updateUserIsPassive(item.id);
          navigation.navigate("AddUserScreen", {
            userId: item.id,
            uid: item.uid,
          });
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <Text>{item.name}</Text> */}
          <Text
            style={{
              color: item.isPassive ? Colors.primary800 : Colors.primary801,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {item.email}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Button
            style={{ width: "47%" }}
            onPress={() => deleteUserHandler(item.id)}
          >
            Delete
          </Button>
          <Button
            style={{ width: "47%" }}
            onPress={() => updateUserIsPassive(item.id)}
          >
            Passive
          </Button>
        </View>
      </TouchableOpacity>
    );
  };

  const toggleEffect = () => {
    setIsToggled(!isToggled);
  };

  return (
    <View
      style={{
        flex: 1,

        alignItems: "center",
      }}
    >
      <Button
        style={{
          padding: 10,
          width: "100%",
        }}
        onPress={() =>
          navigation.navigate("AddUserScreen", {
            userId: 0,
          })
        }
      >
        <Text
          style={{
            fontSize: 24,
            color: "white",
            textAlign: "center",
          }}
        >
          Add user
        </Text>
      </Button>

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={() => toggleEffect()}
      />
    </View>
  );
};

export default AdminScreen;

// const styles = StyleSheet.create({});
