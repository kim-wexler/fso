import axios from "axios";
import React from "react";

const deleteContact = (contact, contacts, setContacts) => {
  if (window.confirm(`Delete ${contact.name}?`)) {
    const url = `http://localhost:3001/persons/${contact.id}`;
    axios
      .delete(url)
      .then(
        setContacts(
          contacts.filter((contact_) => contact_.name !== contact.name)
        )
      );
  }
};

const Filter = ({ contacts, newSearch, setContacts }) => {
  return (
    <div>
      {contacts.map((person) => {
        if (
          newSearch === "" ||
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        ) {
          return (
            <p key={person.id}>
              {" "}
              {person.name} {person.number}
              <button
                onClick={() => deleteContact(person, contacts, setContacts)}
              >
                delete
              </button>
            </p>
          );
        }
      })}
    </div>
  );
};

export default Filter;