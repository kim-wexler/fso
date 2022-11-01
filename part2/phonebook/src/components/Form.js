import React from "react"

const Form = ({
  addContact,
  newName,
  handleContactChange,
  newNum,
  handleNumChange,
}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        <h3>Add no:</h3>
        name: <input value={newName} onChange={handleContactChange} />
        <br></br>
        number: <input value={newNum} onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form