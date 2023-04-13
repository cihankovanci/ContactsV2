import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { AuthContext } from "../store/auth-context";
import ContactsForm from "../components/ManageContacts/ContactsForm";
import ContactsOutput from "../components/ContactsOutput/ContactsOutput";
import { ContactsContext } from "../util/contacts-context";
import { fetchContacts } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
function ContactsScreen() {
  const contactsCtx = useContext(ContactsContext);
  const [fetchedContacts, setFetchedContacts] = useState([]);
  const [fetchedMessage, setFetchedMessage] = useState("");
  const [data, setData] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  //   useEffect(() => {
  //     async function getContacts() {
  //       const contacts = await fetchContacts();
  //       contactsCtx.setContacts(contacts);
  //       console.log("fet", contactsCtx.contacts);
  //     }
  //     getContacts();
  //   }, []);
  const [contacts, setContacts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Firebase'den verileri çekmek için axios kullanabiliriz
    axios
      .get("https://bikeapp-780bf-default-rtdb.firebaseio.com/contacts.json")
      .then((response) => {
        // response.data'daki verileri flatlist'e uygun hale getirip state'e set ediyoruz
        const data = response.data;
        const formattedContacts = Object.keys(data).map((key) => {
          return {
            id: key,
            name: data[key].Name || "",
            surname: data[key].Surname || "",
            phone: data[key].Phone || "",
          };
        });
        setContacts(formattedContacts);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, [contacts]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = contacts.filter((item) => item.name.includes(text));
    setFilteredData(filtered);
  };

  return (
    <View style={styles.rootContainer}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }}
        onChangeText={handleSearch}
        value={searchText}
        placeholder="Ara..."
      />
      <ContactsOutput
        contacts={filteredData.length > 0 ? filteredData : contacts}
      />
    </View>
  );
}

export default ContactsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
