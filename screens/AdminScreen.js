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
import Button from "../components/UI/Button";

const AdminScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

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
      })
      .catch((error) => console.log(error));
  };

  const deleteUserHandler = (userId) => {
    axios
      .delete(
        `https://bikeapp-780bf-default-rtdb.firebaseio.com/users/${userId}.json`
      )
      .then(() => {
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        Alert.alert("Success", "User has been deleted!");
      })
      .catch((error) => console.log(error));
  };

  const renderUser = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: item.isPassive ? "green" : "lightgreen",
          margin: 5,
        }}
        // onPress={() => {
        //   updateUserIsPassive(item.id);
        // }}
      >
        <View>
          <Text>{item.name}</Text>
          <Text>{item.email}</Text>
          <Text>Admin ? {item.admin ? "true" : "false"}</Text>
          <Text>{item.isPassive ? "Passive" : "Active"}</Text>
        </View>

        <Button
          style={{ margin: 5 }}
          onPress={() => deleteUserHandler(item.id)}
        >
          Delete
        </Button>
        <Button onPress={() => updateUserIsPassive(item.id)}>Passive</Button>
      </TouchableOpacity>
    );
  };

  const toggleEffect = () => {
    setIsToggled(!isToggled);
  };

  return (
    <View>
      <Button onPress={() => navigation.navigate("AddUserScreen")}>
        Add user
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
