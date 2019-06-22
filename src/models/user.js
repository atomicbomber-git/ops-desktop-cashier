import db from '../database'
import Hash from '../hash'

function User() {
    this.create = function (data) {
        db.put({
            _id: data.username,
            name: data.name,
            password: Hash.make(data.password),
        })
    }
}

export default User