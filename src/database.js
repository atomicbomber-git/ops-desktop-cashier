import PouchDB from 'pouchdb-browser'
import Config from './config'

const db = new PouchDB(Config.database_name)
db.sync(Config.database_debug_server_url)

db.put({
    _id: "Anton",
    username: "Antonius",
})

export default db