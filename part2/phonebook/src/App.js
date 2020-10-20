import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import services from "./services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");
  const [flashMessage, setFlashMessage] = useState({
    message: null,
    type: "",
  });

  useEffect(() => {
    services.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const result = persons.findIndex((person) => person.name === newName);
    if (result === -1) {
      const newPerson = { name: newName, number: newNumber };
      services.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        const message = `Added ${returnedPerson.name}`;
        const type = "success";
        setFlashMessage({ message, type });
        setTimeout(() => {
          setFlashMessage({ ...flashMessage, message: null });
        }, 3000);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { name: newName, number: newNumber };
        const id = persons[result].id;
        services
          .updatePerson(id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
            const message = `Updated ${returnedPerson.name}`;
            const type = "success";
            setFlashMessage({ message, type });
            setTimeout(() => {
              setFlashMessage({ ...flashMessage, message: null });
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const nameChangedHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangedHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const searchChangedHandler = (event) => {
    setNewSearch(event.target.value);
  };

  const deleteHandler = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      services
        .deletePerson(id)
        .then((deleteResponse) => {
          console.log(deleteResponse);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          const message = `Information of ${name} has already been deleted`;
          const type = "error";
          setFlashMessage({ message, type });
          setTimeout(() => {
            setFlashMessage({ ...flashMessage, message: null });
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={search} changed={searchChangedHandler} />

      <Notification {...flashMessage} />

      <h2>add new</h2>

      <PersonForm
        submited={submitHandler}
        nameValue={newName}
        nameChanged={nameChangedHandler}
        numberValue={newNumber}
        numberChanged={numberChangedHandler}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} clicked={deleteHandler} />
    </div>
  );
};

export default App;
