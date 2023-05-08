import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const PhonebookList = ({ persons, search, handleDeletePerson }) => {
  if (persons.length === 0) {
    return <div>The phonebook is empty!</div>;
  }

  if (search === "") {
    return persons.map((person) => (
      <div key={person.name}>
        {" "}
        {`${person.name} ${person.number}`}{" "}
        <button value={person.id} onClick={handleDeletePerson}>
          delete
        </button>{" "}
      </div>
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
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleAddNew = (event) => {
    event.preventDefault();
    const personToUpdate = persons.find((value) => value.name === newName);
    if (personToUpdate) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personService
          .update(updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            alert("Number updated successfully!");
          })
          .catch((response) => {
            alert(
              "An unexpected error occurred while updating the phone number. Please try again!"
            );
            window.location.reload();
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
      });
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

  const handleDeletePerson = (event) => {
    if (
      window.confirm(
        `Are you sure you would like to delete this entry from the phonebook?`
      )
    ) {
      personService
        .deletePerson(event.target.value)
        .then((response) => {
          alert("Deleted successfully!");
        })
        .catch((response) => {
          alert("This user was already deleted from the phonebook.");
        });
      setPersons(
        persons.filter((person) => person.id !== parseInt(event.target.value))
      );
    }
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
      <PhonebookList
        persons={persons}
        search={search}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
