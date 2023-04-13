import { StyleSheet, View, Text } from "react-native";
import { Colors, GlobalStyles } from "../../constants/styles";
import ContactsList from "./ContactsList";
// import ContactsSummary from "./ContactsSummary";

function ContactsOutput({ contacts }) {
  // let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  // if (contacts.length > 0) {
  //   content = <ContactsList contacts={contacts} />;
  // }
  return (
    <View style={styles.container}>
      <ContactsList contacts={contacts} />
    </View>
  );
}

export default ContactsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: Colors.primary70000, //GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
