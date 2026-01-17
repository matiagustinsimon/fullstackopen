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

const Person = ({person, handleDelete}) => {
    return (<li>{person.name} {person.number}
        <button onClick={() => handleDelete(person)}>delete</button>
    </li>)
}

const Persons = ({personsToShow, handleDelete}) => {
    return (
        <ul>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} handleDelete={handleDelete}/>
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

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

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
        const existingPerson = persons.find(person => person.name.trim() === newPerson.name.trim())
        if (existingPerson) {
            if (existingPerson.number === newPerson.number) {
                alert(`${newPerson.name} is already added to phonebook`)
                return;
            }
            if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                const personToUpdate = {...existingPerson, number: newPerson.number}
                personService
                    .update(existingPerson.id,personToUpdate)
                    .then(updatedPerson => {
                        setPersons(persons.map(p => (updatedPerson.id === p.id) ? updatedPerson : p))
                        setNewPerson({ name: '', number: '' })
                    })
                return;
            }
            return;
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

    const handleDelete = personToDelete => {
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            personService
                .remove(personToDelete.id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== personToDelete.id))
                })
        }
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
            <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
        </div>
    )
}

export default App