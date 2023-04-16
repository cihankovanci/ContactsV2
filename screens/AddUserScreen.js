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
  const [email, setEmail] = useState({ updateemail });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateemail } = route.params;

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
        <View>
          <Text>{updateemail}</Text>
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
