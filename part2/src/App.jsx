import {useState, useEffect} from 'react'
import personService from "./services/persons.js";

const Filter = ({value, onChange}) => (
    <div>filter shown with <input value={value} onChange={onChange}/></div>
)

const PersonForm = ({onSubmit, newName, newNumber, handlePerson}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>name: <input name="name" value={newName} onChange={handlePerson}/></div>
            <div>number: <input name="number" value={newNumber} onChange={handlePerson}/></div>
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
    const [newPerson, setNewPerson] = useState({
        name: '',
        number: ''
    })
    const [search, setSearch] = useState('')
    console.log(newPerson)

    const handleFetch = () => {
        personService.getAll().then(initialPersons => {setPersons(initialPersons)})
    }

    useEffect(handleFetch, [])

    const personsToShow = search === ''
        ? persons
        : persons.filter(person =>
            person.name.toLowerCase().includes(search.toLowerCase())
        )

    const handleNewPersonChange = event => {
        setNewPerson({
            ...newPerson,
            [event.target.name]: event.target.value
        })
    }

    const handleSearchChange = event => setSearch(event.target.value)

    const addPerson = event => {
        event.preventDefault()
        if (persons.some(person => person.name.trim() === newPerson.name.trim())) {
            alert(`${newPerson.name} is already added to phonebook`)
            return
        }

        const newPersonObject = {
            name: newPerson.name.trim(),
            number: newPerson.number.trim(),
        }
        personService.create(newPersonObject)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson))
                setNewPerson({
                    name: '',
                    number: ''
                })
            })


    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter value={search} onChange={handleSearchChange}/>

            <h3>Add a new</h3>

            <PersonForm
                onSubmit={addPerson}
                newName={newPerson.name}
                newNumber={newPerson.number}
                handlePerson={handleNewPersonChange}
            />

            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App