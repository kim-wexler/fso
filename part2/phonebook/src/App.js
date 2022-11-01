import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import contactService from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setContacts(initialContacts);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const oldContact = contacts.find((contact) => contact.name === newName);
    if (oldContact === undefined) {
      const contactObject = {
        name: newName,
        number: newNum,
        id: contacts.length + 1,
      };
      setContacts(contacts.concat(contactObject));
      contactService.create(contactObject).then(() => {
        setErrorMessage(`${contactObject.name} added`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
    } else {
      if (
        window.confirm(
          `${oldContact.name} is already added to phonebook, \
replace the old number with a new one?`
        )
      ) {
        const contactObject = { ...oldContact, number: newNum };
        contactService.update(oldContact.id, contactObject).then(() => {
          setContacts(
            contacts.map((contact) =>
              contact === oldContact ? contactObject : contact
            )
          );
          setErrorMessage(`${contactObject.name} updated`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
      }
    }
    setNewName("");
    setNewNum("");
    setIsError(false);
  };

  const handleContactChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={isError} />
      Search:{" "}
      <input value={newSearch} type="text" onChange={handleSearchChange} />
      <Form
        addContact={addContact}
        newName={newName}
        handleContactChange={handleContactChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Filter
        contacts={contacts}
        newSearch={newSearch}
        setContacts={setContacts}
        setErrorMessage={setErrorMessage}
        setIsError={setIsError}
      />
    </div>
  );
};

export default App;
