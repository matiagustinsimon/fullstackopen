import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => axios.get(url)
    .then((response) => response.data)

const create = newObject => axios.post(url, newObject)
    .then((response) => response.data)

const update = (id, newObject) => axios.put(`${url}/${id}`, newObject)
    .then((response) => response.data)

const remove = id => axios.delete(`${url}/${id}`)

export default { getAll, create, update, remove}