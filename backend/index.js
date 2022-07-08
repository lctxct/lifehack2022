require('dotenv').config()
const fastify = require('fastify')({ bodyLimit: 12485760 })
const mongoSanitize = require('express-mongo-sanitize');

const Connection = require('./mongoDB.js')
const authentication = require('./authentication.js')
const NodeCache = require('node-cache');

const main = async () => {

    if (await Connection.open()) {
        // mongoSanitize hook
        fastify.addHook('preHandler', (request, reply, done) => {
            mongoSanitize.sanitize(request.body, {});
            mongoSanitize.sanitize(request.params, {});
            done()
        })

        const cors = require("@fastify/cors");
        await fastify.register(cors)
        console.info("CORS enabled")

        // Create signer object in authentication.js
        authentication.createSigner()

        fastify.register((instance, opts, done) => {
			fastify.post('/login', require('./controllers/auth/login.js'));
			fastify.post('/create', require('./controllers/auth/register.js'));
			done()
		})

        fastify.register((instance, opts, done) => {
            // register auth routes to only this context
            instance.decorateRequest('locals', null)
            instance.addHook('preHandler', authentication.authenticated) // authentication hook

            fastify.post('/create_volunteer_opportunity', require('./controllers/listing/create.js'));
            fastify.post('/search_volunteer_opportunity', require('./controllers/listing/create.js'));
            fastify.get('/display_volunteer_opportunity', require('./controllers/listing/listing.js'));
            
            fastify.get("/test", async (req, res) => {
                res.send({msg: "moshi moshi"})
            })
            done()
        })

        try {
			await fastify.listen({port: 20008, host: '0.0.0.0'})
			console.log("Web server started")
		} catch (err) {
			console.log("Error starting web server... exiting")
			console.error(err)
			process.exit(1)
		}
    }
    else console.error("Error connecting to MongoDB")

}

main()