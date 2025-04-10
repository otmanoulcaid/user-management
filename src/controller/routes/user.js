import schema from '../schemas/post.js'

export default (fastify) => {

    /**
     * middelwares will be implemented later
     */

    fastify.post('/add', schema, async (request, reply) => {
        try {
            await fastify.userService.addUser(request.body.data);
            reply.code(201).send({
                user:  request.body.data
            });
        } catch (error) {
            fastify.log.error(error.msg, error.stack);
            reply.code(400).send({
                message: error.message
            });
        }
    });
    
    fastify.post('/update', schema, async (request, reply) => {
        try {
            await fastify.userService.updateUser(request.body.user, request.body.data);
            reply.code(201).send({
                user:  request.body.data
            });
        } catch (error) {
            fastify.log.error(error.msg, error.stack);
            reply.code(400).send({
                message: error.message
            });
        }
    });
    
    fastify.get('/', async (request, reply) => {
        const users = await fastify.userService.getUsers();
        return { users };
    });
    
    fastify.get('/:username', async (req, rep) => {
        const user = await fastify.userService.getUser(req.params.username);
        return { user };
    })
    
    fastify.delete('/:username', async (req, rep) => {
        await fastify.userService.deleteUser(req.params.username);
        return {
            status: 'deleted successfuly',
        };
    });

}
