import PouchDB from 'pouchdb-browser'
import Config from './config'
import Hash from './hash'
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind)
const db = new PouchDB(Config.database_name)
db.sync(Config.database_debug_server_url, {
    auth: {
        'username': 'admin',
        'password': 'alohomora',
    }
})

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

db.find({
    selector: {
        type: 'user',
    }
})
.then(docs => {
    console.log(docs)
})

/* Create a default administrator account if one hasn't already existed */
db.get('administrator')
    .catch(error => {
        if (error.name === "not_found") {
            createAdminAccount()
        }
    })

export default db