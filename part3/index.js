const express = require('express')
const app = express()

app.use(express.json())

let personsJSON = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
personsJSON.map(person => console.log(person))

const generateId = () => {
    let newID = Math.floor(Math.random() * 10000)
    if (personsJSON.find(person => person.id === newID.toString())) {
        return generateId()
    }
    return newID
}

app.get('/api/persons', (request, response) => {
    response.json(personsJSON)
})

app.get('/info', (request, response) => {
    const fecha = Date()
    response.send(`
        <p>Phonebook has info for ${personsJSON.length} people</p>
        <p>${fecha}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = personsJSON.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

app.post('/api/persons', (request, response) => {
    const newPerson = request.body
    if (!newPerson.name) {
        return response.status(400).json({ error: 'no name sent' })
    }
    if (!newPerson.number) {
        return response.status(400).json({ error: 'no number sent' })
    }
    if (personsJSON.some(person => person.name === newPerson.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }
    newPerson.id = generateId().toString()
    personsJSON.push(newPerson)
    response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    console.log(`Persona borrada: `, personsJSON.find(p => p.id === id));
    personsJSON = personsJSON.filter(p => p.id !== id)
    personsJSON.map(person => console.log(person))
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})