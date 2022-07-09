require('dotenv').config()
const fastify = require('fastify')({ bodyLimit: 12485760 })
const mongoSanitize = require('express-mongo-sanitize');

const Connection = require('./mongoDB.js')
const authentication = require('./authentication.js')
const NodeCache = require('node-cache');

global.NodeCacheObj = new NodeCache({ checkperiod: 0, useClones: false })

const main = async () => {

    if (await Connection.open()) {
        NodeCacheObj.set("categoryMapping", [
            "Animal Welfare",
            "Arts & Heritage",
            "Children & Youth",
            "Community",
            "Disability",
            "Education",
            "Elderly",
            "Environment",
            "Families",
            "Health",
            "Humanitarian",
            "Social Service",
            "Sports",
            "Women & Girls",
          ])
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
            instance.post('/login', require('./controllers/auth/login.js'));
            instance.post('/create', require('./controllers/auth/register.js'));
            done()
        })

        fastify.register((instance, opts, done) => {
            // register auth routes to only this context
            instance.decorateRequest('locals', null)
            instance.addHook('preHandler', authentication.authenticated) // authentication hook

            instance.post('/create_volunteer_opportunity', require('./controllers/listing/create.js'));
            instance.post('/generate_training', require('./controllers/listing/generate_training.js'));
            instance.post('/search_volunteer_opportunity', require('./controllers/listing/search.js'));
            instance.get('/display_volunteer_opportunity', require('./controllers/listing/listing.js'));

            instance.get('/list_users', require('./controllers/users/list.js'));
            instance.post('/get_user', require('./controllers/users/getUser.js'));
            instance.post('/create_experience', require('./controllers/users/writeExperience.js'));
            instance.post('/find_buddy', require('./controllers/users/findBuddy.js'));

            instance.get('/list_organisations', require('./controllers/organisation/list.js'));
            instance.post('/create_organisation', require('./controllers/organisation/create.js'));
            instance.post('/query_organisation', require('./controllers/organisation/query.js'));

            done()
        })

        try {
            await fastify.listen({ port: 20008, host: '0.0.0.0' })
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