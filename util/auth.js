import axios from "axios";

const API_KEY = "AIzaSyDm1IfuwqnahMn6AeztWbB6qWXrmoQSKo4";

async function authenticate(mode, email, password, isAdmin) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
    isAdmin: false,
  });
  console.log("login");
  console.log("idToken", response.data.idToken);
  console.log("user", response.data);
  const token = response.data.idToken;
  const uid = response.data.localId;

  {
    mode == "signUp" &&
      axios
        .post(`https://bikeapp-780bf-default-rtdb.firebaseio.com/users.json`, {
          token,
          email,
          uid,
          admin: isAdmin,
          isPassive: false,
        })
        .then((response) => console.log(response.data));
  }
  return token;
}

export function createUser(email, password, isAdmin) {
  return authenticate("signUp", email, password, isAdmin);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
