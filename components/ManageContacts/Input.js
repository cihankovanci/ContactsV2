import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/styles";
function Input({ label, textInputConfig, style, invalid }) {
  let inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.primary50000,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary500,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: "white",
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: Colors.error50000,
  },
  invalidInput: {
    backgroundColor: "red",
  },
});
