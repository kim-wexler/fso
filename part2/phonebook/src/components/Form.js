import React from "react"

const Form = ({addPerson, newName, handlePersonChange, newNum, handleNumChange}) => {
    return (
            <form onSubmit={addPerson}>
                <div>
                    <h3>Add no:</h3>
                    name: <input value={newName} onChange={handlePersonChange}/>
                    <br></br>
                    number: <input value={newNum} onChange={handleNumChange}/>
                </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form