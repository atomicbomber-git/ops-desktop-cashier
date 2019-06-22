import bcrypt from 'bcrypt'
import Config from './config'

function make(data) {
    return bcrypt.hashSync(data, Config.password_hash_salt_rounds)
}

function verify(data, hash) {
    return bcrypt.compareSync(data, hash)
}

export default { make, verify }