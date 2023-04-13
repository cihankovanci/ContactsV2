import axios from "axios";

const BACKEND_URL = "https://bikeapp-780bf-default-rtdb.firebaseio.com";
export async function storeContact(contactData) {
  const response = await axios.post(
    BACKEND_URL + "/contacts.json",
    contactData
  );
  const id = response.data.name;
  return id;
}

export async function fetchContacts() {
  const response = await axios.get(BACKEND_URL + "/contacts.json");

  const contacts = [];

  console.log(response.data);

  for (const key in response.data) {
    const contactObj = {
      id: key,
      name: response.data[key].name,
      surname: response.data[key].surname,
      phone: response.data[key].phone,
    };
    contacts.push(contactObj);
  }
  return contacts;
}

export function updateContact(id, contactData) {
  return axios.put(BACKEND_URL + `/contacts/${id}.json`, contactData);
}

export function deleteContact(id) {
  return axios.delete(BACKEND_URL + `/contacts/${id}.json`);
}
