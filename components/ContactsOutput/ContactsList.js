import { FlatList } from "react-native";
import ContactItem from "./ContactItem";
import { useContext } from "react";
import { ContactsContext } from "../../util/contacts-context";

function renderContactItem(itemData) {
  return <ContactItem {...itemData.item} />;
}

function ContactsList({ contacts }) {
  return (
    <FlatList
      data={contacts}
      renderItem={renderContactItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ContactsList;
