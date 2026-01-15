import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => (
    <div>filter shown with <input value={value} onChange={onChange}/></div>
)

const PersonForm = ({onSubmit, newName, handleName, newNumber, handleNumber}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>name: <input value={newName} onChange={handleName}/></div>
            <div>number: <input value={newNumber} onChange={handleNumber}/></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Person = ({name, number}) => {
    return (<li>{name} {number}</li>)
}

const Persons = ({personsToShow}) => {
    return (
        <ul>
            {personsToShow.map(person =>
                <Person key={person.id} name={person.name} number={person.number}/>
            )}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    const handleFetch = () => {
        axios.get('http://localhost:3001/persons').then((response) => {
            setPersons(response.data)
        })
    }

    useEffect(handleFetch, [])

    const personsToShow = search === ''
        ? persons
        : persons.filter(person =>
            person.name.toLowerCase().includes(search.toLowerCase())
        )

    const handleNameChange = event => setNewName(event.target.value)
    const handleNumberChange = event => setNewNumber(event.target.value)
    const handleSearchChange = event => setSearch(event.target.value)

    const addPerson = event => {
        event.preventDefault()
        if (persons.some(person => person.name.trim() === newName.trim())) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const newPersonObject = {
            name: newName.trim(),
            number: newNumber.trim(),
            id: String(persons.length + 1)
        }

        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter value={search} onChange={handleSearchChange}/>

            <h3>Add a new</h3>

            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                handleName={handleNameChange}
                newNumber={newNumber}
                handleNumber={handleNumberChange}
            />

            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App