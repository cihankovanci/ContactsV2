import { createContext, useReducer } from "react";

export const ContactsContext = createContext({
  contacts: [],
  addContact: ({ phone, name, Surname }) => {},
  setContacts: (contacts) => {},
  deleteContact: (id) => {},
  updateContact: (id, { phone, name, Surname }) => {},
});

function contactsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString();  return [{ ...action.payload, id: id }, ...state];

      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableContactIndex = state.findIndex(
        (contact) => contact.id === action.payload.id
      );
      const updatableContact = state[updatableContactIndex];
      const updatedItem = { ...updatableContact, ...action.payload.data };
      const updatedContacts = [...state];
      updatedContacts[updatableContactIndex] = updatedItem;
      return updatedContacts;
    case "DELETE":
      return state.filter((contact) => contact.id !== action.payload);
    default:
      return state;
  }
}

function ContactsContextProvider({ children }) {
  const [contactsState, dispatch] = useReducer(contactsReducer, []);

  function addContact(contactData) {
    dispatch({ type: "ADD", payload: contactData });
  }

  function setContacts(contacts) {
    dispatch({ type: "SET", payload: contacts });
  }

  function deleteContact(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateContact(id, contactData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: contactData } });
  }

  const value = {
    contacts: contactsState,
    setContacts: setContacts,
    addContact: addContact,
    deleteContact: deleteContact,
    updateContact: updateContact,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsContextProvider;
