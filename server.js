import Fastify from 'fastify'
import { DatabaseMemory } from './DatabaseMemory.js'

const database = new DatabaseMemory()

const app = Fastify({
    logger: true
})

app.get('/videos', async (req, reply) => {
    const videos = database.list()

    return videos
})

app.post('/videos', async (req, reply) => {
    const { title, description, duration } = req.body 

    const video = {
        title,
        description,
        duration
    }

    database.create(video)

    return reply.status(201).send()
})


app.put('/videos/:id', (req, reply) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body

    database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

try {
    await app.listen({ port: 3333 })
} catch (err) {
    app.log.error(err)
    process.exit(1)
}