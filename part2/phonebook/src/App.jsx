import { useState, useEffect } from "react";
import axios from "axios";

const PhonebookList = ({ persons, search }) => {
  if (search === "") {
    return persons.map((person) => (
      <div key={person.name}> {`${person.name} ${person.number}`} </div>
    ));
  }

  let personsFiltered = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return personsFiltered.map((person) => (
    <div key={person.name}> {`${person.name} ${person.number}`} </div>
  ));
};

const AddNewForm = ({
  handleAddNew,
  newName,
  handleNameChanged,
  newNumber,
  handleNumberChanged,
}) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={handleAddNew}>
        <div>
          name: <input value={newName} onChange={handleNameChanged} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const SearchFilter = ({ search, handleSearchChanged }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={search} onChange={handleSearchChanged} />
      </div>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleAddNew = (event) => {
    event.preventDefault();

    if (persons.find((value) => value.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChanged = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChanged = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChanged = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <SearchFilter search={search} handleSearchChanged={handleSearchChanged} />
      <AddNewForm
        handleAddNew={handleAddNew}
        newName={newName}
        handleNameChanged={handleNameChanged}
        newNumber={newNumber}
        handleNumberChanged={handleNumberChanged}
      />
      <h2>Numbers</h2>
      <PhonebookList persons={persons} search={search} />
    </div>
  );
};

export default App;
