import { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

import Input from "./Input";
import Button from "./Button";
// import { getFormatedSurname } from "../../utils/Surname";
import { Colors, GlobalStyles } from "../../constants/styles";

function ContactsForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    Name: {
      value: defaultValues ? defaultValues.Name : "",
      isValid: true,
    },
    Surname: {
      value: defaultValues ? defaultValues.Surname : "",
      isValid: true,
    },
    Phone: {
      value: defaultValues ? defaultValues.Phone : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const contactData = {
      Name: inputs.Name.value,
      Surname: inputs.Surname.value,
      Phone: inputs.Phone.value,
    };

    const NameIsValid = true;
    const SurnameIsValid = true;
    const PhoneIsValid = true;

    if (!NameIsValid || !SurnameIsValid || !PhoneIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          Name: { value: curInputs.Name.value, isValid: NameIsValid },
          Surname: { value: curInputs.Surname.value, isValid: SurnameIsValid },
          Phone: {
            value: curInputs.Phone.value,
            isValid: PhoneIsValid,
          },
        };
      });
      return;
    }

    onSubmit(contactData);
  }

  const formIsInvalid =
    !inputs.Name.isValid || !inputs.Surname.isValid || !inputs.Phone.isValid;

  return (
    <View style={styles.form}>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Name"
          invalid={!inputs.Name.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "Name"),
            value: inputs.Name.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Surname"
          invalid={!inputs.Surname.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "Surname"),
            value: inputs.Surname.value,
          }}
        />
      </View>
      <Input
        label="Phone"
        invalid={!inputs.Phone.isValid}
        textInputConfig={{
          //   multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          keyboardType: "phone-pad",
          onChangeText: inputChangedHandler.bind(this, "Phone"),
          value: inputs.Phone.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ContactsForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    margin: 8,
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
