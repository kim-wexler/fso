import React from "react"

const Filter = ({ persons, newSearch }) => {
  return (
    <div>
      {persons.map((person) => {
        if (
          newSearch === "" ||
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        ) {
          return (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          );
        }
      })}
    </div>
  );
};


export default Filter