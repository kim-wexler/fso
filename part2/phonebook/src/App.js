import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import axios from "axios";

const App = () => {

  axios.get('http://localhost:3001/persons') .then(response => {
      console.log(response.data)
    })

  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (!persons.some((element) => element.name === newName)) {
      const personObject = {
        name: newName,
        number: newNum,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
    } else {
      alert(`${newName} already in phone book`);
    }
  };

  const handlePersonChange = (event) => {
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
      Search:{" "}
      <input value={newSearch} type="text" onChange={handleSearchChange} />
      <Form
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <Filter persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;
