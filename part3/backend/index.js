require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan((tokens, req, res) => {
    const arrayFormat = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ]
    if (tokens.method(req, res) === "POST") {
        arrayFormat.push(JSON.stringify(req.body))
    }
    return arrayFormat.join(' ')
}))

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        return response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then((count) => {
        const fecha = Date()
        response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${fecha}</p>`)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.post('/api/persons', (request, response) => {
    const newPerson = request.body
    if (!newPerson.name) {
        return response.status(400).json({ error: 'no name sent' })
    }
    if (!newPerson.number) {
        return response.status(400).json({ error: 'no number sent' })
    }
    Person.findOne({ name: newPerson.name }).then((db_person) => {
        if (db_person) {return response.status(400).json({ error: 'name must be unique' })}
        const person = new Person({
            name: newPerson.name,
            number: newPerson.number,
        })

        person.save().then((savedPerson) => {
            response.json(savedPerson)
        })
    })
})

//Useful later
// app.delete('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     console.log(`Persona borrada: `, personsJSON.find(p => p.id === id));
//     personsJSON = personsJSON.filter(p => p.id !== id)
//     personsJSON.map(person => console.log(person))
//     response.status(204).end()
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})