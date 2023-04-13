import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

import { useNavigation } from "@react-navigation/native";

function ContactItem({ id, phone, surname, name }) {
  const navigation = useNavigation();
  function contactPressHandler() {
    navigation.navigate("Add", {
      contactId: id,
    });
  }
  return (
    <Pressable
      onPress={contactPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.contactItem}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.SurnameText}>{surname}</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{phone}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ContactItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  contactItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary50000,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray50000,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  nameText: {
    color: Colors.primary5000,
    padding: 4,
    fontSize: 16,
  },
  SurnameText: {
    color: Colors.primary5000,
    padding: 4,
    fontWeight: "bold",
    fontSize: 16,
  },

  nameContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  name: {
    color: Colors.primary50000,
    fontWeight: "bold",
  },
});
