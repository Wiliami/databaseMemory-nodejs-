import Fastify from 'fastify'
import { DatabaseMemory } from './DatabaseMemory.js'

const databaseMemory = new DatabaseMemory()

const fastify = Fastify({
    logger: true
})

fastify.get('/videos', async (req, reply) => {
    const videos = databaseMemory.list()

    return videos
})

fastify.post('/videos', async (req, reply) => {
    const { title, description, duration } = req.body 

    const video = {
        title,
        description,
        duration
    }

    databaseMemory.create(video)

    return reply.status(201).send()
})

try {
    await fastify.listen({ port: 3333 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}