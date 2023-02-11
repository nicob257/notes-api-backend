const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')
app.use(cors())
app.use(express.json())
app.use(logger)
let notes = [
    {
        id: 1,
        content: "Me tengo que suscribir a @midudev en youtube y Twitch",
        date: "2023-02-08TBlabla.11",
        important: true
    },
    {
        id: 2,
        content: "Tengo que estudiar las clases del FullStack Bootcamp",
        date: "2023-02-08TBlabla.21",
        important: false
    },
    {
        id: 3,
        content: "Repasar los retos de JS de midudev",
        date: "2023-02-08TBlabla.1211",
        important: true
    }
]

/* 
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
}) */
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    } else {
        response.status(404).end()
    } 
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if(!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }
    const ids = notes.map(note => note.id)
    const maxId = Math.max( ... ids)
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString
    }

    notes = notes.concat(newNote)

    response.status(201).json(newNote)
    
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
