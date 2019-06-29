import PouchDB from 'pouchdb-browser'
import Config from './config'
import Hash from './hash'
import PouchDBFind from 'pouchdb-find'
import { remote } from 'electron'

PouchDB.plugin(PouchDBFind)
const db = new PouchDB(Config.database_name)

let env = remote.process.env

if (env.NODE_ENV !== 'production') {
    console.log("Attempting to connect to the CouchDB debug server.")
    if (!env.COUCHDB_DEBUG_SERVER_USERNAME || !env.COUCHDB_DEBUG_SERVER_PASSWORD) {
        console.log("Can't connect to the CouchDB debug server, either username or password isn't available in the .env")
    }
    else {
        db.sync(Config.database_debug_server_url, {
            auth: {
                'username': env.COUCHDB_DEBUG_SERVER_USERNAME,
                'password': env.COUCHDB_DEBUG_SERVER_PASSWORD,
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