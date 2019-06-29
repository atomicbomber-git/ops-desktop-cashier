import db from './database'
import hash from './hash'

function check() {
    return new Promise((resolve, reject) => {
        db.get('current_user')
            .then(doc => { resolve(doc) })
            .catch(() => { reject({ message: "User isn't logged in." }) })
    })
}

function authenticate(username, password) {
    return new Promise((resolve, reject) => {
        db.get(username)
            .then(user => {
                if (hash.verify(password, user.password)) {
                    db.put({
                        '_id': 'current_user',
                        'type': 'auth',
                        'user_id': user._id,
                    })
                    .then(() => {
                        resolve(user)
                    })
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

function logOut() {
    return db.get('current_user')
        .then(user => {
            db.remove(user)
        })
}

export default { check, authenticate, logOut }