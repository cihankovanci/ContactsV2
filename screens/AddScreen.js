import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import ContactsForm from "../components/ManageContacts/ContactsForm";

import { Colors } from "../constants/styles";
import { ContactsContext } from "../util/contacts-context";
import { deleteContact, storeContact, updateContact } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const AddScreen = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const contactCtx = useContext(ContactsContext);
  const editedContactId = route.params?.contactId;

  const isEditing = !!editedContactId;

  const selectedContact = contactCtx.contacts.find(
    (contact) => contact.id === editedContactId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Contact" : "Add Contact",
    });
  }, [navigation, isEditing]);

  async function deleteContactHandler() {
    setIsSubmitting(true);
    try {
      await deleteContact(editedContactId);
      contactCtx.deleteContact(editedContactId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete contact - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(contactData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        contactCtx.updateContact(editedContactId, contactData);
        await updateContact(editedContactId, contactData);
      } else {
        const id = await storeContact(contactData);
        contactCtx.addContact({ ...contactData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data- please try again later");
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.rootContainer}>
      <ContactsForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedContact}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={Colors.error50000}
            size={36}
            onPress={deleteContactHandler}
          />
        </View>
      )}
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,

    padding: 32,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary20000,
    alignItems: "center",
  },
});
