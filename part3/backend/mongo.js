const mongoose = require('mongoose');

const console_arguments_length = process.argv.length

if ( console_arguments_length < 3) {
    console.log('Password missing')
    process.exit()
}

const url = `mongodb+srv://matiagustinsimon_db_user:${process.argv[2]}@cluster0.ecdadol.mongodb.net/PhoneBook?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (console_arguments_length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook: ')
        result.forEach(person => {
            console.log(`${person.name}: ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else {
    if (console_arguments_length === 5) {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
        })
        person.save().then(() => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
        })
    }
    else{
        console.log('There is not an appropriated number of arguments')
        mongoose.connection.close()
    }
}


