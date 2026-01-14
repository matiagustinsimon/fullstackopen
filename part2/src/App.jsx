import {useState} from 'react'

const Person = ({name, phone}) => <li>{name} {phone}</li>

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            phone: '012345-6789'
        }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleNameChange = event => {
        setNewName(event.target.value)
    }
    const handlePhoneChange = event => {
        setNewPhone(event.target.value)
    }

    const addPerson = event => {
        event.preventDefault()
        if (persons.some(person => person.name.trim() === newName.trim())) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const newPersonObject = {
            name: newName.trim(),
            phone: newPhone.trim()
        }
        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewPhone('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => <Person key={person.name} name={person.name} phone={person.phone}/>)}
            </ul>
        </div>
    )
}

export default App