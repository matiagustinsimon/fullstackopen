import { useState } from 'react'

const Person = ({ name }) => <li>{name}</li>

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleNameChange = event => {
        setNewName(event.target.value)
    }
    const addPerson = event => {
        event.preventDefault()
        const newPersonObject = {
            name: newName
        }
        setPersons(persons.concat(newPersonObject))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => <Person key={person.name} name={person.name} />)}
            </ul>
        </div>
    )
}

export default App