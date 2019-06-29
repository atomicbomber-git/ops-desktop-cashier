import PouchDB from 'pouchdb-browser'
import Config from './config'
import Hash from './hash'
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind)
const db = new PouchDB(Config.database_name)

if (process.env.NODE_ENV !== 'production') {
    console.log("Attempting to connect to the CouchDB debug server.")
    if (!process.env.COUCHDB_DEBUG_SERVER_USERNAME || !COUCHDB_DEBUG_SERVER_USERNAME) {
        console.log("Can't connect to the CouchDB debug server, either username or password isn't available in the .env")
    }
    else {
        db.sync(Config.database_debug_server_url, {
            auth: {
                'username': process.env.COUCHDB_DEBUG_SERVER_USERNAME,
                'password': COUCHDB_DEBUG_SERVER_USERNAME,
            }
        })
        .catch(error => {
            console.log("Can't connect to the CouchDB debug server: Either the username or the password is invalid.")
        })
    }
}

function createAdminAccount() {
    db.put({
        _id: 'administrator',
        type: 'user',
        password: Hash.make('administrator'),
        name: "Mr. Administrator",
    })
}

db.createIndex({
    index: { fields: ['type']}
})

/* Create a default administrator account if one hasn't already existed */
db.get('administrator')
    .catch(error => {
        if (error.name === "not_found") {
            createAdminAccount()
        }
    })

export default db