import db from './database'

function check() {
    return new Promise((resolve, reject) => {
        db.get('current_user')
            .then(doc => { resolve(doc) })
            .catch(() => { reject({ message: "User isn't logged in." }) })
    })
}

export default { check }