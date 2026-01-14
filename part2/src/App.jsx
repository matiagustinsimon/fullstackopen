import {useState} from 'react'

const Filter = ({value, onChange}) => <div>filter shown with <input value={value} onChange={onChange}/></div>

const PersonForm = ({onSubmit, newName, handleName, newPhone, handlePhone}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>name: <input value={newName} onChange={handleName}/></div>
            <div>number: <input value={newPhone} onChange={handlePhone}/></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Person = ({name, phone}) => <li>{name} {phone}</li>

const Persons = ({personsToShow}) =>
    <ul>
        {personsToShow.map(person => <Person key={person.id} name={person.name} phone={person.phone}/>)}
    </ul>

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', phone: '040-123456', id: 1},
        {name: 'Ada Lovelace', phone: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', phone: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [search, setSearch] = useState('')

    const personsToShow = search === ''
        ? persons
        : persons.filter(person =>
            person.name.toLowerCase().includes(search.toLowerCase())
        )

    const handleNameChange = event => setNewName(event.target.value)
    const handlePhoneChange = event => setNewPhone(event.target.value)
    const handleSearchChange = event => setSearch(event.target.value)

    const addPerson = event => {
        event.preventDefault()
        if (persons.some(person => person.name.trim() === newName.trim())) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const newPersonObject = {
            name: newName.trim(),
            phone: newPhone.trim(),
            id: persons.length + 1
        }
        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewPhone('')
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
                newPhone={newPhone}
                handlePhone={handlePhoneChange}
            />

            <h3>Numbers</h3>

            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App