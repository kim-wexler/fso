import axios from "axios";
import React from "react";

const deleteContact = (
  contact,
  contacts,
  setContacts,
  setErrorMessage,
  setIsError
) => {
  if (window.confirm(`Delete ${contact.name}?`)) {
    const url = `http://localhost:3001/persons/${contact.id}`;
    axios
      .delete(url)
      .then(
        setContacts(
          contacts.filter((contact_) => contact_.name !== contact.name)
        )
      )
      .catch((error) => {
        setErrorMessage(`${contact.name} already removed from server`);
        setIsError(true);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  }
};

const Filter = ({
  contacts,
  newSearch,
  setContacts,
  setErrorMessage,
  setIsError,
}) => {
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
                onClick={() =>
                  deleteContact(
                    person,
                    contacts,
                    setContacts,
                    setErrorMessage,
                    setIsError
                  )
                }
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
