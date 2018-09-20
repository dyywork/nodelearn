import User from '../models/user'

export function getAllUser(options) {
    return User.findAndCountAll(options)
}

export function getUserById(id) {
    return User.findById(id)
}

export function getUsers(options) {
    return User.findAll(options)
}

export function updateUserById(values, id) {
    return User.update(values, {
        where: {
            id: id
        }
    })
}

export function deleteById(id) {
    return User.destroy({
        where: {
            id: id
        }
    })
}