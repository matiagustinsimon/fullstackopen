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

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then((persons) => {
        return response.json(persons)
    }).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.countDocuments({}).then((count) => {
        const fecha = Date()
        response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${fecha}</p>`)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const newPerson = request.body
    Person.findOne({name: newPerson.name}).then((db_person) => {
        if (db_person) {
            return response.status(400).json({error: 'name must be unique'})
        }
        const person = new Person({
            name: newPerson.name,
            number: newPerson.number,
        })
        return person.save().then((savedPerson) => {
            response.json(savedPerson)
        })
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { number } = request.body
    Person.findById(request.params.id).then((db_person) => {
        if (!db_person) {
            return response.status(404).end()
        }
        db_person.number = number
        return db_person.save().then((savedPerson) => {
            response.json(savedPerson)
        })
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        console.log('Validation error')
        return response.status(400).json({ error: error.message })
    }
    // console.log(error.name)
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})