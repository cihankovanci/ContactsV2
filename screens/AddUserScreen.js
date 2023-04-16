import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import axios from "axios";
import Input from "../components/Auth/Input";
import Button from "../components/UI/Button";
import { Colors } from "../constants/styles";
async function signUp(email, password, isAdmin) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDm1IfuwqnahMn6AeztWbB6qWXrmoQSKo4`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  console.log("New user created");
  console.log("idToken", response.data.idToken);
  console.log("user", response.data);

  const token = response.data.idToken;
  const uid = response.data.localId;

  // Firebase Realtime Database'e kullanıcı bilgilerini kaydetmek için HTTP POST isteği yapılır
  axios
    .post(`https://bikeapp-780bf-default-rtdb.firebaseio.com/users.json`, {
      token,
      email,
      uid,
      admin: isAdmin,
      isPassive: false,
    })
    .then((response) => {
      console.log("User data saved successfully");
      console.log(response.data);
    })
    .catch((error) => {
      console.log("Error saving user data");
      console.log(error);
    });

  return token;
}

const AddUserScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { userId } = route.params;

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await signUp(email, password, false);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateUserEmail = (userId, newEmail) => {
    // Kullanıcının veritabanındaki bilgilerini güncelliyoruz
    axios
      .patch(
        `https://bikeapp-780bf-default-rtdb.firebaseio.com/users/${userId}.json`,
        {
          email: newEmail,
        }
      )
      .then(() => {
        // Kullanıcının "email" özelliğini güncelliyoruz
        const updatedUsers = users.map((user) => {
          if (user.id === userId) {
            return { ...user, email: newEmail };
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  return (
    // <View>
    //   <Text>E-mail</Text>
    //   <TextInput
    //     value={email}
    //     onChangeText={(text) => setEmail(text)}
    //     style={{ borderColor: "gray", borderWidth: 1, padding: 5 }}
    //   />
    //   <Text>Password</Text>
    //   <TextInput
    //     value={password}
    //     onChangeText={(text) => setPassword(text)}
    //     style={{ borderColor: "gray", borderWidth: 1, padding: 5 }}
    //     secureTextEntry={true}
    //   />
    //   <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />
    // </View>

    <View style={styles.container}>
      <View style={styles.form}>
        {userId === 0 ? (
          <View>
            <Input
              label="Email Address"
              value={email}
              onUpdateValue={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            <Input
              label="Password"
              value={password}
              onUpdateValue={(text) => setPassword(text)}
              style={{ borderColor: "gray", borderWidth: 1, padding: 5 }}
              secureTextEntry={true}
            />

            <View style={styles.buttons}>
              <Button title="Sign Up" onPress={handleSignUp} disabled={loading}>
                Kayıt ol
              </Button>
            </View>
          </View>
        ) : (
          <>
            <Input
              label="Email Address"
              value={email}
              onUpdateValue={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            <Button
              title="Update"
              onPress={() => updateUserEmail(userId, email)}
              disabled={loading}
            >
              Update
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  container: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});
