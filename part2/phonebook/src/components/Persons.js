import React from "react";

const Persons = ({ personsToShow, clicked }) => {
  return (
    <div>
      {personsToShow.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}{" "}
          <button onClick={() => clicked(person.name, person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
